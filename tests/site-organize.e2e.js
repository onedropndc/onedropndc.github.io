const {chromium}=require('playwright-core');const {serve}=require('./serve');const path=require('path');const assert=require('assert');
(async()=>{const server=await serve(path.join(__dirname,'..'),8139);const b=await chromium.launch({executablePath:process.env.CHROME_BIN||chromium.executablePath(),args:['--no-sandbox']});
try{
 for(const width of [320,390,768,1440]){
  let c=await b.newContext({viewport:{width,height:850},serviceWorkers:'block'});for(const host of ['googleapis.com','gstatic.com','firebaseapp.com'])await c.route(`**://*.${host}/**`,r=>r.abort());let p=await c.newPage();let errors=[];p.on('pageerror',e=>errors.push(e.message));
  for(const page of ['index','donors','emergency','register','my-donor','faq','privacy','about','admin','offline']){await p.goto(`http://127.0.0.1:8139/${page}.html`);await p.waitForTimeout(100);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${page} overflow at ${width}`)}
  await p.goto('http://127.0.0.1:8139/index.html');await p.waitForSelector('#statsHost .callout');assert.equal(await p.locator('#quickPool .gt-count:visible').count(),0,'no invented zero availability offline');
  assert.equal(await p.locator('#statsHost .stat-grid').count(),0,'no invented zero stats offline');
  await p.goto('http://127.0.0.1:8139/faq.html');await p.click('a[href="#faq-using"]');assert.equal(await p.evaluate(()=>location.hash),'#faq-using');assert.deepEqual(errors,[]);await c.close();console.log(`PASS ${width}px: public pages, offline numbers and topic links`);
 }
 const c=await b.newContext({serviceWorkers:'block',viewport:{width:390,height:850}});
 await c.route('**/assets/js/firebase.js',r=>r.fulfill({contentType:'text/javascript',body:`
 const fs={collection:(db,n)=>n,query:(c)=>c,orderBy:()=>null,getDocs:async()=>({docs:[]}),onSnapshot:(q,cb)=>{setTimeout(()=>cb({docs:[]}),0);return ()=>{}},addDoc:async(c,d)=>{window.fakeWrites=window.fakeWrites||[];window.fakeWrites.push({c,d});return {id:'test-id'}},serverTimestamp:()=>new Date().toISOString(),doc:(db,c,id)=>id,updateDoc:async()=>{},getDoc:async()=>({exists:()=>false}),increment:()=>1,setDoc:async()=>{}};
 export const state={ok:true,authOk:true,fs,db:{}};export async function initFirebase(){return state} export async function ensureAuth(){return {uid:'test-user'}} export async function waitForAuth(){return {uid:'test-user'}}
 `}));
 const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://127.0.0.1:8139/register.html');await p.waitForSelector('#f-blood option[value="A+"]',{state:'attached'});
 assert.equal(await p.locator('#optionalDetails').evaluate(e=>e.open),false);
 await p.fill('#f-name','Home');await p.fill('#f-phone','01712345678');await p.selectOption('#f-blood','A+');await p.selectOption('#f-district','Dhaka');await p.check('input[name="consent"]');
 assert.ok((await p.locator('#formProgressLabel').innerText()).includes('জমা') || (await p.locator('#formProgressLabel').innerText()).includes('submit'));
 await p.click('#optionalDetails summary');await p.fill('#f-age','12');await p.locator('#optionalDetails summary').click();await p.locator('#donorForm').evaluate(f=>f.requestSubmit());
 assert.equal(await p.locator('#optionalDetails').evaluate(e=>e.open),true,'invalid optional field is revealed');assert.equal(await p.evaluate(()=>Boolean((window.fakeWrites||[]).find(w=>w.c==='donors'))),false);
 await p.fill('#f-age','25');await p.click('[data-language-switch]');await p.waitForTimeout(150);assert.equal(await p.locator('#f-age').inputValue(),'25');assert.equal(await p.locator('#f-name').inputValue(),'Home');await p.click('[data-language-switch]');await p.waitForTimeout(150);await p.locator('#donorForm').evaluate(f=>f.requestSubmit());await p.waitForSelector('#successPanel:not([hidden])');
 await p.waitForFunction(()=>document.querySelector('#successPanel h2')?.textContent.includes('পর্যালোচনার'));const donor=await p.evaluate(()=>(window.fakeWrites||[]).find(w=>w.c==='donors'));assert.equal(donor.d.age,25);assert.equal(donor.d.status,'pending');assert.equal(await p.locator('#successPanel strong[data-no-translate]').first().innerText(),'Home');assert.ok((await p.locator('#successPanel h2').innerText()).includes('পর্যালোচনার'));assert.deepEqual(errors,[]);
 await c.close();console.log('PASS: optional registration, validation, progress and fake submission');
}finally{await b.close();server.close()}})().catch(e=>{console.error(e);process.exitCode=1});
