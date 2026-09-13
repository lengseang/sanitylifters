'use strict';

// Shared HTTP handler for /api/ideas, used by both server.js (local) and
// api/ideas.js (Vercel). GET is public; POST/DELETE require a passcode.

const { listAll, upsertIdea, deleteIdea } = require('./store.js');

const STATUSES = ['idea', 'wip', 'live'];

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function normalize(idea) {
  const title = String(idea.title || '').trim();
  const tags = Array.isArray(idea.tags)
    ? idea.tags.map(String).map((t) => t.trim()).filter(Boolean)
    : idea.tags
      ? String(idea.tags).split(',').map((t) => t.trim()).filter(Boolean)
      : [];

  let slug = slugify(idea.slug);
  if (!slug) slug = slugify(title) || `idea-${Date.now().toString(36)}`;

  return {
    slug,
    title: title || 'Untitled',
    summary: String(idea.summary || '').trim(),
    tags,
    status: STATUSES.includes(idea.status) ? idea.status : 'idea',
    date: idea.date || new Date().toISOString().slice(0, 10),
    body: String(idea.body || '').trim(),
  };
}

function isAuthorized(req) {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) return false;
  const header = req.headers.authorization || '';
  return header === `Bearer ${expected}`;
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    // Vercel pre-parses JSON into req.body; plain Node does not.
    if (req.body != null && typeof req.body === 'object') return resolve(req.body);
    let data = '';
    req.on('data', (c) => {
      data += c;
      if (data.length > 1e6) req.destroy();
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

async function handleRequest(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const method = (req.method || 'GET').toUpperCase();

  if (method === 'GET') {
    try {
      return sendJson(res, 200, { ideas: await listAll() });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  if (!isAuthorized(req)) {
    return sendJson(res, 401, { error: 'Unauthorized — wrong or missing passcode.' });
  }

  if (method === 'POST') {
    try {
      const body = await readBody(req);
      const idea = await upsertIdea(normalize(body));
      return sendJson(res, 200, { idea });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  if (method === 'DELETE') {
    const slug = slugify(url.searchParams.get('slug'));
    if (!slug) return sendJson(res, 400, { error: 'Missing slug.' });
    const ok = await deleteIdea(slug);
    return sendJson(res, ok ? 200 : 404, ok ? { ok: true } : { error: 'Idea not found.' });
  }

  return sendJson(res, 405, { error: 'Method not allowed.' });
}

module.exports = { handleRequest };
