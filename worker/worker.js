// watchingfromorbit message board and question box.
// Runs as a Cloudflare Worker with a D1 database bound as DB and a secret ADMIN_KEY.
// Setup steps are in README.md under "Messages".
//
// Public:
//   GET  /messages        approved board messages, newest first (JSON)
//   POST /messages        { kind: "board" | "question", name, body, website }  -> held for approval
// Private:
//   GET  /admin           sign-in form
//   POST /admin           list pending messages and questions, approve or reject them

const ALLOWED_ORIGINS = ['https://watchingfromorbit.com', 'https://www.watchingfromorbit.com', 'http://localhost:8766', 'http://localhost:8790'];
const MAX_BODY = 500, MAX_NAME = 40;
const RATE_SECONDS = 600;      // one message per visitor per 10 minutes
const DAILY_CAP = 300;         // stop accepting after this many in 24 hours, so the database can't be flooded

const now = () => Math.floor(Date.now() / 1000);

function cors(req) {
  const o = req.headers.get('Origin');
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(o) ? o : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}
function json(req, data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...cors(req) } });
}
const clean = (s, max) => String(s || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/\s+\n/g, '\n').trim().slice(0, max);
const hasLink = s => /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|io|ru|xyz|info|biz|co|me|ly|gg)\b)/i.test(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}
function sameKey(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

async function listPublic(req, env) {
  const { results } = await env.DB.prepare(
    "SELECT id, name, body, country, city, created FROM messages WHERE kind = 'board' AND status = 'approved' ORDER BY created DESC LIMIT 100"
  ).all();
  return json(req, { messages: results });
}

async function submit(req, env) {
  let data;
  try { data = await req.json(); } catch { return json(req, { error: 'Send the message as JSON.' }, 400); }
  if (data.website) return json(req, { ok: true });                       // honeypot: bots fill hidden fields
  const kind = data.kind === 'question' ? 'question' : 'board';
  const body = clean(data.body, MAX_BODY), name = clean(data.name, MAX_NAME);
  if (body.length < 2) return json(req, { error: 'Write something first.' }, 400);
  if (hasLink(body) || hasLink(name)) return json(req, { error: 'Messages can\'t include links or web addresses.' }, 400);

  const ip = req.headers.get('CF-Connecting-IP') || '0.0.0.0';
  const ipHash = await sha256(ip + '|' + env.ADMIN_KEY);                  // the address itself is never stored
  const t = now();
  const recent = await env.DB.prepare('SELECT COUNT(*) AS n FROM messages WHERE ip_hash = ? AND created > ?').bind(ipHash, t - RATE_SECONDS).first();
  if (recent && recent.n > 0) return json(req, { error: 'You just sent one. Try again in a few minutes.' }, 429);
  const today = await env.DB.prepare('SELECT COUNT(*) AS n FROM messages WHERE created > ?').bind(t - 86400).first();
  if (today && today.n >= DAILY_CAP) return json(req, { error: 'The board is full for today. Try again tomorrow.' }, 429);

  const cf = req.cf || {};
  await env.DB.prepare('INSERT INTO messages (kind, name, body, country, city, ip_hash, status, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(kind, name || null, body, cf.country || null, kind === 'board' ? (cf.city || null) : null, ipHash, 'pending', t).run();
  return json(req, { ok: true });
}

function adminPage(inner) {
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>Messages</title><style>
body{font:16px/1.5 system-ui,sans-serif;margin:0;padding:24px;background:#141110;color:#f3ece2;max-width:760px}
h1{font-weight:500;font-size:22px}h2{font-weight:500;font-size:17px;margin-top:32px;opacity:.8}
.m{border:1px solid #3a2e28;border-radius:8px;padding:14px 16px;margin:12px 0}.meta{font-size:13px;opacity:.6;margin-bottom:6px}
.body{white-space:pre-wrap}form.act{display:inline}button,input{font:inherit;padding:8px 14px;border-radius:999px;border:1px solid #5a4a40;background:transparent;color:inherit;cursor:pointer}
.ok{background:#2f5d3a;border-color:#2f5d3a}.no{background:#6b2a22;border-color:#6b2a22}.row{display:flex;gap:8px;margin-top:10px}
input[type=password]{width:260px;cursor:text}p.note{opacity:.6;font-size:14px}</style></head><body>${inner}</body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Frame-Options': 'DENY' } });
}
const signIn = (msg = '') => adminPage(`<h1>Messages</h1>${msg ? `<p>${esc(msg)}</p>` : ''}<form method="post"><input type="password" name="key" placeholder="Admin key" autofocus> <button>Sign in</button></form>`);

async function admin(req, env) {
  if (req.method !== 'POST') return signIn();
  const form = await req.formData();
  const key = String(form.get('key') || '');
  if (!env.ADMIN_KEY || !sameKey(key, env.ADMIN_KEY)) return signIn('That key is wrong.');
  const id = Number(form.get('id')), action = form.get('action');
  if (id && ['approved', 'rejected'].includes(action)) await env.DB.prepare('UPDATE messages SET status = ? WHERE id = ?').bind(action, id).run();
  if (id && action === 'delete') await env.DB.prepare('DELETE FROM messages WHERE id = ?').bind(id).run();

  const { results: pending } = await env.DB.prepare("SELECT * FROM messages WHERE status = 'pending' ORDER BY created ASC LIMIT 200").all();
  const { results: approved } = await env.DB.prepare("SELECT * FROM messages WHERE kind = 'board' AND status = 'approved' ORDER BY created DESC LIMIT 30").all();
  const card = (m, buttons) => `<div class="m"><div class="meta">${m.kind === 'question' ? 'Private question' : 'Board'} · ${esc(m.name || 'No name')} · ${esc([m.city, m.country].filter(Boolean).join(', ') || 'Unknown place')} · ${new Date(m.created * 1000).toLocaleString('en-US', { timeZone: 'America/Chicago' })}</div><div class="body">${esc(m.body)}</div><div class="row">${buttons.map(([a, label, cls]) => `<form class="act" method="post"><input type="hidden" name="key" value="${esc(key)}"><input type="hidden" name="id" value="${m.id}"><input type="hidden" name="action" value="${a}"><button class="${cls}">${label}</button></form>`).join('')}</div></div>`;
  const qs = pending.filter(m => m.kind === 'question'), bs = pending.filter(m => m.kind === 'board');
  return adminPage(`<h1>Messages</h1><p class="note">Approved board messages appear on the site. Questions are never shown publicly; "Done" files them away.</p>
<h2>Waiting for approval (${bs.length})</h2>${bs.map(m => card(m, [['approved', 'Approve', 'ok'], ['rejected', 'Reject', 'no']])).join('') || '<p class="note">Nothing waiting.</p>'}
<h2>Private questions (${qs.length})</h2>${qs.map(m => card(m, [['approved', 'Done', 'ok'], ['delete', 'Delete', 'no']])).join('') || '<p class="note">No new questions.</p>'}
<h2>On the board now</h2>${approved.map(m => card(m, [['rejected', 'Take down', 'no']])).join('') || '<p class="note">Nothing yet.</p>'}`);
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors(req) });
    try {
      if (url.pathname === '/messages' && req.method === 'GET') return listPublic(req, env);
      if (url.pathname === '/messages' && req.method === 'POST') return submit(req, env);
      if (url.pathname === '/admin') return admin(req, env);
      return json(req, { error: 'Not found' }, 404);
    } catch (e) {
      return json(req, { error: 'Something went wrong. Try again later.' }, 500);
    }
  },
};
