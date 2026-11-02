/* Decorative scroll effect, accessibility and task usability. External hosts blocked. */
const {chromium}=require('playwright-core'); const {serve}=require('./serve');
const path=require('path'),assert=require('assert');
(async()=>{
 const server=await serve(path.join(__dirname,'..'),8144);
 const b=await chromium.launch({executablePath:process.env.CHROME_BIN||chromium.executablePath(),args:['--no-sandbox']});
 try {
  for(const width of [320,390,768,1440]){
   const c=await b.newContext({viewport:{width,height:850},serviceWorkers:'block',reducedMotion:'no-preference'});
   await c.route(/https:\/\/(.*\.)?(gstatic\.com|googleapis\.com|firebaseapp\.com)\//,r=>r.abort());
   const p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
   await p.goto('http://127.0.0.1:8144/');await p.waitForSelector('#quickDistrict option[value="Dhaka"]',{state:'attached'});
   assert.equal(await p.locator('.od-hero-scene').getAttribute('aria-hidden'),'true');
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   assert.equal(await p.locator('.od-connection strong').textContent(),'রক্তদাতা হতে চান?');assert.ok(await p.locator('.od-connection img').evaluate(el=>el.complete && el.naturalWidth>0));
   await p.selectOption('#quickSearch select[name="group"]','O-');await p.selectOption('#quickDistrict','Dhaka');
   await p.click('[data-language-switch]');await p.waitForFunction(()=>document.documentElement.lang==='en');
   await p.waitForFunction(()=>document.querySelector('.od-connection').innerText.includes('Want to become a donor?'));
   assert.equal(await p.locator('#quickDistrict').inputValue(),'Dhaka');
   assert.equal(await p.locator('#quickSearch select[name="group"]').inputValue(),'O-');
   await p.click('[data-language-switch]');await p.waitForFunction(()=>document.documentElement.lang==='bn');
   await p.evaluate(()=>window.scrollTo({top:240,behavior:'instant'}));
   await p.waitForFunction(()=>parseFloat(document.querySelector('.od-hero-scene').style.getPropertyValue('--hero-shift')) > 0);
   let shift=await p.evaluate(()=>parseFloat(document.querySelector('.od-hero-scene').style.getPropertyValue('--hero-shift')));assert.ok(shift<=32);
   await p.emulateMedia({reducedMotion:'reduce'});
   await p.waitForFunction(()=>getComputedStyle(document.querySelector('.od-scene-orbit')).transform==='none');
   assert.equal(await p.evaluate(()=>getComputedStyle(document.querySelector('.od-scene-emblem')).transform),'none');
   await p.locator('#quickSearch select[name="group"]').focus();assert.equal(await p.evaluate(()=>document.activeElement.name),'group');
   const hit=await p.locator('#quickSearch button').evaluate(el=>{const r=el.getBoundingClientRect();return el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));});assert.equal(hit,true,'visual layer must not intercept search');
   await p.locator('#quickSearch button').click();await p.waitForURL('**/donors.html?*');const url=new URL(p.url());assert.equal(url.searchParams.get('group'),'O-');assert.equal(url.searchParams.get('district'),'Dhaka');
   assert.deepEqual(errors,[]);await c.close();console.log(`PASS ${width}px: hero scene, scroll, reduced motion, BN/EN and donor search`);
  }
 } finally {await b.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
