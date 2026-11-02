/* Shareable cards are rendered locally in Canvas; no personal data is uploaded. */
import { DISTRICT_LABELS } from './geo.js';
import { language } from './i18n.js';
import { dialog, toast } from './ui.js';

const W = 1080, H = 1350;
const FONT = '"OneDrop Bengali", "Noto Sans Bengali", system-ui, sans-serif';
const palette = { ink:'#26151a', soft:'#6d5960', red:'#ae1e37', deep:'#650d20', cream:'#f6f0ec', line:'#eadfdb', paper:'#ffffff', blush:'#f9e9ec' };

async function loadFonts() {
  if (!document.fonts) return;
  try { await Promise.all([document.fonts.load(`600 40px ${FONT}`, 'বাংলা'), document.fonts.load(`800 70px ${FONT}`, 'বাংলা')]); await document.fonts.ready; } catch { /* system fonts remain usable */ }
}
function round(x,y,w,h,r,ctx) {
  r=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();
}
function block(ctx,x,y,w,h,r,fill) { round(x,y,w,h,r,ctx); ctx.fillStyle=fill; ctx.fill(); }
function line(ctx,x1,y1,x2,y2,color=palette.line) { ctx.strokeStyle=color; ctx.lineWidth=2; ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke(); }
function font(ctx,size,weight=600) { ctx.font=`${weight} ${size}px ${FONT}`; }
function graphemes(text) { return typeof Intl.Segmenter==='function' ? [...new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(text)].map(x=>x.segment) : Array.from(text); }
function linesFor(ctx,text,maxWidth) {
  let lines=[], current='';
  for (const g of graphemes(String(text ?? '').replace(/\s+/g,' ').trim())) {
    const trial=current+g;
    if (current && ctx.measureText(trial).width>maxWidth) { lines.push(current.trim()); current=g.trimStart(); }
    else current=trial;
  }
  if (current) lines.push(current.trim());
  return lines.length ? lines : ['—'];
}
/* Shrink and wrap user text. Returns true if a pathological value was shortened. */
function fitted(ctx,text,x,y,width,{size=54,min=27,lines=2,color=palette.ink,weight=700,leading=1.35}={}) {
  let found=[],s=size;
  while(s>=min) { font(ctx,s,weight); found=linesFor(ctx,text,width); if(found.length<=lines)break; s-=2; }
  let truncated=found.length>lines;
  if(truncated) {
    found=found.slice(0,lines); let last=found[lines-1] || ''; let gs=graphemes(last);
    while(gs.length && ctx.measureText(gs.join('')+'…').width>width) gs.pop();
    found[lines-1]=gs.join('')+'…';
  }
  ctx.fillStyle=color; ctx.textBaseline='top';
  found.forEach((value,i)=>ctx.fillText(value,x,y+i*s*leading));
  return truncated;
}
function text(ctx,text,x,y,size,color,weight=600) { font(ctx,size,weight);ctx.fillStyle=color;ctx.textBaseline='top';ctx.fillText(text,x,y); }
function drop(ctx,cx,cy,size,fill) {
  ctx.beginPath();ctx.moveTo(cx,cy-size*1.12);ctx.bezierCurveTo(cx+size*.50,cy-size*.45,cx+size*.76,cy-size*.03,cx+size*.76,cy+size*.35);ctx.bezierCurveTo(cx+size*.76,cy+size*1.18,cx-size*.76,cy+size*1.18,cx-size*.76,cy+size*.35);ctx.bezierCurveTo(cx-size*.76,cy-size*.03,cx-size*.50,cy-size*.45,cx,cy-size*1.12);ctx.closePath();ctx.fillStyle=fill;ctx.fill();
}
function brand(ctx,x,y,dark=false) {
  block(ctx,x,y,65,65,20,dark?'rgba(255,255,255,.13)':palette.blush);
  drop(ctx,x+32,y+31,19,dark?'#fff':palette.red);
  text(ctx,'One Drop',x+83,y+2,37,dark?'#fff':palette.ink,800);
  text(ctx,'A DROP OF LIFE',x+85,y+43,17,dark?'#e9c4cb':palette.soft,700);
}
function base(canvas) {
  canvas.width=W; canvas.height=H; const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,W,H);ctx.fillStyle=palette.cream;ctx.fillRect(0,0,W,H);
  block(ctx,32,32,1016,1286,42,palette.paper);return ctx;
}
const copy={
 bn:{donor:'ডোনার কার্ড',tag:'এক ফোঁটা রক্তে',tag2:'মানুষের পাশে',vol:'স্বেচ্ছায় রক্তদান',group:'রক্তের গ্রুপ',name:'নাম',place:'জেলা ও এলাকা',phone:'যোগাযোগ',noPhone:'যোগাযোগের নম্বর যুক্ত করা হয়নি',footer:'স্ব-প্রদত্ত তথ্য · আনুষ্ঠানিক পরিচয়পত্র নয়',site:'onedropndc.github.io',need:'জরুরি রক্ত প্রয়োজন',share:'শেয়ার করার আগে তথ্য নিশ্চিত করুন',units:'ব্যাগ প্রয়োজন',deadline:'প্রয়োজনের সময় · বাংলাদেশ (UTC+6)',hospital:'হাসপাতাল / ব্লাড ব্যাংক',district:'জেলা',contact:'যোগাযোগের নম্বর',verify:'রক্তদানের আগে হাসপাতালের সঙ্গে তথ্য নিশ্চিত করুন।',pending:'পর্যালোচনাধীন',active:'প্রকাশিত অনুরোধ',fulfilled:'অনুরোধ পূরণ হয়েছে',cancelled:'অনুরোধ বাতিল',other:'অনুরোধের অবস্থা যাচাই করুন',noName:'আপনার নাম',noPlace:'আপনার জেলা'},
 en:{donor:'DONOR CARD',tag:'One drop.',tag2:'A helping hand.',vol:'VOLUNTARY BLOOD DONOR',group:'BLOOD GROUP',name:'NAME',place:'DISTRICT & AREA',phone:'CONTACT',noPhone:'Contact number not included',footer:'Self-reported details · Not an official ID',site:'onedropndc.github.io',need:'BLOOD NEEDED',share:'Confirm details before sharing',units:'UNIT(S) NEEDED',deadline:'NEEDED BY · BANGLADESH (UTC+6)',hospital:'HOSPITAL / BLOOD BANK',district:'DISTRICT',contact:'CONTACT NUMBER',verify:'Confirm the requirement with the hospital before donating.',pending:'AWAITING REVIEW',active:'PUBLISHED REQUEST',fulfilled:'REQUEST FULFILLED',cancelled:'REQUEST CANCELLED',other:'CHECK REQUEST STATUS',noName:'Your name',noPlace:'Your district'}
};
function place(d,lang) { return lang==='bn' ? (DISTRICT_LABELS[d]||d||'') : (d||''); }
function status(r,t) { return ({pending:t.pending,active:t.active,fulfilled:t.fulfilled,cancelled:t.cancelled})[r.status] || t.other; }
function deadline(raw,lang) {
  const d=new Date(raw); if(!raw || Number.isNaN(d.getTime())) return '—';
  try {return new Intl.DateTimeFormat(lang==='bn'?'bn-BD':'en-GB',{day:'numeric',month:'short',year:'numeric',hour:'numeric',minute:'2-digit',hour12:false,timeZone:'Asia/Dhaka'}).format(d);} catch {return d.toLocaleString();}
}
export async function renderDonorCard(canvas,data,lang=language()) {
  await loadFonts();const ctx=base(canvas), t=copy[lang]||copy.bn;let truncated=false;
  brand(ctx,76,80);text(ctx,t.donor,748,100,28,palette.red,800);line(ctx,76,178,1004,178);
  text(ctx,t.vol,76,225,28,palette.red,800);
  text(ctx,t.tag,76,282,66,palette.ink,800);text(ctx,t.tag2,76,372,66,palette.ink,800);
  block(ctx,735,220,267,265,30,palette.deep);drop(ctx,955,270,20,'#f1a3b1');
  text(ctx,t.group,762,258,24,'#eec7cf',700);fitted(ctx,data.bloodGroup||'—',760,324,220,{size:114,min:82,lines:1,color:'#fff',weight:800});
  line(ctx,76,523,1004,523);
  text(ctx,t.name,76,565,27,palette.soft,700);
  truncated = fitted(ctx,data.name||t.noName,76,613,920,{size:58,min:30,lines:2,leading:1.15}) || truncated;
  text(ctx,t.place,76,760,27,palette.soft,700);
  truncated = fitted(ctx,[place(data.district,lang),data.area].filter(Boolean).join(' · ')||t.noPlace,76,808,920,{size:46,min:29,lines:2,weight:700}) || truncated;
  text(ctx,t.phone,76,930,27,palette.soft,700);
  truncated = fitted(ctx,data.includePhone && data.phone ? data.phone:t.noPhone,76,978,920,{size:43,min:28,lines:2,weight:700,color:data.includePhone&&data.phone?palette.ink:palette.soft}) || truncated;
  block(ctx,64,1120,952,156,24,palette.blush);drop(ctx,108,1179,18,palette.red);
  fitted(ctx,t.footer,145,1154,820,{size:30,min:26,lines:2,weight:700,color:palette.deep});
  text(ctx,t.site,145,1222,23,palette.soft,600);
  return {truncated};
}
export async function renderEmergencyCard(canvas,r,lang=language()) {
  await loadFonts();const ctx=base(canvas),t=copy[lang]||copy.bn;let truncated=false;
  block(ctx,32,32,1016,340,42,palette.deep);
  // Clip the header texture inside its rounded edges.
  ctx.save();round(32,32,1016,340,42,ctx);ctx.clip();ctx.fillStyle='rgba(255,255,255,.05)';ctx.beginPath();ctx.arc(968,385,270,0,Math.PI*2);ctx.fill();ctx.restore();
  brand(ctx,76,76,true);
  const pending=r.status==='pending';
  block(ctx,613,81,388,70,26,pending?'#ffdfaa':'rgba(255,255,255,.14)');
  fitted(ctx,status(r,t),635,98,345,{size:31,min:23,lines:1,color:pending?'#5d320d':'#fff',weight:800});
  text(ctx,t.need,76,212,69,'#fff',800);text(ctx,t.share,78,309,28,'#eac6cd',600);
  block(ctx,68,406,944,200,26,'#fbf1f2');
  text(ctx,t.group,104,442,25,palette.soft,700);
  truncated=fitted(ctx,r.bloodGroup||'—',100,483,440,{size:98,min:40,lines:1,color:palette.deep,weight:800})||truncated;
  line(ctx,606,445,606,564,'#e6d3d7');
  text(ctx,t.units,646,449,25,palette.soft,700);
  truncated=fitted(ctx,String(r.units||1),646,490,290,{size:76,min:30,lines:1,color:palette.deep,weight:800})||truncated;
  text(ctx,t.deadline,76,658,26,palette.red,800);
  truncated=fitted(ctx,deadline(r.neededBy,lang),76,706,920,{size:44,min:28,lines:1,weight:700})||truncated;
  text(ctx,t.hospital,76,790,26,palette.soft,700);
  truncated=fitted(ctx,r.hospital||'—',76,838,920,{size:48,min:27,lines:2,weight:700})||truncated;
  line(ctx,76,969,1004,969);
  text(ctx,t.district,76,1003,25,palette.soft,700);
  truncated=fitted(ctx,[place(r.district,lang),r.area].filter(Boolean).join(' · ')||'—',76,1050,385,{size:43,min:25,lines:2})||truncated;
  text(ctx,t.contact,552,1003,25,palette.soft,700);
  truncated=fitted(ctx,r.phone||'—',552,1050,440,{size:40,min:25,lines:2})||truncated;
  block(ctx,64,1185,952,92,23,palette.blush);drop(ctx,106,1231,15,palette.red);
  fitted(ctx,t.verify,138,1210,848,{size:25,min:21,lines:2,color:palette.deep,weight:700});
  return {truncated};
}
export async function downloadCard(canvas,filename) {
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
  if(!blob) throw new Error('Could not generate PNG');
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
}
export function openRequestCard(request) {
  const done=dialog({title:'Emergency request card',body:`<div class="share-card-preview"><p>Review the card before sharing. The contact number will be visible in the image.</p><canvas id="requestCardCanvas" width="1080" height="1350" role="img" aria-label="Emergency request card preview"></canvas><p id="requestCardSummary" class="card-a11y" data-no-translate aria-live="polite"></p><p id="requestCardWarning" class="card-warning" hidden>Some long details were shortened. Check the image before sharing.</p><button type="button" id="downloadRequestCard" class="btn btn-primary" disabled>Download PNG</button></div>`,confirmText:'Close',hideCancel:true});
  const sheet=document.querySelector('#modalRoot .modal:last-of-type');if(!sheet)return;
  const canvas=sheet.querySelector('#requestCardCanvas'),btn=sheet.querySelector('#downloadRequestCard'),warning=sheet.querySelector('#requestCardWarning');let seq=0;
  const redraw=async()=>{const n=++seq;btn.disabled=true;try{const stage=document.createElement('canvas');const result=await renderEmergencyCard(stage,request);if(n!==seq)return;canvas.width=stage.width;canvas.height=stage.height;canvas.getContext('2d').drawImage(stage,0,0);warning.hidden=!result.truncated;sheet.querySelector('#requestCardSummary').textContent=[status(request,copy[language()]||copy.bn),request.bloodGroup,request.units,deadline(request.neededBy,language()),request.hospital,place(request.district,language()),request.area,request.phone].filter(Boolean).join(' · ');btn.disabled=false;}catch{toast('Card preview could not be created. Please try again.','error');}};
  let lastLang=language();const observer=new MutationObserver(()=>{const next=language();if(next!==lastLang){lastLang=next;redraw();}});observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});done.then(()=>observer.disconnect());
  btn.addEventListener('click',async()=>{try{await downloadCard(canvas,'onedrop-emergency-request.png');}catch{toast('Download failed. Please try again.','error');}});redraw();
}
