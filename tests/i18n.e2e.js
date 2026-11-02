const {chromium} = require('playwright-core');
const {serve} = require('./serve'); const path=require('path'); const assert=require('assert');
(async()=>{
 const server=await serve(path.join(__dirname,'..'),8136);
 const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||chromium.executablePath(),args:['--no-sandbox']});
 try {
  const ctx=await browser.newContext({viewport:{width:390,height:844}});
  for(const host of ['googleapis.com','gstatic.com','firebaseapp.com']) await ctx.route(`**://*.${host}/**`,r=>r.abort());
  const p=await ctx.newPage(), errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://127.0.0.1:8136/index.html');await p.waitForSelector('#quickDistrict option[value="Dhaka"]',{state:'attached'});
  assert.equal(await p.locator('html').getAttribute('lang'),'bn');
  await p.selectOption('#quickDistrict','Dhaka');await p.fill('#quickSearchInput','Mirpur');
  await p.click('[data-language-switch]');await p.waitForTimeout(200);
  assert.equal(await p.locator('html').getAttribute('lang'),'en');
  assert.ok((await p.locator('h1').innerText()).includes('Find a blood donor'));
  assert.equal(await p.locator('#quickDistrict').inputValue(),'Dhaka');assert.equal(await p.locator('#quickSearchInput').inputValue(),'Mirpur');
  await p.goto('http://127.0.0.1:8136/register.html');await p.waitForTimeout(300);
  assert.equal(await p.locator('html').getAttribute('lang'),'en');assert.ok((await p.locator('h1').innerText()).includes('Become a donor'));
  await p.fill('#f-name','Emergency'); await p.click('[data-language-switch]'); await p.waitForTimeout(200);
  assert.equal(await p.locator('html').getAttribute('lang'),'bn'); assert.equal(await p.locator('#f-name').inputValue(),'Emergency');
  assert.ok((await p.locator('h1').innerText()).includes('রক্তদাতা'));
  await p.goto('http://127.0.0.1:8136/emergency.html'); await p.waitForTimeout(400);
  assert.equal(await p.locator('html').getAttribute('lang'),'bn');
  assert.ok((await p.locator('h1').innerText()).includes('জরুরি'));
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await p.evaluate(()=>localStorage.setItem('lifeline:cache:donors',JSON.stringify([{id:'fixture-1',uid:'test',name:'Home',note:'Blood group',bloodGroup:'O-',district:'Dhaka',area:'Mirpur',available:true,status:'pending',phone:'01700000000',createdAt:new Date().toISOString()}])));
  await p.goto('http://127.0.0.1:8136/donors.html');await p.waitForSelector('.donor-card .dc-name');await p.waitForTimeout(100);
  assert.equal(await p.locator('.dc-name').first().innerText(),'Home');
  assert.equal(await p.locator('.dc-note').first().innerText(),'Blood group');
  await p.click('[data-language-switch]');await p.waitForTimeout(100);
  assert.equal(await p.locator('.dc-name').first().innerText(),'Home');
  assert.equal(await p.locator('.dc-note').first().innerText(),'Blood group');
  assert.deepStrictEqual(errors,[]);
  console.log('PASS: bilingual toggle, cross-page persistence, form values, mobile overflow');
 } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
