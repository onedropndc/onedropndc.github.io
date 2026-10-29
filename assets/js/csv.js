/* =============================================================
   CSV export — dependency-free, spreadsheet-safe.
   Used by the moderator dashboard to download every donor (and
   every emergency request) as a single .csv file.

   Design notes
   ------------
   * UTF-8 BOM + CRLF → Excel opens Bangla names and diacritics
     correctly instead of showing mojibake.
   * Every value is quoted and inner quotes are doubled (RFC 4180).
   * Formula-injection guard: a free-text cell that starts with
     = + - @ (or a tab / carriage return) is prefixed with an
     apostrophe, so a donor called "=HYPERLINK(...)" cannot run a
     command when an admin opens the file. Phone numbers and other
     purely numeric values are left untouched.
   * Sensitive or pointless keys (recoveryHash, internal overlays)
     never leave the browser.
   * Unknown/new fields are appended automatically, so the export
     stays complete when the schema grows.
   ============================================================= */

import { DONATION_COOLDOWN_DAYS } from './config.js';

/* -------------------------------------------------- primitives */
const RISKY_START = /^[=+\-@\t\r]/;
/* Digits, spaces and the usual phone punctuation can never form a
   formula, so phones / negative numbers stay readable. */
const NUMERIC_SAFE = /^[+\-\d\s().]+$/;

export function csvCell(value) {
  let v = value;
  if (v === null || v === undefined) v = '';
  else if (v instanceof Date) v = fmtDateTime(v.toISOString());
  else if (typeof v === 'boolean') v = v ? 'Yes' : 'No';
  else if (typeof v === 'object') v = JSON.stringify(v);
  v = String(v);

  if (RISKY_START.test(v) && !NUMERIC_SAFE.test(v)) v = `'${v}`;
  return `"${v.replace(/"/g, '""')}"`;
}

/* --------------------------------------------------- date maths */
export function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return '';
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function fmtDateTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return '';
  const p = (n) => String(n).padStart(2, '0');
  return `${fmtDate(iso)} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function stamp(date = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}_${p(date.getHours())}${p(date.getMinutes())}`;
}

/* ------------------------------------------------------ donors */
export function nextEligibleDate(donor) {
  if (!donor || !donor.lastDonation) return null;
  const t = new Date(donor.lastDonation).getTime();
  if (isNaN(t)) return null;
  return new Date(t + DONATION_COOLDOWN_DAYS * 864e5);
}

export function daysSince(iso) {
  if (!iso) return '';
  const t = new Date(iso).getTime();
  if (isNaN(t)) return '';
  return Math.max(0, Math.floor((Date.now() - t) / 864e5));
}

function eligibility(d, now = Date.now()) {
  if (String(d.status) === 'suspended') return { label: 'Suspended', next: null };
  const next = nextEligibleDate(d);
  if (next && next.getTime() > now) return { label: 'Cooling off', next };
  if (d.available === false) return { label: 'Not available', next };
  return { label: 'Yes', next };
}

/* Phone numbers arrive in mixed shapes: the register form stores E.164,
   but older rows and imports may still hold 01… or 880… . Normalise on
   the way out so every export is consistent (mirrors blood.js). */
function e164(raw) {
  let p = String(raw || '').replace(/[^\d+]/g, '');
  if (!p) return '';
  if (p.startsWith('00880')) p = `+880${p.slice(5)}`;
  else if (p.startsWith('880')) p = `+${p}`;
  else if (p.startsWith('0')) p = `+880${p.slice(1)}`;
  else if (!p.startsWith('+')) p = `+${p}`;
  return p;
}

function localPhone(raw) {
  const p = e164(raw).replace(/[^\d]/g, '');
  if (p.startsWith('880') && p.length === 13) return `0${p.slice(3)}`;
  if (p.startsWith('0')) return p;
  return p ? `0${p}` : '';
}

export function isDemoRow(row) {
  return /^demo_/.test(String(row && row.id || '')) || /^demo_/.test(String(row && row.uid || ''));
}

const DONOR_COLUMNS = [
  { label: 'name',            get: (d) => d.name },
  { label: 'blood_group',     get: (d) => d.bloodGroup },
  { label: 'phone',           get: (d) => e164(d.phone) },
  { label: 'phone_local',     get: (d) => localPhone(d.phone) },
  { label: 'district',        get: (d) => d.district },
  { label: 'area',            get: (d) => d.area },
  { label: 'age',             get: (d) => (d.age === null || d.age === undefined ? '' : d.age) },
  { label: 'status',          get: (d) => d.status || 'pending' },
  { label: 'availability',    get: (d) => (d.available === false ? 'Paused by donor' : 'Available') },
  { label: 'eligible_now',    get: (d) => eligibility(d).label },
  { label: 'next_eligible',   get: (d) => fmtDate(eligibility(d).next && eligibility(d).next.toISOString()) },
  { label: 'last_donation',   get: (d) => fmtDate(d.lastDonation) },
  { label: 'days_since_last', get: (d) => daysSince(d.lastDonation) },
  { label: 'total_donations', get: (d) => Number(d.donations) || 0 },
  { label: 'note',            get: (d) => d.note },
  { label: 'lat',             get: (d) => (d.lat === null || d.lat === undefined ? '' : d.lat) },
  { label: 'lng',             get: (d) => (d.lng === null || d.lng === undefined ? '' : d.lng) },
  { label: 'location_source', get: (d) => d.locationSource || (d.lat ? 'gps' : 'district') },
  { label: 'created_at',      get: (d) => fmtDateTime(d.createdAt) },
  { label: 'updated_at',      get: (d) => fmtDateTime(d.updatedAt) },
  { label: 'donor_id',        get: (d) => d.id },
  { label: 'uid',             get: (d) => d.uid },
  { label: 'is_demo',         get: (d) => (isDemoRow(d) ? 'Yes' : 'No') }
];

const REQUEST_COLUMNS = [
  { label: 'patient',      get: (r) => r.patient },
  { label: 'blood_group',  get: (r) => r.bloodGroup },
  { label: 'units',        get: (r) => r.units },
  { label: 'urgency',      get: (r) => r.urgency },
  { label: 'status',       get: (r) => r.status },
  { label: 'hospital',     get: (r) => r.hospital },
  { label: 'district',     get: (r) => r.district },
  { label: 'area',         get: (r) => r.area },
  { label: 'contact_name', get: (r) => r.contactName },
  { label: 'phone',        get: (r) => e164(r.phone) },
  { label: 'phone_local',  get: (r) => localPhone(r.phone) },
  { label: 'needed_by',    get: (r) => fmtDateTime(r.neededBy) },
  { label: 'note',         get: (r) => r.note },
  { label: 'created_at',   get: (r) => fmtDateTime(r.createdAt) },
  { label: 'updated_at',   get: (r) => fmtDateTime(r.updatedAt) },
  { label: 'request_id',   get: (r) => r.id },
  { label: 'uid',          get: (r) => r.uid },
  { label: 'is_demo',      get: (r) => (isDemoRow(r) ? 'Yes' : 'No') }
];

/* Keys that must never be written to a file that leaves the browser. */
const NEVER_EXPORT = new Set(['recoveryHash', 'recoveryCode', 'id', 'uid', 'createdAt', 'updatedAt',
  'bloodGroup', 'locationSource', 'available', 'lastDonation', 'donations', 'neededBy', 'contactName',
  'name', 'phone', 'district', 'area', 'age', 'note', 'lat', 'lng', 'status', 'patient', 'units',
  'urgency', 'hospital']);

/* Append any field the dashboard does not know about yet, so the
   export never silently drops data after a schema change. */
function withExtraColumns(rows, columns) {
  const seen = new Set(columns.map((c) => c.label));
  const extras = new Set();
  rows.forEach((row) => {
    Object.keys(row || {}).forEach((k) => {
      if (NEVER_EXPORT.has(k) || seen.has(k) || k.startsWith('_')) return;
      extras.add(k);
    });
  });
  return columns.concat([...extras].sort().map((k) => ({ label: k, get: (row) => row[k] })));
}

/* -------------------------------------------------------- build */
export function buildCsv(rows, baseColumns) {
  const columns = withExtraColumns(rows, baseColumns);
  const lines = [columns.map((c) => csvCell(c.label)).join(',')];
  rows.forEach((row) => lines.push(columns.map((c) => csvCell(safeGet(c, row))).join(',')));
  return { csv: lines.join('\r\n'), columns: columns.map((c) => c.label) };
}

function safeGet(column, row) {
  try { return column.get(row); } catch { return ''; }
}

export function donorsToCsv(donors, { excludeDemo = true } = {}) {
  const rows = (Array.isArray(donors) ? donors : []).filter((d) => (excludeDemo ? !isDemoRow(d) : true));
  const { csv, columns } = buildCsv(rows, DONOR_COLUMNS);
  return { csv, columns, count: rows.length, filename: `onedrop-donors_${stamp()}.csv` };
}

export function requestsToCsv(requests, { excludeDemo = true } = {}) {
  const rows = (Array.isArray(requests) ? requests : []).filter((r) => (excludeDemo ? !isDemoRow(r) : true));
  const { csv, columns } = buildCsv(rows, REQUEST_COLUMNS);
  return { csv, columns, count: rows.length, filename: `onedrop-requests_${stamp()}.csv` };
}

/* ----------------------------------------------------- download */
export function downloadCsv(filename, csvText) {
  const blob = new Blob([`\uFEFF${csvText}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  return true;
}
