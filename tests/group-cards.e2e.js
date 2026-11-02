/* Layout tests use fake data only; no production Firebase connection. */
const {chromium}=require('playwright-core');const {serve}=require('./serve');const path=require('path');const assert=require('assert');
(async()=>{const server=await serve(path.join(__dirname,'..'),8140);const b=await chromium.launch({executablePath:process.env.CHROME_BIN||chromium.executablePath(),args:['--no-sandbox']});
try {for(const width of [320,390,480,600,768,1440]){
 const c=await b.newContext({viewport:{width,height:850},serviceWorkers:'block',reducedMotion:'reduce'});
 await c.route('**/assets/js/firebase.js',r=>r.fulfill({contentType:'text/javascript',body:`
 const docs=Array.from({length:23},(_,i)=>({id:'mock-'+i,data:()=>({name:'Example',bloodGroup:'A+',available:true,status:'verified',district:'Dhaka'})}));
 const fs={collection:(db,n)=>n,query:c=>c,orderBy:()=>null,onSnapshot:(q,cb)=>{setTimeout(()=>cb({docs:q==='donors'?docs:[],metadata:{fromCache:false}}),0);return ()=>{}},setDoc:async()=>{},doc:()=>'',increment:()=>1};
 export const state={ok:true,authOk:true,fs,db:{}};export async function initFirebase(){return state}export async function ensureAuth(){return {uid:'fake-user'}}export async function waitForAuth(){return {uid:'fake-user'}}
 `}));
 let p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://127.0.0.1:8140/index.html');await p.waitForSelector('.gt-count:not([hidden])');
 for(const lang of ['bn','en']){
  if(lang==='en'){await p.click('[data-language-switch]');await p.waitForTimeout(120);}
  assert.equal(await p.locator('html').getAttribute('lang'),lang);
  const layout=await p.locator('.group-tile').evaluateAll(cards=>cards.map(card=>{
   const rect=card.getBoundingClientRect();const parts=[...card.querySelectorAll('.gt-type,.gt-count,.gt-go')].filter(e=>e.offsetParent).map(e=>{const r=e.getBoundingClientRect();return {className:e.className,text:e.innerText,top:r.top,bottom:r.bottom,left:r.left,right:r.right,scroll:e.scrollWidth,client:e.clientWidth,z:getComputedStyle(e).zIndex}});return {left:rect.left,right:rect.right,width:rect.width,height:rect.height,parts};}));
  assert.equal(layout.length,8);for(const card of layout){assert.ok(card.width>=100,`${width} ${lang}: cards too narrow`);assert.ok(card.right<=width+1,'card outside viewport');assert.equal(card.parts.length,3);for(let i=0;i<card.parts.length;i++){const part=card.parts[i];assert.ok(part.left>=card.left-1&&part.right<=card.right+1,`${width} ${lang}: text outside card ${part.className}`);assert.ok(part.scroll<=part.client+1,`${width} ${lang}: overflowing text ${part.className}`);assert.equal(part.z,'2');if(i)assert.ok(part.top>=card.parts[i-1].bottom-1,`${width} ${lang}: overlapping labels`);}}
  const pageWidth=await p.evaluate(()=>({scroll:document.documentElement.scrollWidth, view:innerWidth, bad:[...document.querySelectorAll('body *')].filter(e=>e.offsetParent && e.getBoundingClientRect().right>innerWidth+1).slice(0,8).map(e=>[e.tagName,e.className,e.getBoundingClientRect().right])})); if(pageWidth.scroll>width)console.log('Overflow',width,lang,pageWidth);assert.equal(pageWidth.scroll<=width,true);
 }
 assert.equal(await p.locator('.od-search-card').evaluate(e=>getComputedStyle(e).animationName),'none','reduced motion must disable entrance');
 assert.equal(await p.locator('.brand-img').first().evaluate(e=>getComputedStyle(e).animationName),'none','no perpetual logo animation');
 if(width===390){await p.click('[data-language-switch]');await p.waitForTimeout(150);await p.locator('#groups').screenshot({path:'/home/user/onedrop-group-cards.png'});}
 await p.locator('[data-quick-group="A+"]').focus();await p.keyboard.press('Enter');await p.waitForURL('**/donors.html?group=A%2B');assert.deepEqual(errors,[]);await c.close();console.log(`PASS ${width}px: readable group cards, both languages, reduced motion and keyboard action`);
 }}finally{await b.close();server.close()}})().catch(e=>{console.error(e);process.exitCode=1});
