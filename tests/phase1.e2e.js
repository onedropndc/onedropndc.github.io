/* Isolated browser checks; no production Firebase calls. */
const { chromium } = require('playwright-core');
const { serve } = require('./serve');
const path = require('path');
const assert = require('assert');
(async () => {
  const server = await serve(path.join(__dirname, '..'), 8135);
  const browser = await chromium.launch({executablePath: process.env.CHROME_BIN || chromium.executablePath(), args:['--no-sandbox']});
  try {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({viewport:{width,height:900}});
      for (const host of ['googleapis.com','gstatic.com','firebaseapp.com']) await context.route(`**://*.${host}/**`, r => r.abort());
      const page = await context.newPage();
      const errors = []; page.on('pageerror', e=>errors.push(e.message));
      await page.goto('http://127.0.0.1:8135/index.html');
      await page.waitForSelector('#quickDistrict option[value="Dhaka"]', {state: 'attached'});
      assert.strictEqual(await page.locator('#quickDistrict option').count(),65);
      assert.strictEqual(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth),false);
      await page.selectOption('#quickSearch [name=group]','O-');
      await page.selectOption('#quickDistrict','Dhaka');
      await page.fill('#quickSearchInput','Mirpur');
      await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto'; document.querySelector('#quickSearch button[type=submit]').scrollIntoView({block:'center',behavior:'instant'});});
      await page.click('#quickSearch button[type=submit]');
      await page.waitForURL('**/donors.html?*');
      await page.waitForSelector('#donorGrid .empty');
      assert.strictEqual(await page.locator('#districtFilter').inputValue(),'Dhaka');
      assert.strictEqual(await page.locator('#donorSearch').inputValue(),'Mirpur');
      assert.ok((await page.locator('[data-group-chip="O-"]').getAttribute('class')).includes('is-active'));
      assert.ok((await page.locator('#donorGrid').innerText()).includes('জরুরি অনুরোধ'));
      const result = await page.evaluate(async()=>{
        const data=await import('./assets/js/data.js');
        let requestFailed=false, donorFailed=false;
        try { await data.addRequest({bloodGroup:'O-',phone:'01712345678'}); } catch { requestFailed=true; }
        try { await data.addDonor({name:'Test',bloodGroup:'O-',phone:'01712345678'}); } catch { donorFailed=true; }
        return {requestFailed, donorFailed, requests:await data.listRequests(), donors:await data.listDonors()};
      });
      assert.ok(result.requestFailed && result.donorFailed, 'offline create must fail');
      assert.strictEqual(result.requests.length,0); assert.strictEqual(result.donors.length,0);
      await page.goto('http://127.0.0.1:8135/emergency.html');
      await page.waitForSelector('#r-group option[value="O-"]', {state:'attached'});
      await page.selectOption('#r-group','O-');
      await page.fill('#r-hospital','Test Hospital');
      await page.selectOption('#r-district','Dhaka');
      await page.fill('#r-phone','01712345678');
      await page.locator('#r-by').evaluate(el=>{const d=new Date(Date.now()+86400000); el.value=new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,16); el.dispatchEvent(new Event('change',{bubbles:true}));});
      await page.locator('#requestForm').evaluate(f=>f.requestSubmit());
      await page.waitForSelector('#toasts .toast', {timeout:5000});
      assert.ok((await page.locator('#toasts').innerText()).includes('জমা হয়নি'));
      assert.strictEqual(await page.locator('#r-hospital').inputValue(), 'Test Hospital', 'failed submission preserves form');
      assert.strictEqual(await page.locator('#requestForm button[type=submit]').isEnabled(),true);
      assert.deepStrictEqual(errors,[]);
      await context.close(); console.log(`PASS ${width}px: search, empty state, offline writes, no demo records`);
    }
  } finally { await browser.close(); server.close(); }
})().catch(e=>{console.error(e); process.exitCode=1;});
