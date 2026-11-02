import { BLOOD_GROUPS, isValidPhone } from './blood.js';
import { DISTRICTS, DISTRICT_LABELS } from './geo.js';
import { LS } from './config.js';
import { listDonors, isLive } from './data.js';
import { renderDonorCard, downloadCard } from './cards.js';
import { language } from './i18n.js';
import { toast } from './ui.js';

export function initDonorCard() {
  const form=document.getElementById('donorCardForm'),canvas=document.getElementById('donorCardCanvas');
  if(!form||!canvas)return;
  form.elements.bloodGroup.innerHTML='<option value="">Select blood group</option>'+BLOOD_GROUPS.map(g=>`<option value="${g}">${g}</option>`).join('');
  form.elements.district.innerHTML='<option value="">Select district</option>'+DISTRICTS.map(d=>`<option value="${d}">${DISTRICT_LABELS[d]||d}</option>`).join('');
  const button=document.getElementById('downloadDonorCard'),status=document.getElementById('cardFormStatus'),warning=document.getElementById('donorCardWarning');
  let sequence=0, currentValid=false, rendering=false, editVersion=0;
  function values() {return {name:form.elements.name.value.trim(),bloodGroup:form.elements.bloodGroup.value,district:form.elements.district.value,area:form.elements.area.value.trim(),phone:form.elements.phone.value.trim(),includePhone:form.elements.includePhone.checked};}
  function msg(en,bn){return language()==='bn'?bn:en;}
  async function draw() {
    const v=values(),seq=++sequence;
    currentValid=Boolean(v.name && BLOOD_GROUPS.includes(v.bloodGroup) && DISTRICTS.includes(v.district) && (!v.includePhone || isValidPhone(v.phone)));
    rendering=true;button.disabled=true;
    if(v.includePhone && !isValidPhone(v.phone)) status.textContent=msg('Enter a valid mobile number to include it.','নম্বর যুক্ত করতে সঠিক মোবাইল নম্বর লিখুন।');
    else status.textContent=currentValid?msg('Ready to download. Review the preview first.','ডাউনলোডের জন্য প্রস্তুত। আগে প্রিভিউ দেখে নিন।'):msg('Complete the required details to download.','ডাউনলোড করতে প্রয়োজনীয় তথ্য পূরণ করুন।');
    try {
      const stage=document.createElement('canvas');const result=await renderDonorCard(stage,v,language());if(seq!==sequence)return;
      canvas.width=stage.width;canvas.height=stage.height;canvas.getContext('2d').drawImage(stage,0,0);
      warning.hidden=!result.truncated;
      document.getElementById('donorCardSummary').textContent=[v.name,v.bloodGroup,v.district,v.area,v.includePhone?v.phone:''].filter(Boolean).join(' · ');
      rendering=false;button.disabled=!currentValid;
    } catch {if(seq!==sequence)return;rendering=false;button.disabled=true;status.textContent=msg('Card preview could not be created. Please try again.','কার্ডের প্রিভিউ তৈরি হয়নি। আবার চেষ্টা করুন।');}
  }
  form.addEventListener('input',()=>{editVersion++;draw();});form.addEventListener('change',()=>{editVersion++;draw();});
  form.addEventListener('submit',async e=>{e.preventDefault();if(!currentValid||rendering)return;button.disabled=true;try{await downloadCard(canvas,'onedrop-donor-card.png');}catch{toast('Download failed. Please try again.','error');}finally{button.disabled=!currentValid;}});
  let lastLang=language();const observer=new MutationObserver(()=>{const next=language();if(next!==lastLang){lastLang=next;draw();}});observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  document.getElementById('importDonor').addEventListener('click',async e=>{
    const id=localStorage.getItem(LS.MY_DONOR),uid=localStorage.getItem(LS.UID),out=document.getElementById('importStatus');
    if(!id&&!uid){out.textContent=msg('No donor profile was found on this device. You can enter details manually.','এই ডিভাইসে ডোনার প্রোফাইল পাওয়া যায়নি। তথ্য নিজে লিখতে পারবেন।');return;}
    const btn=e.currentTarget, startedAt=editVersion;btn.disabled=true;out.textContent=msg('Loading profile…','প্রোফাইল আনা হচ্ছে…');
    try {const rows=await listDonors();const mine=rows.find(r=>(id&&r.id===id)||(uid&&r.uid===uid));
      if(startedAt!==editVersion){out.textContent=msg('Your edits were kept; profile details were not loaded.','আপনার পরিবর্তন রাখা হয়েছে; প্রোফাইলের তথ্য বসানো হয়নি।');return;}
      if(!mine){out.textContent=msg('Profile not found. Check your connection or enter details manually.','প্রোফাইল পাওয়া যায়নি। সংযোগ পরীক্ষা করুন বা নিজে তথ্য লিখুন।');return;}
      form.elements.name.value=mine.name||'';form.elements.bloodGroup.value=mine.bloodGroup||'';form.elements.district.value=mine.district||'';form.elements.area.value=mine.area||'';form.elements.phone.value=mine.phone||'';form.elements.includePhone.checked=false;
      out.textContent=isLive()?msg('Profile details loaded. Review them before downloading.','প্রোফাইলের তথ্য আনা হয়েছে। ডাউনলোডের আগে যাচাই করুন।'):msg('Cached profile loaded; check that the details are current.','সংরক্ষিত প্রোফাইল আনা হয়েছে; তথ্য হালনাগাদ কি না যাচাই করুন।');draw();
    }catch{out.textContent=msg('Profile could not be loaded. Enter the details manually.','প্রোফাইল আনা যায়নি। তথ্য নিজে লিখুন।');}finally{btn.disabled=false;}
  });
  draw();
}
