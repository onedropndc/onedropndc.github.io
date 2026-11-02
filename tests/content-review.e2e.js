/* Public copy, bilingual consistency and privacy cautions, with all remote services blocked. */
const { chromium } = require('playwright-core');
const { serve } = require('./serve');
const assert = require('assert');
const path = require('path');
(async () => {
 const server = await serve(path.join(__dirname,'..'),8145);
 const browser = await chromium.launch({executablePath:process.env.CHROME_BIN || chromium.executablePath(),args:['--no-sandbox']});
 try {
  for (const width of [320,1440]) {
   const c = await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});
   await c.route(/https:\/\/(.*\.)?(gstatic\.com|googleapis\.com|firebaseapp\.com)\//,r=>r.abort());
   const p = await c.newPage(), errors=[];p.on('pageerror',e=>errors.push(e.message));
   const visit=async name=>{await p.goto(`http://127.0.0.1:8145/${name}`);await p.waitForFunction(()=>document.documentElement.lang==='bn');await p.waitForTimeout(150);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${name} ${width}px overflow`);};
   await visit('index.html');
   assert.ok((await p.locator('#how').innerText()).includes('পর্যালোচনার অপেক্ষায়'));
   assert.ok((await p.locator('.compat-note').innerText()).includes('চূড়ান্ত সিদ্ধান্ত'));
   await p.click('[data-language-switch]');await p.waitForFunction(()=>document.documentElement.lang==='en');
   assert.ok((await p.locator('#how').innerText()).includes('While you wait for review'));
   const note=await p.locator('.compat-note').innerText();assert.ok(note.includes('blood bank'));assert.ok(!note.includes('common group'));
   await p.click('[data-language-switch]');await p.waitForFunction(()=>document.documentElement.lang==='bn');
   await visit('emergency.html');
   assert.ok((await p.locator('.request-privacy').innerText()).includes('পর্যালোচনার অপেক্ষায় থাকলেও প্রকাশ্যে'));
   assert.ok((await p.locator('.request-steps').innerText()).includes('পর্যালোচনার অপেক্ষা'));
   await p.click('[data-language-switch]');await p.waitForFunction(()=>document.documentElement.lang==='en');
   assert.ok((await p.locator('.request-privacy').innerText()).includes('even while awaiting review'));
   await p.click('[data-language-switch]');
   await visit('register.html');await p.locator('#optionalDetails').evaluate(el=>el.open=true);
   assert.ok((await p.locator('.consent').innerText()).includes('প্রকাশ্যে পাওয়া যাবে'));
   assert.ok((await p.locator('#f-note').getAttribute('placeholder')).includes('যেমন:'));
   await p.fill('#f-note','এই তথ্য অপরিবর্তিত থাকবে');
   await p.click('[data-language-switch]');await p.waitForFunction(()=>document.documentElement.lang==='en');
   assert.ok((await p.locator('#f-note').getAttribute('placeholder')).startsWith('e.g.'));
   assert.equal(await p.locator('#f-note').inputValue(),'এই তথ্য অপরিবর্তিত থাকবে');
   assert.ok(!(await p.locator('.consent').innerText()).includes('medically fit'));
   await p.click('[data-language-switch]');
   await visit('faq.html');await p.locator('details').evaluateAll(els=>els.forEach(el=>el.open=true));
   let text=await p.locator('main').innerText();assert.ok(text.includes('রেকর্ড গোপন হবে না'));assert.ok(!text.includes('খুলে আমার'));
   await p.click('[data-language-switch]');await p.waitForFunction(()=>document.documentElement.lang==='en');
   text=await p.locator('main').innerText();assert.ok(text.includes('does not make your record private'));assert.ok(!text.includes('You cannot catch an infection'));
   const schema=await p.locator('script[type="application/ld+json"]').textContent();assert.ok(JSON.parse(schema).mainEntity.length);assert.ok(!schema.includes('verified emergency requests'));
   await p.click('[data-language-switch]');
   await visit('privacy.html');text=await p.locator('main').innerText();assert.ok(text.includes('পর্যালোচনার অপেক্ষায় থাকলেও প্রকাশ্যে'));assert.ok(text.includes('অনুপলব্ধ চিহ্নিত করলেও রেকর্ড গোপন হয় না'));
   await p.click('[data-language-switch]');await p.waitForFunction(()=>document.documentElement.lang==='en');text=await p.locator('main').innerText();assert.ok(text.includes('while a request is awaiting review'));assert.ok(!text.includes('and a moderator will remove it manually'));
   await p.click('[data-language-switch]');
   await visit('about.html');text=await p.locator('main').innerText();assert.ok(text.includes('স্বেচ্ছাসেবী মডারেটররা'));assert.ok(!text.includes('তথ্য যাচাই ও অনুরোধ পর্যালোচনা করেন'));
   await visit('offline.html');assert.ok((await p.locator('h1').innerText()).includes('অফলাইনে'));
   // Fake cached profiles verify that editorial changes describe real availability, not medical fitness.
   await p.evaluate(()=>localStorage.setItem('lifeline:cache:donors',JSON.stringify([
    {id:'copy-busy',name:'Home',bloodGroup:'O-',district:'Dhaka',available:false,status:'verified'},
    {id:'copy-filter',name:'Another Donor',bloodGroup:'A+',district:'Dhaka',available:true,status:'pending',lastDonation:new Date().toISOString()}
   ])));
   await visit('donors.html');await p.uncheck('#onlyAvailable');await p.waitForSelector('[data-id="copy-busy"]');await p.waitForFunction(()=>document.querySelector('[data-id="copy-busy"]')?.innerText.includes('প্রস্তুত নন')); 
   let card=await p.locator('[data-id="copy-busy"]').innerText();assert.ok(card.includes('প্রস্তুত নন'));assert.ok(card.includes('পর্যালোচিত'));assert.ok(!card.includes('common group'));
   await p.locator('[data-id="copy-busy"] [data-act="info"]').click();await p.waitForSelector('#dlgTitle');await p.waitForFunction(()=>document.querySelector('.modal-body')?.innerText.includes('চিকিৎসাগত যোগ্যতা')); 
   assert.equal(await p.locator('#dlgTitle').innerText(),'Home','donor names must never be translated');
   text=await p.locator('.modal-body').innerText();assert.ok(text.includes('প্রস্তুত নন'));assert.ok(text.includes('চিকিৎসাগত যোগ্যতা'));
   await p.locator('#modalRoot [data-ok]').click();
   await p.click('[data-language-switch]');await p.waitForFunction(()=>document.documentElement.lang==='en');
   card=await p.locator('[data-id="copy-filter"]').innerText();assert.ok(card.includes('Display filter until'));assert.ok(!card.includes('Most common'));
   await p.locator('[data-id="copy-busy"] [data-act="info"]').click();assert.ok((await p.locator('.modal-body').innerText()).includes('Marked unavailable'));await p.locator('#modalRoot [data-ok]').click();
   await p.click('[data-language-switch]');
   assert.deepEqual(errors,[]);await c.close();console.log(`PASS ${width}px: human-centred copy, both languages, privacy cautions and preserved user input`);
  }
 } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
