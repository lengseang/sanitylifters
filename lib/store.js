'use strict';

// Shared persistence layer.
//   - On Vercel: drafts live in Upstash Redis via its REST API (env vars injected
//     by the "Upstash Redis" integration: UPSTASH_REDIS_REST_URL / _TOKEN).
//   - Locally: drafts fall back to a local JSON file under .data/.
// Seed ideas from ideas/*.md are always merged in and can be shadowed by a draft
// with the same slug (so you can edit any idea, including the shipped examples).

const fs = require('fs');
const path = require('path');
const { listIdeas: listSeedIdeas } = require('./ideas-core.js');

const DRAFTS_KEY = 'ideas:drafts';
const LOCAL_FILE = path.join(__dirname, '..', '.data', 'drafts.json');

const REST_URL = (
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.KV_REST_API_URL ||
  ''
).replace(/\/$/, '');
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '';

const remote = Boolean(REST_URL && REST_TOKEN);

async function readDrafts() {
  if (remote) {
    const res = await fetch(`${REST_URL}/get/${DRAFTS_KEY}`, {
      headers: { Authorization: `Bearer ${REST_TOKEN}` },
    });
    if (!res.ok) throw new Error(`Store read failed (${res.status})`);
    const data = await res.json();
    const result = data && data.result;
    if (result == null) return [];
    return typeof result === 'string' ? JSON.parse(result) : result;
  }
  try {
    return JSON.parse(fs.readFileSync(LOCAL_FILE, 'utf8'));
  } catch (_) {
    return [];
  }
}

async function writeDrafts(drafts) {
  const json = JSON.stringify(drafts);
  if (remote) {
    const res = await fetch(`${REST_URL}/set/${DRAFTS_KEY}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${REST_TOKEN}`, 'Content-Type': 'text/plain' },
      body: json,
    });
    if (!res.ok) throw new Error(`Store write failed (${res.status})`);
    return;
  }
  fs.mkdirSync(path.dirname(LOCAL_FILE), { recursive: true });
  fs.writeFileSync(LOCAL_FILE, JSON.stringify(drafts, null, 2));
}

async function listAll() {
  const seed = listSeedIdeas();
  const drafts = await readDrafts();
  const map = new Map();
  for (const s of seed) map.set(s.slug, { ...s, source: 'file' });
  for (const d of drafts) map.set(d.slug, { ...d, source: 'draft' });
  return [...map.values()].sort((a, b) => a.slug.localeCompare(b.slug));
}

async function upsertIdea(idea) {
  const drafts = await readDrafts();
  const record = { ...idea, updatedAt: new Date().toISOString() };
  const idx = drafts.findIndex((d) => d.slug === idea.slug);
  if (idx >= 0) drafts[idx] = record;
  else drafts.push(record);
  await writeDrafts(drafts);
  return record;
}

async function deleteIdea(slug) {
  const drafts = await readDrafts();
  const next = drafts.filter((d) => d.slug !== slug);
  if (next.length === drafts.length) return false;
  await writeDrafts(next);
  return true;
}

module.exports = { listAll, upsertIdea, deleteIdea };
