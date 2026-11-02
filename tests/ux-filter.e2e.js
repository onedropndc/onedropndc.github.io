const { chromium }=require('playwright-core');const {serve}=require('./serve');const path=require('path');const assert=require('assert');
(async()=>{
 const server=await serve(path.join(__dirname,'..'),8138);const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||chromium.executablePath(),args:['--no-sandbox']});
 try {for(const width of [320,390,1440]){
  const c=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});for(const host of ['googleapis.com','gstatic.com','firebaseapp.com'])await c.route(`**://*.${host}/**`,r=>r.abort());
  const p=await c.newPage();await p.goto('http://127.0.0.1:8138/index.html');await p.evaluate(()=>localStorage.setItem('lifeline:cache:donors',JSON.stringify([
   {id:'one',name:'Test One',bloodGroup:'A+',district:'Dhaka',area:'Mirpur',available:true,status:'pending',createdAt:'2026-01-01T00:00:00Z'},
   {id:'two',name:'Test Two',bloodGroup:'O-',district:'Sylhet',area:'Sadar',available:true,status:'verified',createdAt:'2026-01-01T00:00:00Z'}
  ])));await p.goto('http://127.0.0.1:8138/donors.html');await p.waitForSelector('.donor-card');
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.equal(await p.locator('.donor-card').count(),2);
  assert.equal(await p.locator('#moreFilters').evaluate(el=>el.open),false);
  await p.locator('[data-group-chip="A+"]').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('[data-group-chip="A+"]').getAttribute('aria-pressed'),'true');assert.equal(await p.locator('.donor-card').count(),1);
  await p.selectOption('#districtFilter','Sylhet');assert.equal(await p.locator('.donor-card').count(),0);
  await p.click('#btnReset');assert.equal(await p.locator('.donor-card').count(),2);assert.equal(await p.locator('[data-group-chip="ALL"]').getAttribute('aria-pressed'),'true');
  await p.locator('#moreFilters summary').click();await p.fill('#donorSearch','Mirpur');await p.waitForTimeout(300);assert.equal(await p.locator('.donor-card').count(),1);
  await p.goto('http://127.0.0.1:8138/emergency.html');await p.waitForSelector('#r-group option[value="A+"]',{state:'attached'});assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const fields=await p.locator('#requestForm input, #requestForm select, #requestForm textarea').count();assert.equal(fields,6);
  await c.close();console.log(`PASS ${width}px: compact filters, reset, search and six-field request`);
 }}finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
