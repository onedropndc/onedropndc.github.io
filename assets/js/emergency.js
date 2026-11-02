import { openRequestCard } from './cards.js';
import { language } from './i18n.js';
/* Emergency blood requests — posting, live feed, countdowns, sharing */

import { BLOOD_GROUPS, countdown, formatDateTime, timeAgo, prettyPhone, isValidPhone, normalizePhone } from './blood.js';
import { subscribeRequests, addRequest, updateRequest, deleteRequest, listDonors, isLive, nextEligibleDate } from './data.js';
import { icon, toast, dialog, revealPhone, initReveal, bloodBadge, copyText, escapeHtml as _e } from './ui.js';
import { DISTRICTS } from './geo.js';

let liveRows = [];
let countdownTimer = null;

/* -------------------------------------------------- live feed */
export function renderRequestFeed(host, opts = {}) {
  if (!host) return;
  host.dataset.compact = opts.compact ? '1' : '';
  host.innerHTML = `<div class="feed-loading">${icon('clock')}<span>Loading live requests…</span></div>`;

  subscribeRequests((rows, mode) => {
    host.dataset.mode = mode;
    liveRows = rows;
    paintFeed(host, opts);
    applyRequestLink(host);
  });

  if (!countdownTimer) {
    const updateTimes = () => {
      document.querySelectorAll('[data-countdown]').forEach((el) => {
        const c = countdown(el.dataset.countdown); if (!c) return;
        const value = countdownText(c); if (el.textContent !== value) el.textContent = value;
        el.classList.toggle('is-overdue', c.overdue);
      });
      document.querySelectorAll('[data-request-date]').forEach(el => {
        const value = requestDate(el.dataset.requestDate); if (el.textContent !== value) el.textContent = value;
      });
    };
    countdownTimer = setInterval(updateTimes, 1000);
    let lastLang=language();
    new MutationObserver(() => { const next=language(); if(next!==lastLang) {lastLang=next;updateTimes();} }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }

}

function countdownText(c) {
  if (language() !== 'bn') return `${c.text} ${c.overdue ? 'overdue' : 'left'}`;
  const text=c.text.replace(/(\d+)d/g,'$1 দিন').replace(/(\d+)h/g,'$1 ঘণ্টা').replace(/(\d+)m/g,'$1 মিনিট').replace(/(\d+)s/g,'$1 সেকেন্ড');
  return `${text} ${c.overdue ? 'অতিক্রান্ত' : 'বাকি'}`;
}
function requestDate(value) {
  if (!value || Number.isNaN(new Date(value).getTime())) return '—';
  try {return new Intl.DateTimeFormat(language()==='bn'?'bn-BD':'en-GB',{day:'numeric',month:'short',year:'numeric',hour:'numeric',minute:'2-digit',hour12:false,timeZone:'Asia/Dhaka'}).format(new Date(value));} catch {return formatDateTime(value);}
}

function paintFeed(host, opts) {
  // Never infer that there are no emergencies when the server is unavailable.
  if (host.dataset.mode !== 'live' && !liveRows.length) {
    host.innerHTML = `<div class="all-clear">সরাসরি তথ্য পাওয়া যাচ্ছে না। সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।</div>`;
    return;
  }
  // Public board: pending rows await moderation; expired rows auto-remove.
  const visible = liveRows.filter((r) => r.status !== 'pending' && !expired(r));
  const active = visible.filter((r) => r.status === 'active');
  const done = visible.filter((r) => r.status !== 'active');
  const limit = opts.limit || active.length;
  const list = active.slice(0, limit);

  if (!list.length && host.dataset.mode !== 'live') {
    host.innerHTML = `<div class="all-clear">পুরোনো তথ্য দেখানো হচ্ছে। বর্তমানে জরুরি অনুরোধ আছে কি না নিশ্চিত করা যাচ্ছে না।</div>`;
    if (done.length && !opts.compact) host.insertAdjacentHTML('beforeend', closedSection(done));
    wireFeed(host);
    return;
  }
  if (!list.length && !opts.compact) {
    host.innerHTML = `<div class="empty empty-soft">
      <div class="empty-mark ok">${icon('check')}</div>
      <h3>No active emergency right now</h3>
      <p>No approved active requests are visible. If blood is needed, submit a request and share it with your community.</p>
    </div>`;
    if (done.length) host.insertAdjacentHTML('beforeend', closedSection(done));
    wireFeed(host);
    return;
  }
  if (!list.length && opts.compact) {
    host.innerHTML = `<div class="all-clear">${icon('check')}<span>No approved active requests are currently shown.</span></div>`;
    return;
  }

  host.innerHTML = list.map((r) => requestCard(r, opts.compact)).join('')
    + (opts.compact && active.length > limit ? `<a class="see-all" href="emergency.html">See all ${active.length} active requests →</a>` : '')
    + (!opts.compact && done.length ? closedSection(done) : '');

  if (host.dataset.mode !== 'live') host.insertAdjacentHTML('afterbegin', '<p class="callout">পুরোনো তথ্য দেখানো হচ্ছে; বর্তমান অবস্থা যাচাই করুন।</p>');
  wireFeed(host);
  initReveal(host);
}

// A shared link targets an approved request; pending or unavailable items are
// never displayed merely because their ID was included in the URL.
function applyRequestLink(host) {
  if (host.id !== 'requestFeed') return;
  const id = new URLSearchParams(location.search).get('req');
  if (!id) return;
  const card = Array.from(host.querySelectorAll('[data-req]')).find(el => el.dataset.req === id);
  if (!card) {
    const note = document.createElement('p');
    note.className = 'callout request-link-status';
    note.textContent = host.dataset.mode !== 'live'
      ? 'The shared request cannot be confirmed while live data is unavailable.'
      : 'This request is not currently visible. It may be awaiting review, expired or removed.';
    host.prepend(note);
    return;
  }
  const details = card.closest('details'); if (details) details.open = true;
  card.classList.add('is-linked');
  if (!host.dataset.linkScrolled) {
    host.dataset.linkScrolled = '1';
    requestAnimationFrame(() => card.scrollIntoView({ block: 'center', behavior: 'auto' }));
  }
}

function closedSection(rows) {
  return `<details class="closed-wrap"><summary>Closed &amp; expired requests (${rows.length})</summary>
    <div class="closed-list">${rows.slice(0, 20).map((r) => requestCard(r, true, true)).join('')}</div></details>`;
}

function expired(r) {
  return r.neededBy && new Date(r.neededBy).getTime() < Date.now() - 6 * 36e5;
}

function requestCard(r, compact = false, closed = false) {
  const c = countdown(r.neededBy);
  const critical = r.urgency === 'critical';
  return `<article class="req-card ${critical ? 'is-critical' : ''} ${closed || r.status !== 'active' ? 'is-closed' : ''}" data-req="${_e(r.id)}" data-reveal>
    <div class="req-head">
      ${bloodBadge(r.bloodGroup, 'lg')}
      <div class="req-title">
        <h3${r.patient ? ' data-no-translate' : ''}>${_e(r.patient || 'Blood needed')}</h3>
        <p class="req-hospital">${icon('pin')}<span><span data-no-translate>${_e([r.hospital, r.area].filter(Boolean).join(' · '))}</span>${r.district ? `${r.hospital || r.area ? ' · ' : ''}<span>${_e(r.district)}</span>` : ''}</span></p>
      </div>
      ${closed || r.status !== 'active'
        ? `<span class="req-state state-${_e(r.status)}">${r.status === 'fulfilled' ? 'Fulfilled' : r.status === 'cancelled' ? 'Cancelled' : 'Expired'}</span>`
        : `<span class="req-live"><span class="pulse"></span>${critical ? 'Critical' : 'Urgent'}</span>`}
    </div>

    <ul class="req-facts">
      <li><span>Units needed</span><strong>${_e(r.units || 1)}</strong></li>
      <li><span>Needed by (BD time)</span><strong data-request-date="${_e(r.neededBy || '')}">${requestDate(r.neededBy)}</strong></li>
      <li><span>Posted</span><strong>${timeAgo(r.createdAt) || '—'}</strong></li>
      ${c && !closed && r.status === 'active' ? `<li><span>Time</span><strong class="req-count" data-countdown="${_e(r.neededBy)}">${countdownText(c)}</strong></li>` : ''}
    </ul>

    ${r.note ? `<p class="req-note">${_e(r.note)}</p>` : ''}
    ${!compact ? `<p class="req-by muted small"><span>Posted by</span> <span${r.contactName ? ' data-no-translate' : ''}>${_e(r.contactName || 'a volunteer')}</span> · <span>${_e(r.district || '')}</span></p>` : ''}

    <div class="req-actions">
      ${closed || r.status !== 'active' ? '' : `<button class="btn btn-primary btn-sm" data-act="contact">${icon('phone')}<span>Offer to donate</span></button>`}
      <button class="btn btn-ghost btn-sm" data-act="share">${icon('share')}<span>Share</span></button>
      <button class="btn btn-ghost btn-sm" data-act="card">${icon('download')}<span>Create card</span></button>
      ${closed || r.status !== 'active' ? '' : `<button class="btn btn-ghost btn-sm" data-act="matches">${icon('search')}<span>Matching donors</span></button>`}
      ${closed || r.status !== 'active' ? '' : `<button class="btn btn-ghost btn-sm" data-act="done" title="Mark as fulfilled">${icon('check')}</button>`}
    </div>
  </article>`;
}

function wireFeed(host) {
  host.querySelectorAll('.req-card').forEach((el) => {
    const r = liveRows.find((x) => x.id === el.dataset.req);
    if (!r) return;
    el.querySelector('[data-act="contact"]')?.addEventListener('click', () => offerToDonate(r));
    el.querySelector('[data-act="share"]')?.addEventListener('click', () => shareRequest(r));
    el.querySelector('[data-act="card"]')?.addEventListener('click', () => openRequestCard(r));
    el.querySelector('[data-act="matches"]')?.addEventListener('click', () => findMatches(r));
    el.querySelector('[data-act="done"]')?.addEventListener('click', async () => {
      const ok = await dialog({ title: 'Mark as fulfilled?', body: `<p>The request for <strong>${_e(r.patient || 'the patient')}</strong> will move to the closed list. Do this only when the blood has been arranged.</p>`, confirmText: 'Yes, fulfilled' });
      if (ok) { const saved = await updateRequest(r.id, { status: 'fulfilled' }); toast(saved ? 'Marked as fulfilled. Thank you.' : 'Could not update this request. Only the requester or a moderator can close it.', saved ? 'success' : 'error'); }
    });
  });
}

async function offerToDonate(r) {
  const donors = await listDonors();
  const compat = donors.filter((d) => r.district && d.district === r.district && d.available !== false && d.status !== 'suspended' && d.bloodGroup === r.bloodGroup && (!nextEligibleDate(d) || new Date(nextEligibleDate(d)) <= new Date())).slice(0, 5);
  dialog({
    title: 'Offer to donate',
    body: `<div class="offer">
      <p><strong>${_e(r.patient || 'A patient')}</strong> needs <strong>${_e(r.units || 1)} unit(s)</strong> of <strong>${_e(r.bloodGroup)}</strong> at ${_e(r.hospital || 'the hospital')}.</p>
      <p class="muted small">Call the attendant, confirm the requirement and the blood bank timing, then reach the hospital with your national ID.</p>
      <div class="offer-attendant">
        <div class="offer-attendant-who">
          <strong>${_e(r.contactName || 'Attendant')}</strong>
          <span class="muted small">is handling this request</span>
        </div>
        <button class="btn btn-primary btn-sm" type="button" data-rev="${_e(r.phone)}">${icon('phone')}<span>Show attendant contact</span></button>
      </div>
      ${compat.length ? `<p class="offer-alt">Other ${_e(r.bloodGroup)} donors marked available in the same district:</p>
        <ul class="offer-list">${compat.map((d) => `<li><span>${_e(d.name)} · ${_e(d.area || d.district || '')}</span><button class="link-btn" data-rev="${_e(d.phone)}">Show contact</button></li>`).join('')}</ul>` : ''}
    </div>`,
    confirmText: 'Close', hideCancel: true
  });
  setTimeout(() => {
    document.querySelectorAll('[data-rev]').forEach((b) => b.addEventListener('click', () => revealPhone(b.dataset.rev)));
  }, 30);
}

export function shareRequest(r) {
  const url = new URL('emergency.html', location.href);
  url.searchParams.set('req', r.id);
  const abs = url.href;
  const text = `🩸 URGENT BLOOD REQUEST\n${r.patient || 'A patient'} needs ${r.units || 1} unit(s) of ${r.bloodGroup}\nHospital: ${r.hospital}${r.area ? ', ' + r.area : ''}${r.district ? ', ' + r.district : ''}\nNeeded by: ${r.neededBy ? formatDateTime(r.neededBy) : 'ASAP'}\nContact: ${prettyPhone(r.phone)}\n${r.note || ''}\n\nVia One Drop — A Drop of Life · NDC Batch 27 blood donor community`;

  const items = [
    { id: 'native', label: 'More options', ico: 'share' },
    { id: 'whatsapp', label: 'WhatsApp', ico: 'chat' },
    { id: 'facebook', label: 'Facebook', ico: 'heart' },
    { id: 'poster', label: 'Save share poster (PNG)', ico: 'download' },
    { id: 'copy', label: 'Copy link', ico: 'pin' }
  ];
  dialog({
    title: 'Share this request',
    body: `<div class="share-list">${items.map((i) => `<button class="share-row" data-share="${i.id}">${icon(i.ico)}<span>${i.label}</span></button>`).join('')}</div>
           <p class="muted small">${_e(abs)}</p>`,
    confirmText: 'Done', hideCancel: true
  });
  setTimeout(() => {
    const sheet = document.querySelector('#modalRoot .modal:last-of-type') || document;
    sheet.querySelectorAll('[data-share]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const kind = btn.dataset.share;
        if (kind === 'poster') { sheet.querySelector('[data-ok]')?.click(); openRequestCard(r); return; }
        if (kind === 'native' && navigator.share) { try { await navigator.share({ title: text.split('\n')[0], text, url: abs }); } catch { /* dismissed */ } return; }
        if (kind === 'whatsapp') { window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + abs)}`, '_blank', 'noopener'); return; }
        if (kind === 'facebook') { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(abs)}`, '_blank', 'noopener'); return; }
        const ok = await copyText(abs);
        toast(ok ? 'Link copied to clipboard' : 'Copy failed', ok ? 'success' : 'error');
      });
    });
  }, 30);
}

async function findMatches(r) {
  const filters = new URLSearchParams({ group: r.bloodGroup });
  if (r.district) filters.set('district', r.district);
  location.href = `donors.html?${filters.toString()}`;
}

/* ------------------------------------------------- post form */
export function initRequestForm() {
  const form = document.getElementById('requestForm');
  if (!form) return;

  form.querySelector('[name="bloodGroup"]').innerHTML =
    `<option value="">Select blood group</option>` + BLOOD_GROUPS.map((g) => `<option value="${g}">${g}</option>`).join('');
  form.querySelector('[name="district"]').innerHTML =
    `<option value="">Select district</option>` + DISTRICTS.map((d) => `<option value="${d}">${d}</option>`).join('');

  // Require an explicit deadline; do not silently invent a 24-hour deadline.
  const by = form.querySelector('[name="neededBy"]');
  const localMinute = (date) => new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  if (by) by.min = localMinute(new Date());

  form.querySelectorAll('[data-live-error]').forEach((f) => {
    f.addEventListener('blur', () => validateField(f));
    f.addEventListener('input', () => { if (f.dataset.touched === '1') validateField(f); });
    f.addEventListener('change', () => { f.dataset.touched = '1'; validateField(f); });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    let ok = true;
    form.querySelectorAll('[data-live-error]').forEach((f) => { if (!validateField(f)) ok = false; });
    if (!isValidPhone(data.phone)) { setError(form.elements.phone, 'Enter a valid Bangladeshi mobile number, e.g. 01712345678'); ok = false; }
    if (!ok) { toast('Please fix the highlighted fields.', 'error'); form.querySelector('.is-invalid .input')?.focus(); return; }

    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true; btn.classList.add('is-loading'); btn.textContent = 'Posting…';

    const payload = {
      ...data,
      phone: normalizePhone(data.phone),
      neededBy: data.neededBy ? new Date(data.neededBy).toISOString() : null,
      urgency: data.urgency || 'urgent'
    };
    let saved;
    try { saved = await addRequest(payload); } catch (err) {
      btn.disabled = false; btn.classList.remove('is-loading'); btn.textContent = 'Submit request for review';
      toast('অনুরোধটি জমা হয়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।', 'error', 10000);
      return;
    }
    btn.disabled = false; btn.classList.remove('is-loading'); btn.textContent = 'Submit request for review';
    form.reset();
    if (by) by.min = localMinute(new Date());

    const next = document.getElementById('requestNext');
    if (next) {
      const filters = new URLSearchParams({ group: saved.bloodGroup, district: saved.district });
      next.hidden = false;
      next.innerHTML = `<span class="next-kicker">REQUEST RECEIVED</span><h3>Waiting for moderator review</h3>
        <p>Your request has been submitted for review. The shared link will show it on the board only after approval; meanwhile, search for donors or share the details directly.</p>
        <div class="next-actions"><a class="btn btn-primary btn-sm" href="donors.html?${filters.toString()}">Find matching donors →</a>
        <button class="btn btn-ghost btn-sm" id="shareSubmitted" type="button">Share request</button>
        <button class="btn btn-ghost btn-sm" id="cardSubmitted" type="button">Create request card</button></div>`;
      next.querySelector('#shareSubmitted').addEventListener('click', () => shareRequest(saved));
      next.querySelector('#cardSubmitted').addEventListener('click', () => openRequestCard(saved));
      next.focus(); next.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    toast('Request submitted for review.', 'success', 6000);
  });
}

function validateField(field) {
  const rules = JSON.parse(field.dataset.liveError || '{}');
  const val = String(field.value || '').trim();
  let msg = '';
  if (rules.required && !val) msg = rules.requiredMsg || 'This field is required';
  else if (rules.units && val && (!Number.isInteger(Number(val)) || Number(val) < 1 || Number(val) > 10)) msg = 'Enter a whole number from 1 to 10';
  else if (rules.phone && val && !isValidPhone(val)) msg = 'Enter a valid mobile number (11 digits, starts with 01)';
  else if (rules.min && val.length < rules.min) msg = `Please use at least ${rules.min} characters`;
  else if (rules.future && val && new Date(val).getTime() < Date.now()) msg = 'Choose a time in the future';
  setError(field, msg);
  field.dataset.touched = '1';
  return !msg;
}

function setError(field, msg) {
  const wrap = field.closest('.field') || field.parentElement;
  wrap.classList.toggle('is-invalid', !!msg);
  wrap.classList.toggle('is-valid', !msg && String(field.value || '').trim().length > 0);
  let el = wrap.querySelector('.field-error');
  if (msg) {
    if (!el) { el = document.createElement('span'); el.className = 'field-error'; el.setAttribute('role', 'alert'); wrap.appendChild(el); }
    el.textContent = msg;
    field.setAttribute('aria-invalid', 'true');
  } else if (el) { el.remove(); field.removeAttribute('aria-invalid'); }
}

/* Admin: change status / delete from the emergency page list */
export async function adminRequestAction(id, action) {
  if (action === 'delete') { await deleteRequest(id); toast('Request deleted.', 'success'); return; }
  await updateRequest(id, { status: action });
  toast('Request updated.', 'success');
}

export { liveRows };
