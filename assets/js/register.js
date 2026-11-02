/* Register / edit donor profile — validation, geolocation, share card */

import { BLOOD_GROUPS, isValidPhone, normalizePhone, isPlausibleDate } from './blood.js';
import { addDonor, updateDonor, deleteDonor, listDonors, isLive, nextEligibleDate } from './data.js';

/* Lost-phone recovery: a saved code + the registered number re-links the
   profile on a new device. No OTP, no account, no extra signup steps. */
const hashRecovery = (s) => { let h = 5381; for (const c of String(s).toUpperCase().replace(/\s/g, '')) h = ((h * 33) ^ c.charCodeAt(0)) >>> 0; return h.toString(36); };
const makeRecoveryCode = () => 'OD-' + Array.from({ length: 6 }, () => 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 31)]).join('');
import { icon, toast, bootUI, dialog, shareUrl, copyText, bloodBadge, avatar, communityCard, wireCommunity, escapeHtml as _e } from './ui.js';
import { DISTRICTS, getPosition } from './geo.js';
import { DONATION_COOLDOWN_DAYS, LS } from './config.js';
import { waitForAuth } from './firebase.js';

const state = { editingId: null, lat: null, lng: null, locationSource: 'district' };

export async function initRegister() {
  bootUI('register');
  const form = document.getElementById('donorForm');
  if (!form) return;

  form.querySelector('[name="bloodGroup"]').innerHTML =
    `<option value="">Select your blood group</option>` + BLOOD_GROUPS.map((g) => `<option value="${g}">${g}</option>`).join('');
  form.querySelector('[name="district"]').innerHTML =
    `<option value="">Select district</option>` + DISTRICTS.map((d) => `<option value="${d}">${d}</option>`).join('');
  form.querySelector('[name="lastDonation"]').max = new Date().toISOString().slice(0, 10);

  wireLiveValidation(form);
  wireLocation(form);
  wireAutoBadge(form);

  // Are we editing an existing profile?
  await hydrateExisting(form);

  form.addEventListener('submit', (e) => { e.preventDefault(); submit(form); });
}

function wireLiveValidation(form) {
  form.querySelectorAll('[data-rules]').forEach((f) => {
    f.addEventListener('blur', () => validate(f));
    f.addEventListener('input', () => { if (f.dataset.touched === '1') validate(f); updateProgress(form); });
    f.addEventListener('change', () => { f.dataset.touched = '1'; validate(f); updateProgress(form); });
  });
  form.elements.consent.addEventListener('change', () => updateProgress(form));
  updateProgress(form);
}

function validate(field) {
  const rules = JSON.parse(field.dataset.rules || '{}');
  const val = String(field.value || '').trim();
  let msg = '';
  if (rules.required && !val) msg = rules.msg || 'This field is required';
  else if (val && rules.name && !/^[\p{L}][\p{L}\s.'-]{2,}$/u.test(val)) msg = 'Use letters only, at least 3 characters';
  else if (val && rules.phone && !isValidPhone(val)) msg = 'Enter a valid Bangladeshi mobile number, e.g. 01712345678';
  else if (val && rules.date && !isPlausibleDate(val)) msg = 'Pick a realistic date (not in the future)';
  else if (val && rules.age) {
    const n = Number(val);
    if (!Number.isFinite(n) || n < 18 || n > 65) msg = 'Enter an age from 18 to 65 for this optional field.';
  }
  setError(field, msg);
  field.dataset.touched = '1';
  return !msg;
}

function setError(field, msg) {
  const wrap = field.closest('.field');
  if (!wrap) return;
  wrap.classList.toggle('is-invalid', !!msg);
  wrap.classList.toggle('is-valid', !msg && String(field.value || '').trim().length > 0);
  let el = wrap.querySelector('.field-error');
  if (msg) {
    if (!el) { el = document.createElement('span'); el.className = 'field-error'; el.setAttribute('role', 'alert'); wrap.appendChild(el); }
    el.textContent = msg;
    field.setAttribute('aria-invalid', 'true');
  } else if (el) { el.remove(); field.removeAttribute('aria-invalid'); }
}

function updateProgress(form) {
  const bar = document.getElementById('formProgress');
  if (!bar) return;
  const fields = Array.from(form.querySelectorAll('[data-rules][required]'));
  const done = fields.filter((f) => String(f.value || '').trim().length > 0 && !f.closest('.field')?.classList.contains('is-invalid')).length + (form.elements.consent.checked ? 1 : 0);
  const pct = Math.round((done / (fields.length + 1)) * 100);
  bar.style.setProperty('--p', `${pct}%`);
  const label = document.getElementById('formProgressLabel');
  if (label) label.textContent = pct === 100 ? 'All set — submit when ready' : `${pct}% complete`;
}

function wireAutoBadge(form) {
  const sel = form.querySelector('[name="bloodGroup"]');
  const preview = document.getElementById('badgePreview');
  sel.addEventListener('change', () => {
    if (!sel.value) { preview.innerHTML = ''; return; }
    preview.innerHTML = bloodBadge(sel.value, 'lg');
  });
}

function wireLocation(form) {
  const btn = document.getElementById('btnUseLocation');
  const out = document.getElementById('locationOut');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    btn.disabled = true; btn.textContent = 'Locating…';
    const res = await getPosition();
    btn.disabled = false; btn.innerHTML = `${icon('pin')} Use my current location`;
    if (res.error) {
      state.lat = null; state.lng = null; state.locationSource = 'district';
      out.innerHTML = `<span class="loc-fallback">${icon('info')} Location unavailable — we will use your district to estimate distance.</span>`;
      toast(res.error === 'denied' ? 'Location permission denied. District will be used instead.' : 'Could not get GPS fix on this device.', 'info');
      return;
    }
    state.lat = Number(res.lat.toFixed(5));
    state.lng = Number(res.lng.toFixed(5));
    state.locationSource = 'gps';
    out.innerHTML = `<span class="loc-ok">${icon('check')} Precise location saved (±${Math.round(res.accuracy || 0)} m). Coordinates are accessible with your public record.</span>`;
  });
}

async function hydrateExisting(form) {
  const uid = localStorage.getItem(LS.UID);
  const myId = localStorage.getItem(LS.MY_DONOR);
  if (!uid && !myId) return;
  const rows = await listDonors();
  const mine = rows.find((r) => (myId && r.id === myId) || (uid && r.uid === uid));
  if (!mine) return;

  state.editingId = mine.id;
  state.lat = mine.lat; state.lng = mine.lng; state.locationSource = mine.locationSource || 'district';
  form.elements.name.value = mine.name || '';
  form.elements.phone.value = mine.phone || '';
  form.elements.bloodGroup.value = mine.bloodGroup || '';
  form.elements.district.value = mine.district || '';
  form.elements.area.value = mine.area || '';
  form.elements.available.checked = mine.available !== false;
  form.elements.lastDonation.value = mine.lastDonation ? mine.lastDonation.slice(0, 10) : '';
  form.elements.age.value = mine.age || '';
  form.elements.note.value = mine.note || '';
  form.elements.donations.value = mine.donations || 0;
  form.elements.consent.checked = true;
  if (mine.age || mine.note || mine.donations || mine.lat != null) document.getElementById('optionalDetails').open = true;

  document.getElementById('formTitle').textContent = 'Update your donor profile';
  document.getElementById('formIntro').textContent = 'You can update the information in your profile. Changes need a successful connection to save.';
  const submit = form.querySelector('[type="submit"]');
  submit.innerHTML = `${icon('check')} Save changes`;
  document.getElementById('profileStatus')?.classList.remove('hidden');
  const st = document.getElementById('profileStatus');
  if (st) {
    st.innerHTML = `${icon('shield')}<div>
      <strong>Your donor profile</strong>
      <span><span>Status</span>: <span>${mine.status === 'verified' ? 'Reviewed by the team' : 'Awaiting review'}</span> · <span>${mine.available !== false ? 'Marked available' : 'Marked unavailable'}</span></span>
    </div>
    <button class="link-btn" id="btnCopyMyLink">Copy my donor link</button>`;
    st.querySelector('#btnCopyMyLink')?.addEventListener('click', async () => {
      const url = new URL('donors.html', location.href);
      url.searchParams.set('q', mine.name);
      const ok = await copyText(url.toString());
      toast(ok ? 'Donor link copied.' : 'Could not copy the link.', ok ? 'success' : 'error');
    });
  }
  updateProgress(form);
}

async function submit(form) {
  let ok = true;
  form.querySelectorAll('[data-rules]').forEach((f) => { if (!validate(f)) ok = false; });
  if (!form.elements.consent.checked) { toast('Please accept the consent statement to continue.', 'error'); ok = false; }
  if (!ok) {
    toast('Please fix the highlighted fields.', 'error');
    const first = form.querySelector('.is-invalid input, .is-invalid select, .is-invalid textarea');
    const details = first?.closest('details'); if (details) details.open = true;
    first?.focus();
    return;
  }

  const btn = form.querySelector('[type="submit"]');
  const original = btn.innerHTML;
  btn.disabled = true; btn.classList.add('is-loading'); btn.textContent = 'Saving…';

  const data = {
    name: form.elements.name.value.trim(),
    phone: normalizePhone(form.elements.phone.value),
    bloodGroup: form.elements.bloodGroup.value,
    district: form.elements.district.value,
    area: form.elements.area.value.trim(),
    available: form.elements.available.checked,
    lastDonation: form.elements.lastDonation.value ? new Date(form.elements.lastDonation.value).toISOString() : null,
    lat: state.lat, lng: state.lng, locationSource: state.locationSource,
    age: form.elements.age.value ? Number(form.elements.age.value) : null,
    note: form.elements.note.value.trim(),
    donations: Number(form.elements.donations.value) || 0
  };

  let recoveryCode = null;
  // Cross-device recovery requires verified authentication; do not promise it yet.

  const isNew = !state.editingId;
  let saved;
  try {
    if (state.editingId) {
      if (!(await updateDonor(state.editingId, data))) throw new Error('Update failed');
      saved = { id: state.editingId, ...data };
    } else saved = await addDonor(data);
  } catch (err) {
    btn.disabled = false; btn.classList.remove('is-loading'); btn.innerHTML = original;
    toast('প্রোফাইল সংরক্ষণ হয়নি। সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।', 'error', 10000);
    return;
  }

  if (!state.editingId) {
    state.editingId = saved.id;
    localStorage.setItem(LS.MY_DONOR, saved.id);
    if (recoveryCode) localStorage.setItem(LS.RECOVERY, recoveryCode);
    const user = await waitForAuth(1500);
    if (user) localStorage.setItem(LS.UID, user.uid);
  }

  btn.disabled = false; btn.classList.remove('is-loading'); btn.innerHTML = original;
  showSuccess(saved, recoveryCode, isNew);
}

function showSuccess(d, code, isNew) {
  const panel = document.getElementById('successPanel');
  if (!panel) { toast('Saved successfully.', 'success'); return; }
  panel.hidden = false;
  panel.innerHTML = `
    <div class="success-inner">
      <div class="success-mark">${icon('check')}</div>
      <h2>${isNew ? 'Profile submitted for review' : 'Profile updated'}</h2>
      <p>Thank you, <strong data-no-translate>${_e(d.name)}</strong>. Your profile has been saved. Contact details are publicly accessible.</p>
      <div class="success-card">
        ${avatar(d.name, d.bloodGroup)}
        <div>
          <strong data-no-translate>${_e(d.name)}</strong>
          <span data-no-translate>${_e(d.bloodGroup)} · ${_e([d.area, d.district].filter(Boolean).join(', '))}</span>
          <span class="muted small">Your contact number is accessible to people looking for donors.</span>
        </div>
        ${bloodBadge(d.bloodGroup, 'lg')}
      </div>
      ${code ? `<div class="success-card" style="margin-top:.9rem;border-style:dashed">
        <div>
          <strong>Recovery code — keep it safe</strong>
          <span class="muted small">If you ever lose this phone, this code plus your mobile number restores your profile
          on a new device. No account, no OTP. Screenshot it or write it down.</span>
        </div>
        <div style="display:flex;gap:.6rem;align-items:center">
          <code style="font-size:1.15rem;font-weight:800;letter-spacing:.06em">${code}</code>
          <button class="btn btn-ghost btn-sm" id="btnCopyCode" type="button">Copy</button>
        </div>
      </div>` : ''}
      <div class="success-actions">
        <button class="btn btn-primary" id="btnShareProfile">${icon('share')} Share my profile</button>
        <a class="btn btn-ghost" href="my-donor.html">${icon('user')} Edit my profile anytime</a>
        <a class="btn btn-ghost" href="donor-card.html">${icon('download')} Create donor card</a>
        <a class="btn btn-ghost" href="donors.html?group=${encodeURIComponent(d.bloodGroup)}">See the directory</a>
      </div>
      ${communityCard('success')}
      <p class="muted small" style="margin-top:1rem">Saved to the shared cloud database.</p>
    </div>`;
  wireCommunity(panel);
  panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  panel.querySelector('#btnCopyCode')?.addEventListener('click', async () => {
    const ok = await copyText(code);
    toast(ok ? 'Recovery code copied.' : 'Copy failed.', ok ? 'success' : 'error');
  });
  panel.querySelector('#btnShareProfile')?.addEventListener('click', () => {
    const url = new URL('donors.html', location.href);
    url.searchParams.set('q', d.name);
    shareUrl(url.toString(), `${d.name} (${d.bloodGroup}) is a registered blood donor on One Drop.`);
  });
}

/* ------------------------------------------ my-donor page */
export async function initMyDonor() {
  bootUI('mydonor');
  const host = document.getElementById('myDonorHost');
  if (!host) return;
  const rows = await listDonors();
  const uid = localStorage.getItem(LS.UID);
  const myId = localStorage.getItem(LS.MY_DONOR);
  const mine = rows.find((r) => (myId && r.id === myId) || (uid && r.uid === uid));

  if (!mine) {
    host.innerHTML = `<div class="empty">
      <div class="empty-mark">${icon('user')}</div>
      <h3>No donor profile on this device</h3>
      <p>Profiles are tied to the browser you registered from. If you have lost access to that device, contact the team for help.</p>
      <div style="display:flex;gap:.6rem;flex-wrap:wrap;justify-content:center">
        <a class="btn btn-primary" href="register.html">Register as a donor</a>
        <a class="btn btn-ghost" href="privacy.html#contact">Contact the team</a>
        <a class="btn btn-ghost" href="donor-card.html">Create donor card</a>
      </div>
    </div>`;
    wireRecovery();
    return;
  }

  const next = nextEligibleDate(mine);
  host.innerHTML = `
    <div class="my-card">
      <div class="my-head">
        ${avatar(mine.name, mine.bloodGroup)}
        <div>
          <h2 data-no-translate>${_e(mine.name)}</h2>
          <p class="muted"><span data-no-translate>${_e([mine.area, mine.district].filter(Boolean).join(', '))}</span> · <span>${mine.status === 'verified' ? 'Reviewed by the team' : 'Awaiting review'}</span></p>
        </div>
        ${bloodBadge(mine.bloodGroup, 'lg')}
      </div>
      <ul class="my-facts">
        <li><span>Availability (self-reported)</span><strong>${mine.available !== false ? 'Marked available' : 'Marked unavailable'}</strong></li>
        <li><span>Display filter until</span><strong>${next ? next.slice(0, 10) : 'No date recorded'}</strong></li>
        <li><span>Donations logged</span><strong>${mine.donations || 0}</strong></li>
        <li><span>Display filter</span><strong>${DONATION_COOLDOWN_DAYS} days</strong></li>
      </ul>
      <div class="my-actions">
        <a class="btn btn-primary" href="register.html">${icon('edit')} Edit profile</a>
        <a class="btn btn-ghost" href="donor-card.html">${icon('download')} Create donor card</a>
        <button class="btn btn-ghost" id="btnToggleAvail">${mine.available !== false ? 'Mark as busy' : 'Mark as available'}</button>
        <button class="btn btn-ghost" id="btnLogDonation">${icon('drop')} I donated today</button>
        <button class="btn btn-ghost danger" id="btnRemoveProfile">${icon('trash')} Remove my listing</button>
      </div>
    </div>
    ${communityCard('donor')}`;

  wireCommunity(host);

  function wireRecovery() {
    host.querySelector('#btnRecover')?.addEventListener('click', () => {
      const wrap = document.createElement('div');
      wrap.className = 'modal';
      wrap.innerHTML = `
        <div class="modal-backdrop" data-close></div>
        <div class="modal-card" role="dialog" aria-modal="true">
          <h2>Recover your profile</h2>
          <div class="modal-body">
            <p class="muted small">Enter the mobile number you registered with and the recovery code you saved.</p>
            <form id="recoverForm" style="display:grid;gap:.7rem">
              <div class="field"><label>Mobile number</label><input class="input" name="phone" inputmode="tel" placeholder="01XXXXXXXXX" required></div>
              <div class="field"><label>Recovery code</label><input class="input" name="code" placeholder="OD-XXXXXX" autocomplete="off" required></div>
            </form>
            <p class="gate-error" id="recoverErr" role="alert"></p>
          </div>
          <div class="modal-actions">
            <button class="btn btn-ghost" data-close>Cancel</button>
            <button class="btn btn-primary" data-save>Recover</button>
          </div>
        </div>`;
      document.getElementById('modalRoot').appendChild(wrap);
      const close = () => wrap.remove();
      wrap.addEventListener('click', (e) => { if (e.target.hasAttribute('data-close')) close(); });
      wrap.querySelector('[data-save]').addEventListener('click', async () => {
        const f = wrap.querySelector('#recoverForm');
        const phone = normalizePhone(f.elements.phone.value);
        const code = f.elements.code.value.trim();
        const err = wrap.querySelector('#recoverErr');
        if (!/^(\+880|0)1[3-9]\d{8}$/.test(phone)) { err.textContent = 'Enter a valid Bangladeshi mobile number.'; return; }
        const rows = await listDonors();
        const cand = rows.find((r) => r.phone === phone && r.status !== 'suspended');
        if (!cand || !cand.recoveryHash || cand.recoveryHash !== hashRecovery(code)) {
          err.textContent = 'No matching profile. Check the number and the code, then try again.';
          return;
        }
        localStorage.setItem(LS.MY_DONOR, cand.id);
        if (cand.uid) localStorage.setItem(LS.UID, cand.uid);
        close();
        toast('Profile recovered. Welcome back.', 'success');
        setTimeout(() => location.reload(), 600);
      });
    });
  }

  host.querySelector('#btnToggleAvail').addEventListener('click', async () => {
    if (!(await updateDonor(mine.id, { available: !(mine.available !== false) }))) { toast('Update failed. Please check your connection.', 'error'); return; }
    toast('Availability updated.', 'success'); setTimeout(() => location.reload(), 600);
  });
  host.querySelector('#btnLogDonation').addEventListener('click', async () => {
    const ok = await dialog({ title: 'Log a donation', body: `<p>This records today and marks your profile unavailable. The ${DONATION_COOLDOWN_DAYS}-day display filter is not a medical eligibility decision; ask the blood bank. You can update your availability later.</p>`, confirmText: 'Log donation' });
    if (!ok) return;
    if (!(await updateDonor(mine.id, { lastDonation: new Date().toISOString(), available: false, donations: (mine.donations || 0) + 1 }))) { toast('Update failed. Please check your connection.', 'error'); return; }
    toast('Thank you for donating. Rest well.', 'success');
    setTimeout(() => location.reload(), 700);
  });
  host.querySelector('#btnRemoveProfile').addEventListener('click', async () => {
    const ok = await dialog({ title: 'Remove your listing?', body: `<p>Your donor profile will be deleted from the directory permanently.</p>`, confirmText: 'Delete my profile', variant: 'danger' });
    if (!ok) return;
    if (!(await deleteDonor(mine.id))) { toast('Deletion failed. Please check your connection.', 'error'); return; }
    localStorage.removeItem(LS.MY_DONOR);
    toast('Listing removed.', 'success');
    setTimeout(() => { location.href = 'index.html'; }, 800);
  });
}
