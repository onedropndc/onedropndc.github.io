/* Moderator dashboard — email/password sign-in */

import { APP, VAPID_KEY, FIREBASE_CONFIG, OWNER_EMAILS } from './config.js';
import { initData, listDonors, listRequests, listMessages, markMessageRead, listAnnouncements,
         saveAnnouncement, deleteAnnouncement, updateDonor, deleteDonor, updateRequest, deleteRequest,
         clearLocalData, getStatSnapshot, isLive, logAudit } from './data.js';
import { bootUI, icon, toast, dialog, copyText, escapeHtml as _e, bloodBadge, avatar } from './ui.js';
import { formatDate, formatDateTime, timeAgo, prettyPhone, BLOOD_GROUPS } from './blood.js';
import { computeStats } from './stats.js';
import { donorsToCsv, requestsToCsv, downloadCsv, isDemoRow } from './csv.js';
import { state as fb, waitForAuth } from './firebase.js';

let ctx = { donors: [], requests: [], messages: [], announcements: [], role: 'moderator' };

/* Donor-tab view state (filters live here so a refresh or a status change
   never resets what the moderator is looking at). */
const donorView = { q: '', group: 'ALL', status: 'ALL', availableOnly: false };

const providerOf = (u) =>
  (u && u.providerData && u.providerData[0] && u.providerData[0].providerId) ||
  (u && u.isAnonymous ? 'anonymous' : '');

function friendlyAuthError(err) {
  const code = String((err && err.code) || '');
  if (code.includes('invalid-credential') || code.includes('wrong-password')) return 'Wrong email or password.';
  if (code.includes('user-not-found')) return 'No moderator account with that email. Create one in the Firebase console (Authentication → Users → Add user).';
  if (code.includes('too-many-requests')) return 'Too many attempts. Wait a few minutes and try again.';
  if (code.includes('network')) return 'Network problem while signing in. Check your connection.';
  if (code.includes('invalid-email')) return 'That does not look like a valid email address.';
  return 'Sign-in failed. ' + ((err && err.message) || '');
}

export async function initAdmin() {
  bootUI('admin');
  await initData();

  const gate = document.getElementById('adminGate');
  const panel = document.getElementById('adminPanel');
  const note = document.getElementById('gateNote');
  const form = document.getElementById('adminLogin');

  function openSession(user) {
    gate.hidden = true;
    panel.hidden = false;
    ctx.role = (user.email && OWNER_EMAILS.includes(user.email)) ? 'owner' : 'moderator';
    const emailOut = document.getElementById('adminEmailOut');
    if (emailOut) emailOut.textContent = user.email || 'moderator';
    const roleOut = document.getElementById('adminRoleOut');
    if (roleOut) roleOut.textContent = ctx.role === 'owner' ? 'Owner — full control' : 'Moderator — limited powers';
    const so = document.getElementById('adminSignOut');
    if (so && !so.dataset.wired) {
      so.dataset.wired = '1';
      so.addEventListener('click', async () => {
        try { await fb.fa.signOut(fb.auth); } catch {}
        // Leave no donor phone numbers behind on a shared device.
        ctx = { donors: [], requests: [], messages: [], announcements: [], role: 'moderator' };
        ['overviewHost', 'adminDonors', 'adminRequests', 'adminMessages', 'announceList'].forEach((id) => {
          const el = document.getElementById(id);
          if (el) { el.innerHTML = ''; el.removeAttribute('data-ready'); }
        });
        panel.hidden = true;
        form.reset();
        gate.hidden = false;
        note.textContent = 'Signed out.';
      });
    }
    loadAll().then(() => { renderOverview(); wireTabs(); });
  }

  wireAnnouncements();

  // Firebase restores sessions asynchronously — wait for it, then require a
  // password-provider (moderator) session. Everyone else sees the login card.
  let user = await waitForAuth();
  if (user && providerOf(user) !== 'password') user = null;

  if (user) { openSession(user); return; }

  if (!fb.ok) note.textContent = 'Firebase could not be reached from this device — check your connection and reload.';
  gate.hidden = false;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.adminEmail.value.trim();
    const pass = form.adminPass.value;
    if (!email || !pass) { note.textContent = 'Enter the moderator email and password.'; return; }
    const btn = document.getElementById('adminLoginBtn');
    btn.disabled = true; btn.textContent = 'Signing in…';
    note.textContent = '';
    try {
      const cred = await fb.fa.signInWithEmailAndPassword(fb.auth, email, pass);
      openSession(cred.user);
    } catch (err) {
      note.textContent = friendlyAuthError(err);
      btn.disabled = false; btn.textContent = 'Sign in';
    }
  });
}

async function loadAll() {
  const [donors, requests, messages, announcements] = await Promise.all([
    listDonors(), listRequests(), listMessages(), listAnnouncements({ includeInactive: true })
  ]);
  ctx = { donors, requests, messages, announcements, role: ctx.role };
}

function wireTabs() {
  const tabs = document.querySelectorAll('[data-tab]');
  if (!tabs.length || tabs[0].dataset.wired === '1') return;
  tabs.forEach((t) => { t.dataset.wired = '1'; });
  tabs.forEach((t) => t.addEventListener('click', () => {
    tabs.forEach((x) => {
      const on = x === t;
      x.classList.toggle('is-active', on);
      x.setAttribute('aria-selected', String(on));
      x.tabIndex = on ? 0 : -1;
    });
    document.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== t.dataset.tab; });
    if (t.dataset.tab === 'donors') renderDonors();
    if (t.dataset.tab === 'requests') renderRequests();
    if (t.dataset.tab === 'messages') renderMessages();
    if (t.dataset.tab === 'announcements') renderAnnouncements();
    if (t.dataset.tab === 'overview') renderOverview();
  }));
}

/* ---------------------------------------------------- overview */
async function renderOverview() {
  const s = computeStats(ctx.donors);
  const stats = await getStatSnapshot();
  const activeReqs = ctx.requests.filter((r) => r.status === 'active').length;
  const pending = ctx.donors.filter((d) => d.status === 'pending').length;
  const unread = ctx.messages.filter((m) => !m.read).length;

  document.getElementById('overviewHost').innerHTML = `
    <div class="stat-grid stat-grid-sm">
      ${miniStat('Donors', s.total, `${s.active} available`, 'donors')}
      ${miniStat('Pending review', pending, pending ? 'needs attention' : 'all clear', 'donors-pending')}
      ${miniStat('Active requests', activeReqs, `${ctx.requests.length} total`, 'requests')}
      ${miniStat('Unread messages', unread, unread ? 'open the inbox tab' : 'all read', 'messages')}
      ${miniStat('Visits', stats ? stats.visits : '—', 'all time')}
      ${miniStat('Registrations', stats ? stats.donations_registered : '—', 'all time')}
      ${miniStat('Requests posted', stats ? stats.requests_posted : '—', 'all time')}
      ${miniStat('Connection', isLive() ? 'Live' : 'Local', isLive() ? FIREBASE_CONFIG.projectId : 'Firebase unreachable')}
    </div>

    <div class="admin-tools">
      <h3>Tools</h3>
      <div class="tool-row">
        <button class="btn btn-primary btn-sm" id="btnExportDonorsTop">${icon('download')} Export donors (CSV)</button>
        <button class="btn btn-ghost btn-sm" id="btnExportRequestsTop">${icon('download')} Export requests (CSV)</button>
        <button class="btn btn-ghost btn-sm" id="btnRefresh">${icon('clock')} Refresh data</button>
        <button class="btn btn-ghost btn-sm danger" id="btnClearLocal">${icon('trash')} Clear local cache</button>
        ${VAPID_KEY ? '<button class="btn btn-ghost btn-sm" id="btnPush">' + icon('bell') + ' Subscribe to push</button>' : ''}
      </div>
      <p class="muted small">CSV exports contain every donor field, phone numbers included — download them only on a trusted device. Review and test the proposed firestore.rules in staging before deployment; the active rules may be different.</p>
      <div class="admin-note">
        <strong>Moderation checklist:</strong> Confirm donor details carefully before verification. Do not request identity-document photos through this site.
      </div>
    </div>`;

  if (ctx.role !== 'owner') {
    document.getElementById('btnClearLocal').style.display = 'none';
  }
  document.getElementById('btnExportDonorsTop').onclick = () => openExportDialog('donors');
  document.getElementById('btnExportRequestsTop').onclick = () => openExportDialog('requests');
  document.getElementById('btnRefresh').onclick = async () => { await loadAll(); renderOverview(); toast('Data refreshed.', 'success'); };
  document.getElementById('btnClearLocal').onclick = async () => {
    const ok = await dialog({ title: 'Clear local cache?', body: '<p>Removes cached donors, requests and the demo flag from this browser. Cloud data is untouched.</p>', confirmText: 'Clear', variant: 'danger' });
    if (ok) { clearLocalData(); await loadAll(); renderOverview(); toast('Local cache cleared.', 'success'); }
  };
  document.querySelectorAll('#overviewHost [data-jump]').forEach((el) => {
    el.addEventListener('click', () => {
      const jump = el.dataset.jump;
      const tab = jump === 'donors-pending' ? 'donors' : jump;
      if (jump === 'donors-pending') { donorView.status = 'pending'; const sel = document.getElementById('donorFilterStatus'); if (sel) sel.value = 'pending'; }
      document.querySelector(`[data-tab="${tab}"]`)?.click();
    });
  });

  const pushBtn = document.getElementById('btnPush');
  if (pushBtn && pushBtn.dataset.wired !== '1') { pushBtn.dataset.wired = '1'; pushBtn.addEventListener('click', () => subscribePush()); }
}

function miniStat(label, value, sub, jump) {
  const tag = jump ? 'button' : 'div';
  return `<${tag} class="stat-card stat-mini"${jump ? ` type="button" data-jump="${jump}"` : ''}>
    <span class="stat-value">${_e(String(value))}</span>
    <span class="stat-label">${_e(label)}</span>
    <span class="stat-sub">${_e(sub)}</span>
  </${tag}>`;
}

/* ------------------------------------------------------ donors */
const byPendingThenNewest = (a, b) => {
  const pa = a.status === 'pending' ? 0 : 1;
  const pb = b.status === 'pending' ? 0 : 1;
  if (pa !== pb) return pa - pb;
  return String(b.createdAt || '').localeCompare(String(a.createdAt || ''));
};

function filteredDonors() {
  const q = donorView.q.trim().toLowerCase();
  const digits = q.replace(/\D/g, '');
  return ctx.donors.filter((d) => {
    if (donorView.group !== 'ALL' && String(d.bloodGroup || '').toUpperCase() !== donorView.group) return false;
    if (donorView.status !== 'ALL' && String(d.status || 'pending') !== donorView.status) return false;
    if (donorView.availableOnly && d.available === false) return false;
    if (!q) return true;
    const hay = [d.name, d.district, d.area, d.note, d.phone, String(d.phone || '').replace(/\D/g, '')]
      .join(' ').toLowerCase();
    return hay.includes(q) || (digits.length >= 3 && String(d.phone || '').includes(digits));
  }).sort(byPendingThenNewest);
}

function renderDonors() {
  const host = document.getElementById('adminDonors');
  if (!host) return;

  if (host.dataset.ready !== '1') {
    host.innerHTML = `
      <div class="admin-view-head">
        <div>
          <h2 class="admin-view-title">Donor directory</h2>
          <p class="muted small">Review donor details carefully before changing the status. Do not request identity-document photos through this site.</p>
        </div>
        <div class="admin-view-actions">
          <button class="btn btn-ghost btn-sm" id="btnDonorRefresh">${icon('clock')} Refresh</button>
          <button class="btn btn-primary btn-sm" id="btnExportDonors">${icon('download')} Export CSV</button>
        </div>
      </div>

      <div class="filter-bar" role="search" aria-label="Filter donors">
        <div class="search-field">
          ${icon('search')}
          <input id="donorFilterQ" class="input" type="search" placeholder="Name, phone, area or note…" autocomplete="off" aria-label="Search donors">
        </div>
        <select id="donorFilterGroup" class="input" aria-label="Filter by blood group">
          <option value="ALL">All groups</option>
          ${BLOOD_GROUPS.map((g) => `<option value="${g}">${g}</option>`).join('')}
        </select>
        <select id="donorFilterStatus" class="input" aria-label="Filter by status">
          <option value="ALL">Any status</option>
          <option value="pending">Pending review</option>
          <option value="verified">Verified</option>
          <option value="suspended">Suspended</option>
        </select>
        <label class="switch"><input type="checkbox" id="donorFilterAvailable"> Available only</label>
        <span id="donorCount" class="muted small" aria-live="polite"></span>
      </div>

      <div id="donorTableHost" aria-live="polite"></div>

      <p class="csv-note">${icon('shield')} The CSV export contains personal data — phone numbers included.
        Download it only on a trusted device, share it only with the moderation team, and delete it when the day is done.</p>`;
    wireDonorControls(host);
    host.dataset.ready = '1';
  }
  renderDonorTable();
}

function wireDonorControls(host) {
  const q = host.querySelector('#donorFilterQ');
  q.addEventListener('input', () => { donorView.q = q.value; renderDonorTable(); });

  const group = host.querySelector('#donorFilterGroup');
  group.value = donorView.group;
  group.addEventListener('change', () => { donorView.group = group.value; renderDonorTable(); });

  const status = host.querySelector('#donorFilterStatus');
  status.value = donorView.status;
  status.addEventListener('change', () => { donorView.status = status.value; renderDonorTable(); });

  const avail = host.querySelector('#donorFilterAvailable');
  avail.checked = donorView.availableOnly;
  avail.addEventListener('change', () => { donorView.availableOnly = avail.checked; renderDonorTable(); });

  host.querySelector('#btnExportDonors').addEventListener('click', () => openExportDialog('donors'));
  host.querySelector('#btnDonorRefresh').addEventListener('click', async () => {
    await loadAll();
    renderDonorTable();
    toast('Donor list refreshed.', 'success');
  });
}

function renderDonorTable() {
  const host = document.getElementById('donorTableHost');
  if (!host) return;
  const rows = filteredDonors();
  const pending = ctx.donors.filter((d) => d.status === 'pending').length;
  const count = document.getElementById('donorCount');
  if (count) {
    count.textContent = `${rows.length} of ${ctx.donors.length} shown${pending ? ` · ${pending} awaiting review` : ''}`;
  }

  if (!rows.length) {
    host.innerHTML = `<div class="empty">
      <div class="empty-mark">${icon('search')}</div>
      <h3>No donors match this filter</h3>
      <p>Clear the search box or pick another blood group.</p>
      <div class="empty-actions"><button class="btn btn-ghost btn-sm" id="btnDonorClearFilters">Clear filters</button></div>
    </div>`;
    host.querySelector('#btnDonorClearFilters')?.addEventListener('click', () => {
      donorView.q = ''; donorView.group = 'ALL'; donorView.status = 'ALL'; donorView.availableOnly = false;
      const q = document.getElementById('donorFilterQ'); if (q) q.value = '';
      const g = document.getElementById('donorFilterGroup'); if (g) g.value = 'ALL';
      const st = document.getElementById('donorFilterStatus'); if (st) st.value = 'ALL';
      const av = document.getElementById('donorFilterAvailable'); if (av) av.checked = false;
      renderDonorTable();
    });
    return;
  }

  host.innerHTML = `<div class="table-wrap"><table class="data-table">
    <thead><tr><th scope="col">Donor</th><th scope="col">Group</th><th scope="col">Location</th><th scope="col">Contact</th><th scope="col">Status</th><th scope="col">Actions</th></tr></thead>
    <tbody>${rows.map((d) => `<tr data-row="${_e(d.id)}">
      <td><div class="cell-user">${avatar(d.name, d.bloodGroup)}<div><strong data-no-translate>${_e(d.name || 'Unnamed')}</strong><span class="muted small">${timeAgo(d.createdAt)}${isDemoRow(d) ? ' · sample' : ''}</span></div></div></td>
      <td>${bloodBadge(d.bloodGroup, 'sm')}</td>
      <td data-no-translate>${_e([d.area, d.district].filter(Boolean).join(', '))}</td>
      <td class="mono">${_e(prettyPhone(d.phone))}</td>
      <td><span class="pill pill-${_e(d.status || 'pending')}">${_e(d.status || 'pending')}</span>${d.available === false ? ' <span class="pill pill-off">busy</span>' : ''}</td>
      <td class="cell-actions">
        <button class="btn btn-ghost btn-xs" data-a="verify">${d.status === 'verified' ? 'Unverify' : 'Verify'}</button>
        ${ctx.role === 'owner' ? `<button class="btn btn-ghost btn-xs" data-a="edit">Edit</button>
        <button class="btn btn-ghost btn-xs" data-a="toggle">${d.available !== false ? 'Set busy' : 'Set available'}</button>
        <button class="btn btn-ghost btn-xs danger" data-a="delete">Delete</button>` : ''}
      </td>
    </tr>`).join('')}</tbody></table></div>`;

  host.querySelectorAll('tr[data-row]').forEach((tr) => {
    const d = ctx.donors.find((x) => x.id === tr.dataset.row);
    if (!d) return;
    tr.querySelector('[data-a="verify"]')?.addEventListener('click', async () => { if (!(await updateDonor(d.id, { status: d.status === 'verified' ? 'pending' : 'verified' }))) { toast('Update failed. Check access and connection.', 'error'); return; } await loadAll(); renderDonorTable(); toast('Status updated.', 'success'); });
    tr.querySelector('[data-a="edit"]')?.addEventListener('click', () => openEditDonor(d));
    tr.querySelector('[data-a="toggle"]')?.addEventListener('click', async () => { if (!(await updateDonor(d.id, { available: !(d.available !== false) }))) { toast('Update failed. Check access and connection.', 'error'); return; } await loadAll(); renderDonorTable(); toast('Availability updated.', 'success'); });
    tr.querySelector('[data-a="delete"]')?.addEventListener('click', async () => {
      const ok = await dialog({ title: `Delete ${d.name}?`, body: '<p>This removes the donor permanently.</p>', confirmText: 'Delete', variant: 'danger' });
      if (ok) { if (!(await deleteDonor(d.id))) { toast('Deletion failed. Check access and connection.', 'error'); return; } await loadAll(); renderDonorTable(); toast('Deleted.', 'success'); }
    });
  });
}

/* ------------------------------------------------ CSV export */
function exportRows(kind, { includeDemo, onlyFiltered }) {
  const source = kind === 'donors' ? ctx.donors : ctx.requests;
  let rows = onlyFiltered && kind === 'donors' ? filteredDonors() : source.slice();
  if (!includeDemo) rows = rows.filter((r) => !isDemoRow(r));
  return rows;
}

function openExportDialog(kind = 'donors') {
  const isDonors = kind === 'donors';
  const source = isDonors ? ctx.donors : ctx.requests;
  const demoCount = source.filter(isDemoRow).length;
  const filteredCount = isDonors ? filteredDonors().length : source.length;
  const preview = (isDonors ? donorsToCsv([], { excludeDemo: false }) : requestsToCsv([], { excludeDemo: false })).columns;
  const rowWord = isDonors ? 'donor' : 'request';

  const wrap = document.createElement('div');
  wrap.className = 'modal';
  wrap.innerHTML = `
    <div class="modal-backdrop" data-close></div>
    <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="expTitle">
      <h2 id="expTitle">Export ${rowWord}s to CSV</h2>
      <div class="modal-body">
        <p class="muted small">One spreadsheet-ready file with every field — phone numbers included.
          Treat it as confidential: open it on a trusted device and delete it when you are done.</p>

        <div class="export-facts">
          <div><span>Rows</span><strong id="expRows">0</strong></div>
          <div><span>Columns</span><strong>${preview.length}</strong></div>
          <div><span>Encoding</span><strong>UTF-8 · Excel-safe</strong></div>
        </div>

        <label class="check-line">
          <input type="checkbox" id="expIncludeDemo" ${demoCount ? '' : 'disabled'}>
          <span>Include ${demoCount} demo/sample ${rowWord}${demoCount === 1 ? '' : 's'}
            <em>${demoCount ? 'Fake rows used for demos — leave unticked for a clean export.' : 'There are none on this device.'}</em></span>
        </label>
        ${isDonors ? `<label class="check-line">
          <input type="checkbox" id="expOnlyFiltered" ${filteredCount === source.length ? 'disabled' : ''}>
          <span>Only the rows matching the current filter
            <em>${filteredCount} of ${source.length} rows</em></span>
        </label>` : ''}

        <div class="export-preview">
          <span>Columns in the file</span>
          <code>${_e(preview.join(', '))}</code>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn btn-ghost" data-close>Cancel</button>
        <button class="btn btn-primary" data-go>${icon('download')} Download CSV</button>
      </div>
    </div>`;
  document.getElementById('modalRoot').appendChild(wrap);

  const close = () => wrap.remove();
  const demoBox = wrap.querySelector('#expIncludeDemo');
  const filterBox = wrap.querySelector('#expOnlyFiltered');
  const rowsOut = wrap.querySelector('#expRows');

  const options = () => ({
    includeDemo: !!(demoBox && demoBox.checked && !demoBox.disabled),
    onlyFiltered: !!(filterBox && filterBox.checked && !filterBox.disabled)
  });
  const refresh = () => { rowsOut.textContent = String(exportRows(kind, options()).length); };
  demoBox?.addEventListener('change', refresh);
  filterBox?.addEventListener('change', refresh);
  refresh();

  wrap.addEventListener('click', (e) => { if (e.target.hasAttribute('data-close')) close(); });
  wrap.querySelector('[data-go]').addEventListener('click', async () => {
    const opts = options();
    const rows = exportRows(kind, opts);
    if (!rows.length) { toast('Nothing to export with these options.', 'error'); return; }
    const built = isDonors ? donorsToCsv(rows, { excludeDemo: false }) : requestsToCsv(rows, { excludeDemo: false });
    downloadCsv(built.filename, built.csv);
    close();
    toast(`Exported ${built.count} ${rowWord}${built.count === 1 ? '' : 's'} → ${built.filename}`, 'success', 6000);
    try { await logAudit(`export_${kind}_csv`, `${built.count} rows`); } catch { /* owner-only collection */ }
  });
}

function openEditDonor(d) {
  const wrap = document.createElement('div');
  wrap.className = 'modal';
  wrap.innerHTML = `
    <div class="modal-backdrop" data-close></div>
    <div class="modal-card" role="dialog" aria-modal="true">
      <h2>Edit donor — ${_e(d.name)}</h2>
      <div class="modal-body">
        <form id="editDonorForm" style="display:grid;gap:.7rem">
          <div class="field"><label>Full name</label><input class="input" name="name" value="${_e(d.name)}" required></div>
          <div class="field"><label>Mobile number</label><input class="input" name="phone" value="${_e(prettyPhone(d.phone))}" required></div>
          <div class="field"><label>Blood group</label><select class="input" name="bloodGroup">${['A+','A-','B+','B-','AB+','AB-','O+','O-'].map((g) => `<option ${g === d.bloodGroup ? 'selected' : ''}>${g}</option>`).join('')}</select></div>
          <div class="field"><label>District</label><input class="input" name="district" value="${_e(d.district || '')}"></div>
          <div class="field"><label>Area</label><input class="input" name="area" value="${_e(d.area || '')}"></div>
          <div class="field"><label>Public note</label><input class="input" name="note" value="${_e(d.note || '')}"></div>
        </form>
        <p class="gate-error" id="editErr" role="alert"></p>
      </div>
      <div class="modal-actions">
        <button class="btn btn-ghost" data-close>Cancel</button>
        <button class="btn btn-primary" data-save>Save changes</button>
      </div>
    </div>`;
  document.getElementById('modalRoot').appendChild(wrap);
  const close = () => wrap.remove();
  wrap.addEventListener('click', (e) => { if (e.target.hasAttribute('data-close')) close(); });
  wrap.querySelector('[data-save]').addEventListener('click', async () => {
    const f = wrap.querySelector('#editDonorForm');
    const v = Object.fromEntries(new FormData(f).entries());
    const phone = String(v.phone).replace(/[^\d+]/g, '');
    if (!v.name.trim() || !/^(\+880|0)1[3-9]\d{8}$/.test(phone)) {
      wrap.querySelector('#editErr').textContent = 'Enter a valid name and a Bangladeshi mobile number.';
      return;
    }
    if (!(await updateDonor(d.id, { name: v.name.trim(), phone, bloodGroup: v.bloodGroup, district: v.district.trim(), area: v.area.trim(), note: v.note.trim() }))) {
      wrap.querySelector('#editErr').textContent = 'Update failed. Check access and connection.'; return;
    }
    close();
    await loadAll(); renderDonors(); toast('Donor updated.', 'success');
  });
}

/* ---------------------------------------------------- requests */
function renderRequests() {
  const host = document.getElementById('adminRequests');
  const rows = ctx.requests.slice().sort(byPendingThenNewest);
  const pending = rows.filter((r) => r.status === 'pending').length;
  host.innerHTML = `
    <div class="admin-view-head">
      <div>
        <h2 class="admin-view-title">Emergency requests</h2>
        <p class="muted small">Approve a request to publish it on the live board${pending ? ` · <strong>${pending} waiting for review</strong>` : ''}.</p>
      </div>
      <div class="admin-view-actions">
        <button class="btn btn-primary btn-sm" id="btnExportRequests">${icon('download')} Export CSV</button>
      </div>
    </div>
    <div class="table-wrap"><table class="data-table">
    <thead><tr><th scope="col">Patient / hospital</th><th scope="col">Group</th><th scope="col">Units</th><th scope="col">Needed by</th><th scope="col">State</th><th scope="col">Actions</th></tr></thead>
    <tbody>${rows.map((r) => `<tr data-row="${_e(r.id)}">
      <td><div class="cell-user"><div><strong data-no-translate>${_e(r.patient || 'Patient')}</strong><span class="muted small" data-no-translate>${_e([r.hospital, r.district].filter(Boolean).join(' · '))}</span></div></div></td>
      <td>${bloodBadge(r.bloodGroup, 'sm')}</td>
      <td>${_e(r.units || 1)}</td>
      <td>${r.neededBy ? formatDate(r.neededBy) : 'ASAP'}</td>
      <td><span class="pill pill-${r.status === 'active' ? 'pending' : _e(r.status)}">${_e(r.status)}</span></td>
      <td class="cell-actions">
        ${r.status === 'pending'
          ? `<button class="btn btn-primary btn-xs" data-a="active">Approve</button>
             <button class="btn btn-ghost btn-xs danger" data-a="cancelled">Reject</button>`
          : `<button class="btn btn-ghost btn-xs" data-a="fulfilled">Fulfilled</button>
             <button class="btn btn-ghost btn-xs" data-a="cancelled">Cancel</button>
             ${ctx.role === 'owner' ? '<button class="btn btn-ghost btn-xs" data-a="active">Reopen</button>' : ''}`}
        ${ctx.role === 'owner' ? '<button class="btn btn-ghost btn-xs danger" data-a="delete">Delete</button>' : ''}
      </td>
    </tr>`).join('')}</tbody></table></div>`;

  host.querySelector('#btnExportRequests').addEventListener('click', () => openExportDialog('requests'));

  host.querySelectorAll('tr[data-row]').forEach((tr) => {
    const r = ctx.requests.find((x) => x.id === tr.dataset.row);
    tr.querySelectorAll('[data-a]').forEach((b) => {
      b.onclick = async () => {
        const a = b.dataset.a;
        if (a === 'delete') {
          const ok = await dialog({ title: 'Delete request?', body: '<p>This removes the request permanently.</p>', confirmText: 'Delete', variant: 'danger' });
          if (!ok) return;
          if (!(await deleteRequest(r.id))) { toast('Deletion failed. Check access and connection.', 'error'); return; }
        } else if (!(await updateRequest(r.id, { status: a }))) { toast('Update failed. Check access and connection.', 'error'); return; }
        await loadAll(); renderRequests(); toast('Updated.', 'success');
      };
    });
  });
}

/* ---------------------------------------------------- messages */
function renderMessages() {
  const host = document.getElementById('adminMessages');
  if (!ctx.messages.length) { host.innerHTML = '<p class="muted">No messages yet. Visitors can write from the Contact section of the Privacy page.</p>'; return; }
  host.innerHTML = ctx.messages.map((m) => `
    <article class="msg-card ${m.read ? '' : 'is-unread'}" data-msg="${_e(m.id)}">
      <header><strong data-no-translate>${_e(m.subject || 'Message')}</strong><span class="muted small">${formatDateTime(m.createdAt)}</span></header>
      <p data-no-translate>${_e(m.message)}</p>
      <footer><span data-no-translate>${_e(m.name)} · ${_e(m.contact)}</span>
      ${m.read ? '' : `<button class="link-btn" data-a="read">Mark read</button>`}</footer>
    </article>`).join('');
  host.querySelectorAll('[data-a="read"]').forEach((b) => {
    b.onclick = async () => { if (!(await markMessageRead(b.closest('[data-msg]').dataset.msg))) { toast('Update failed. Check access and connection.', 'error'); return; } await loadAll(); renderMessages(); };
  });
}

/* ------------------------------------------------ announcements */
function renderAnnouncements() {
  const list = document.getElementById('announceList');
  const rows = ctx.announcements.slice().sort((a, b) => Number(b.active !== false) - Number(a.active !== false));
  list.innerHTML = rows.length
    ? rows.map((a) => `<div class="ann-row" data-ann="${_e(a.id)}">
        <span class="pill pill-${a.active === false ? 'off' : a.level === 'alert' ? 'cancelled' : 'pending'}">${_e(a.active === false ? 'hidden' : a.level)}</span>
        <div><strong data-no-translate>${_e(a.title)}</strong><span class="muted small" data-no-translate>${_e(a.body)}</span></div>
        <button class="btn btn-ghost btn-xs" data-a="toggle">${a.active === false ? 'Show' : 'Hide'}</button>
        ${ctx.role === 'owner' ? '<button class="btn btn-ghost btn-xs danger" data-a="delete">Delete</button>' : ''}
      </div>`).join('')
    : '<p class="muted">No announcements yet.</p>';

  list.querySelectorAll('[data-ann]').forEach((row) => {
    const a = ctx.announcements.find((x) => x.id === row.dataset.ann);
    row.querySelector('[data-a="toggle"]').onclick = async () => { if (!(await saveAnnouncement({ ...a, active: !a.active }))) { toast('Update failed. Check access and connection.', 'error'); return; } await loadAll(); renderAnnouncements(); };
    row.querySelector('[data-a="delete"]')?.addEventListener('click', async () => { if (!(await deleteAnnouncement(a.id))) { toast('Deletion failed. Check access and connection.', 'error'); return; } await loadAll(); renderAnnouncements(); });
  });
}

function wireAnnouncements() {
  const form = document.getElementById('announceForm');
  if (!form || form.dataset.wired === '1') return;
  form.dataset.wired = '1';
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = form.elements.title.value.trim();
    const body = form.elements.body.value.trim();
    if (!title || !body) { toast('Both a title and a message are required.', 'error'); return; }
    if (!(await saveAnnouncement({ title, body, level: form.elements.level.value, active: true }))) { toast('Announcement not published. Check access and connection.', 'error'); return; }
    form.reset();
    await loadAll(); renderAnnouncements();
    toast('Announcement published to every visitor.', 'success');
  });
}

/* --------------------------------------------------- web push */
async function subscribePush() {
  try {
    if (!VAPID_KEY) { toast('Add VAPID_KEY to config.js first.', 'error'); return; }
    const { getMessaging, getToken, onMessage } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js');
    const messaging = getMessaging(fb.app);
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') { toast('Notification permission denied.', 'error'); return; }
    const swReg = await navigator.serviceWorker.ready;
    const token = await getToken(messaging, { vapidKey: VAPID_KEY, serviceWorkerRegistration: swReg });
    const ok = await copyText(token);
    toast(ok ? `Push token copied — add it to a Cloud Messaging topic: ${token.slice(0, 18)}…` : 'Subscribed.', 'success', 8000);
    onMessage(messaging, (p) => toast(p.notification?.body || 'New alert', 'info', 8000));
  } catch (err) {
    toast('Push setup failed: ' + (err.message || err), 'error');
  }
}
