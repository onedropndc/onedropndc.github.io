/* Exercises the real request form against an in-browser fake Firestore. */
const { chromium }=require('playwright-core'); const {serve}=require('./serve'); const path=require('path'); const assert=require('assert');
(async()=>{
 const server=await serve(path.join(__dirname,'..'),8137);
 const b=await chromium.launch({executablePath:process.env.CHROME_BIN||chromium.executablePath(),args:['--no-sandbox']});
 try {
  const c=await b.newContext({serviceWorkers:'block',viewport:{width:1200,height:900}});
  await c.route('**/assets/js/firebase.js',r=>r.fulfill({contentType:'text/javascript',body:`
    const fs={collection:(db,n)=>n,query:(c)=>c,orderBy:()=>null,getDocs:async()=>({docs:[]}),onSnapshot:(q,cb)=>{setTimeout(()=>cb({docs:[]}),0);return ()=>{}},addDoc:async(c,d)=>{window.fakeWrites=window.fakeWrites||[];window.fakeWrites.push({c,d});return {id:'test-id'}},serverTimestamp:()=>new Date().toISOString(),doc:(db,c,id)=>id,updateDoc:async()=>{},getDoc:async()=>({exists:()=>false}),increment:()=>1,setDoc:async()=>{}};
    export const state={ok:true,authOk:true,fs,db:{}};export async function initFirebase(){return state} export async function ensureAuth(){return {uid:'test-user'}} export async function waitForAuth(){return {uid:'test-user'}}
  `}));
  const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://127.0.0.1:8137/emergency.html'); await p.waitForSelector('#r-group option[value="O-"]',{state:'attached'});
  assert.equal(await p.locator('#r-district').inputValue(),'');
  assert.equal(await p.locator('#r-by').inputValue(),'');
  await p.selectOption('#r-group','O-');await p.fill('#r-hospital','Test Hospital');await p.fill('#r-phone','01712345678');
  const future=await p.evaluate(()=>{const d=new Date(Date.now()+86400000);return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,16)});
  await p.locator('#requestForm').evaluate(f=>f.requestSubmit());
  assert.equal(await p.evaluate(()=>Boolean((window.fakeWrites||[]).find(w=>w.c==='requests'))),false,'missing district and date must not submit');
  await p.selectOption('#r-district','Dhaka'); await p.fill('#r-by','2020-01-01T12:00'); await p.locator('#requestForm').evaluate(f=>f.requestSubmit());
  assert.equal(await p.evaluate(()=>Boolean((window.fakeWrites||[]).find(w=>w.c==='requests'))),false,'past date must not submit');
  await p.fill('#r-by',future);
  await p.fill('#r-units','11');await p.locator('#requestForm').evaluate(f=>f.requestSubmit());
  assert.equal(await p.locator('#requestNext').isHidden(),true);
  assert.equal(await p.evaluate(()=>Boolean((window.fakeWrites||[]).find(w=>w.c==='requests'))),false,'invalid units must not submit');
  await p.fill('#r-units','2');await p.locator('#requestForm').evaluate(f=>f.requestSubmit());await p.waitForSelector('#requestNext:not([hidden])');
  await p.waitForFunction(()=>document.querySelector('#requestNext').innerText.includes('পর্যালোচনার'));
  assert.ok((await p.locator('#requestNext').innerText()).includes('পর্যালোচনার'));
  const href=await p.locator('#requestNext a').getAttribute('href');let url=new URL(href,'http://test');assert.equal(url.searchParams.get('group'),'O-');assert.equal(url.searchParams.get('district'),'Dhaka');
  const writes=await p.evaluate(()=>window.fakeWrites);let req=writes.find(w=>w.c==='requests');assert.equal(req.d.status,'pending');assert.equal(req.d.uid,'test-user');assert.equal(req.d.units,2); assert.ok(req.d.neededBy); assert.equal(req.d.patient,'');assert.equal(req.d.contactName,'');
  await p.evaluate(()=>{window.open=(u)=>{window.sharedUrl=u;};});await p.click('#shareSubmitted');await p.waitForSelector('[data-share="whatsapp"]');await p.waitForTimeout(80);await p.click('[data-share="whatsapp"]');
  const sharedText=await p.evaluate(()=>new URL(window.sharedUrl).searchParams.get('text'));assert.ok(sharedText.includes('A patient needs 2 unit(s) of O-'));assert.ok(!sharedText.includes('undefined'));assert.ok(sharedText.includes('req=test-id'));assert.ok(sharedText.includes('Needed by:'));
  await p.locator('#modalRoot [data-ok]').click();
  await p.click('[data-language-switch]');await p.waitForTimeout(100);assert.ok((await p.locator('#requestNext').innerText()).includes('Waiting for moderator review'));
  assert.deepEqual(errors,[]);console.log('PASS: request saved as pending; next-step donor filters and language switch');
  await c.close();
 } finally {await b.close(); server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
