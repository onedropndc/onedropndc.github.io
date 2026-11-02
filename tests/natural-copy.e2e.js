/* Bengali first, purposeful copy, safe user input, and responsive interaction. */
const { chromium } = require('playwright-core');
const { serve } = require('./serve');
const path = require('path');
const assert = require('assert');
const pages = ['index','donors','emergency','register','my-donor','donor-card','about','faq','privacy','admin','offline'];
(async()=>{
 const server=await serve(path.join(__dirname,'..'),8145);
 const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||chromium.executablePath(),args:['--no-sandbox']});
 try {
  for(const width of [320,1440]) {
   const context=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});
   await context.route(/https:\/\/(.*\.)?(gstatic\.com|googleapis\.com|firebaseapp\.com)\//,r=>r.abort());
   // A stale preference from the previous implementation must not override the new-tab default.
   await context.addInitScript(()=>localStorage.setItem('onedrop:language','en'));
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   for(const name of pages){
    await page.goto(`http://127.0.0.1:8145/${name}.html`);
    await page.waitForFunction(()=>/[\u0980-\u09ff]/.test(document.querySelector('h1')?.textContent||''));
    assert.equal(await page.locator('html').getAttribute('lang'),'bn',name+' defaults to Bengali');
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    assert.equal(overflow,false,`${name} overflows at ${width}px`);
   }
   await page.goto('http://127.0.0.1:8145/donors.html');
   let text=await page.locator('main').innerText();
   assert.ok(!text.includes('তালিকা নিজে থেকেই বদলাবে'));
   assert.ok(text.includes('দূরত্ব আনুমানিক') && !text.includes('Distances are approximate'));
   await page.goto('http://127.0.0.1:8145/index.html');
   assert.ok(await page.locator('.od-connection img').evaluate(el=>el.complete&&el.naturalWidth>0));
   assert.equal(await page.locator('.od-connection img').getAttribute('alt'),'');
   assert.equal(await page.locator('.od-connection a').getAttribute('href'),'register.html');
   assert.ok(!(await page.locator('main').innerText()).includes('পাশে আছি, একসাথে'));
   assert.ok((await page.locator('.credit-meta').innerText()).includes('হাসপাতালের ব্লাড ব্যাংকের বিকল্প নয়'));
   assert.ok(!(await page.locator('.credit-meta').innerText()).includes('Not a substitute')); 
   await page.locator('#quickSearchInput').fill('Mirpur');
   await page.locator('[data-language-switch]').click();
   await page.waitForFunction(()=>document.documentElement.lang==='en');
   assert.equal(await page.locator('#quickSearchInput').inputValue(),'Mirpur');
   assert.ok((await page.locator('h1').innerText()).includes('Find a blood donor.'));
   assert.ok((await page.locator('.od-connection').innerText()).includes('Want to become a donor?'));
   assert.ok((await page.locator('.credit-meta').innerText()).includes('Not a substitute for hospital blood banks')); 
   await page.locator('.od-action-row a[href="donors.html"]').click();
   await page.waitForFunction(()=>document.documentElement.lang==='en');
   assert.ok((await page.locator('h1').innerText()).includes('Find a donor'));
   await page.reload();await page.waitForFunction(()=>document.documentElement.lang==='en');
   const freshTab=await context.newPage();await freshTab.goto('http://127.0.0.1:8145/about.html');
   await freshTab.waitForFunction(()=>document.querySelector('h1')?.textContent.includes('সম্পর্কে'));
   assert.equal(await freshTab.locator('html').getAttribute('lang'),'bn','a new tab starts in Bengali');
   assert.deepEqual(errors,[]);await context.close();
   console.log(`PASS ${width}px: every page defaults to Bengali, natural copy, selected English and independent new-tab default`);
  }
 } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
