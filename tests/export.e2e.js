/* =============================================================
   CSV export test — moderator dashboard.

   Runs against a throwaway copy of the site with every Google host
   blocked, so the app uses its local / demo data path and nothing is
   written to Firestore. Downloads are captured and parsed as real files.

   Run:  node tests/export.e2e.js
   ============================================================= */
const { chromium } = require('playwright-core');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { serve, chromiumPath, Reporter } = require('./serve');

const SRC = path.join(__dirname, '..');
const ROOT = path.join(os.tmpdir(), 'lifeline-exporttest');
const PORT = Number(process.env.PORT || 8131);
const r = new Reporter();
const check = (n, c, d) => r.check(n, c, d);

const parseCsv = (text) => {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\r') { /* skip */ }
    else if (ch === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((x) => x.length && !(x.length === 1 && x[0] === ''));
};

(async () => {
  const exe = chromiumPath();
  if (!exe) { console.error('No Chromium found. See tests/README.md'); process.exit(2); }

  fs.rmSync(ROOT, { recursive: true, force: true });
  fs.cpSync(SRC, ROOT, { recursive: true, filter: (s) => !s.includes('/node_modules') && !s.includes('/tests') });

  const cfg = path.join(ROOT, 'assets/js/config.js');
  fs.writeFileSync(cfg, fs.readFileSync(cfg, 'utf8').replace("'foysal.cyber@gmail.com'", "'owner@test.local'"));

  const server = await serve(ROOT, PORT);
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, acceptDownloads: true });
  await context.route('**://*.googleapis.com/**', (x) => x.abort());
  await context.route('**://*.firebaseapp.com/**', (x) => x.abort());
  await context.route('**://*.gstatic.com/**', (x) => x.abort());
  const page = await context.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  const base = `http://127.0.0.1:${PORT}`;

  await page.goto(`${base}/admin.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  /* Emulated Email/Password provider — same trick as admin.e2e.js. */
  await page.evaluate(async () => {
    const fb = await import('/assets/js/firebase.js');
    const data = await import('/assets/js/data.js');
    fb.state.ok = true; fb.state.authOk = true;
    const current = { uid: 'export_owner_1', email: 'owner@test.local', providerData: [{ providerId: 'password' }] };
    fb.state.auth = { get currentUser() { return current; } };
    fb.state.fa = {
      onAuthStateChanged(auth, cb) { setTimeout(() => cb(current), 20); return () => {}; },
      signInWithEmailAndPassword() { return Promise.resolve({ user: current }); },
      signOut() { return Promise.resolve(); }
    };

    /* One real donor with a spreadsheet-hostile name + a very new donation date. */
    await data.initData();
    await data.addDonor({
      name: '=HYPERLINK("http://evil.example","Export Test")',
      phone: '01712345678', bloodGroup: 'B+', district: 'Dhaka', area: 'Uttara Sector 7',
      age: 24, note: 'Quoted "note", with a comma', status: 'verified', donations: 2,
      lastDonation: new Date(Date.now() - 5 * 864e5).toISOString()
    });

    await data.addRequest({
      patient: 'Export Test Patient (40)', bloodGroup: 'O+', units: 2, hospital: 'Dhaka Medical College',
      district: 'Dhaka', area: 'Shahbagh', contactName: 'Attendant', phone: '01812345678',
      neededBy: new Date(Date.now() + 6 * 36e5).toISOString(), note: 'Export test request', urgency: 'critical'
    });

    const admin = await import('/assets/js/admin.js');
    await admin.initAdmin();
  });
  await page.waitForTimeout(900);
  check('export: dashboard opens with emulated owner session', await page.locator('#adminPanel').isVisible());
  check('export: tabs announce selection', await page.locator('[data-tab="overview"]').getAttribute('aria-selected') === 'true');

  await page.locator('[data-tab="donors"]').click();
  await page.waitForTimeout(700);
  check('export: selected tab updates aria-selected',
    await page.locator('[data-tab="donors"]').getAttribute('aria-selected') === 'true' &&
    await page.locator('[data-tab="overview"]').getAttribute('aria-selected') === 'false');

  const totalRows = await page.locator('#adminDonors tbody tr').count();
  check('export: donor toolbar rendered', await page.locator('#btnExportDonors').isVisible());
  check('export: filter bar rendered', await page.locator('#donorFilterQ').isVisible());
  check('export: count label filled', /of \d+ shown/.test(await page.locator('#donorCount').textContent()),
    await page.locator('#donorCount').textContent());

  /* ---------------- filtering ---------------- */
  await page.fill('#donorFilterQ', 'Uttera-not-here');
  await page.waitForTimeout(250);
  check('export: empty filter state shown', await page.locator('#btnDonorClearFilters').isVisible());
  await page.fill('#donorFilterQ', 'Uttara');
  await page.waitForTimeout(250);
  const uttaraRows = await page.locator('#adminDonors tbody tr').count();
  check('export: search narrows the table', uttaraRows >= 1 && uttaraRows < totalRows, `${uttaraRows}/${totalRows}`);
  await page.fill('#donorFilterQ', '');
  await page.selectOption('#donorFilterGroup', 'O-');
  await page.waitForTimeout(250);
  const oMinus = await page.locator('#adminDonors tbody tr td:nth-child(2)').allTextContents();
  check('export: blood-group filter works', oMinus.length > 0 && oMinus.every((t) => t.trim() === 'O−' || t.trim() === 'O-'),
    JSON.stringify(oMinus.slice(0, 4)));
  await page.selectOption('#donorFilterGroup', 'ALL');
  await page.waitForTimeout(200);

  /* ---------------- export dialog ---------------- */
  await page.click('#btnExportDonors');
  await page.waitForTimeout(400);
  check('export: dialog opens', await page.locator('.modal-card #expTitle').isVisible());
  const rowsOut = Number(await page.locator('#expRows').textContent());
  check('export: dialog counts non-demo rows', rowsOut >= 1 && rowsOut < totalRows, `rows=${rowsOut} total=${totalRows}`);

  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 15000 }),
    page.click('.modal [data-go]')
  ]);
  const csvPath = await download.path();
  const raw = fs.readFileSync(csvPath, 'utf8');
  const text = raw.replace(/^\uFEFF/, '');
  const rows = parseCsv(text);
  const header = rows[0];

  check('export: file name', /^onedrop-donors_\d{4}-\d{2}-\d{2}_\d{4}\.csv$/.test(download.suggestedFilename()),
    download.suggestedFilename());
  check('export: UTF-8 BOM present', raw.charCodeAt(0) === 0xFEFF);
  check('export: uses CRLF line endings', raw.includes('\r\n'));
  check('export: header carries every donor field',
    ['name', 'blood_group', 'phone', 'phone_local', 'district', 'area', 'age', 'status', 'availability',
      'eligible_now', 'next_eligible', 'last_donation', 'days_since_last', 'total_donations', 'note',
      'lat', 'lng', 'location_source', 'created_at', 'updated_at', 'donor_id', 'uid', 'is_demo']
      .every((c) => header.includes(c)), header.join(','));
  check('export: no recovery hash column', !header.includes('recoveryHash'));
  check('export: row count matches the dialog', rows.length - 1 === rowsOut, `${rows.length - 1} vs ${rowsOut}`);

  const idx = (col) => header.indexOf(col);
  const realRow = rows.find((x) => x[idx('phone')] === '+8801712345678');
  check('export: the new donor is in the file', !!realRow);
  check('export: phone exported twice (E.164 + local)',
    realRow && realRow[idx('phone_local')] === '01712345678', realRow && realRow[idx('phone_local')]);
  check('export: eligibility computed', realRow && realRow[idx('eligible_now')] === 'Cooling off',
    realRow && realRow[idx('eligible_now')]);
  check('export: next eligible date computed', realRow && /^\d{4}-\d{2}-\d{2}$/.test(realRow[idx('next_eligible')]),
    realRow && realRow[idx('next_eligible')]);
  check('export: note keeps quotes + commas', realRow && realRow[idx('note')] === 'Quoted "note", with a comma',
    realRow && realRow[idx('note')]);
  check('export: formula injection neutralised', realRow && realRow[idx('name')].startsWith("'=HYPERLINK"),
    realRow && realRow[idx('name')]);
  check('export: demo rows excluded by default', rows.slice(1).every((x) => x[idx('is_demo')] === 'No'));
  check('export: toast confirms the export',
    /Exported \d+ donors?/.test(await page.locator('.toast').last().textContent().catch(() => '')));

  /* ---------------- include demo rows ---------------- */
  await page.click('#btnExportDonors');
  await page.waitForTimeout(350);
  const rowsNoDemo = Number(await page.locator('#expRows').textContent());
  await page.check('#expIncludeDemo');
  await page.waitForTimeout(200);
  const rowsWithDemo = Number(await page.locator('#expRows').textContent());
  check('export: demo checkbox grows the row count', rowsWithDemo > rowsNoDemo, `${rowsNoDemo} → ${rowsWithDemo}`);
  await page.click('.modal-card .modal-actions [data-close]');
  await page.waitForTimeout(250);
  check('export: dialog closes on cancel', (await page.locator('.modal-card').count()) === 0);

  /* ---------------- filtered export ---------------- */
  await page.selectOption('#donorFilterStatus', 'verified');
  await page.waitForTimeout(250);
  await page.click('#btnExportDonors');
  await page.waitForTimeout(300);
  const filterBox = page.locator('#expOnlyFiltered');
  check('export: filtered option enabled when a filter is active', !(await filterBox.isDisabled()));
  await filterBox.check();
  const filteredCount = Number(await page.locator('#expRows').textContent());
  const [dl2] = await Promise.all([
    page.waitForEvent('download', { timeout: 15000 }),
    page.click('.modal [data-go]')
  ]);
  const rows2 = parseCsv(fs.readFileSync(await dl2.path(), 'utf8').replace(/^\uFEFF/, ''));
  const statusIdx = rows2[0].indexOf('status');
  check('export: filtered file honours the filter',
    rows2.length - 1 === filteredCount && filteredCount >= 1 && rows2.slice(1).every((x) => x[statusIdx] === 'verified'),
    `${rows2.length - 1} rows, expected ${filteredCount}`);
  await page.selectOption('#donorFilterStatus', 'ALL');
  await page.waitForTimeout(200);

  /* ---------------- requests export ---------------- */
  await page.locator('[data-tab="requests"]').click();
  await page.waitForTimeout(500);
  check('export: requests tab has its own button', await page.locator('#btnExportRequests').isVisible());
  await page.click('#btnExportRequests');
  await page.waitForTimeout(300);
  const [dl3] = await Promise.all([
    page.waitForEvent('download', { timeout: 15000 }),
    page.click('.modal [data-go]')
  ]);
  check('export: requests file name', /^onedrop-requests_/.test(dl3.suggestedFilename()), dl3.suggestedFilename());
  const reqRows = parseCsv(fs.readFileSync(await dl3.path(), 'utf8').replace(/^\uFEFF/, ''));
  check('export: requests header',
    ['patient', 'blood_group', 'units', 'hospital', 'phone', 'needed_by', 'status'].every((c) => reqRows[0].includes(c)),
    reqRows[0].join(','));
  check('export: real request exported, demo requests skipped',
    reqRows.length - 1 === 1 && reqRows[1][reqRows[0].indexOf('patient')].includes('Export Test Patient'),
    `${reqRows.length - 1} rows`);

  /* ---------------- hidden announcements stay listed (bug fix) ---------------- */
  await page.locator('[data-tab="announcements"]').click();
  await page.waitForTimeout(400);
  await page.fill('#announceForm [name="title"]', 'Visibility test');
  await page.fill('#announceForm [name="body"]', 'Toggle me twice');
  await page.click('#announceForm button[type="submit"]');
  await page.waitForTimeout(700);
  await page.locator('#announceList [data-a="toggle"]').first().click();
  await page.waitForTimeout(700);
  const annText = await page.locator('#announceList').textContent();
  check('announcements: hidden notice still listed for moderators',
    annText.includes('Visibility test') && /hidden/i.test(annText), annText.slice(0, 120));
  const showBtn = page.locator('#announceList [data-a="toggle"]').first();
  check('announcements: hidden notice can be shown again', (await showBtn.textContent()).trim() === 'Show');
  await showBtn.click();
  await page.waitForTimeout(700);
  check('announcements: restored to visible', !/hidden/i.test(await page.locator('#announceList').textContent()));

  /* ---------------- sign-out clears the PII ---------------- */
  await page.locator('[data-tab="donors"]').click();
  await page.waitForTimeout(500);
  check('export: donor table rendered before sign-out', (await page.locator('#adminDonors tbody tr').count()) > 0);
  await page.click('#adminSignOut');
  await page.waitForTimeout(600);
  const donorHost = await page.locator('#adminDonors').innerHTML();
  check('export: sign-out wipes donor rows and phone numbers',
    donorHost.trim() === '' && !(await page.content()).includes('+880 1712-345-678'));

  /* ---------------- mobile layout ---------------- */
  const mob = await context.newPage();
  await mob.setViewportSize({ width: 390, height: 844 });
  await mob.goto(`${base}/admin.html`, { waitUntil: 'networkidle' });
  await mob.waitForTimeout(1200);
  const over = await mob.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check('export: no horizontal overflow on the login card at 390px', over <= 1, `overflow=${over}px`);

  check('export: no uncaught page errors', errs.length === 0, errs.slice(0, 3).join(' | '));

  await browser.close();
  server.close();
  process.exit(r.done('export') ? 1 : 0);
})();
