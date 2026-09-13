'use strict';

// Shared core: discovers and parses idea markdown files.
// Used by both the local dev server (server.js) and the Vercel function (api/ideas.js).

const fs = require('fs');
const path = require('path');

/** Locate the ideas/ directory across runtimes (local cwd vs Vercel bundle). */
function resolveIdeasDir() {
  const candidates = [
    path.join(process.cwd(), 'ideas'),
    path.join(__dirname, '..', 'ideas'),
  ];
  for (const candidate of candidates) {
    try {
      if (fs.statSync(candidate).isDirectory()) return candidate;
    } catch (_) {
      /* keep looking */
    }
  }
  throw new Error('ideas/ directory not found');
}

/** Parse a tiny YAML-ish frontmatter block and split it from the body. */
function parseFrontmatter(raw) {
  const meta = {};
  let body = raw;
  const match = raw.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?/);
  if (match) {
    body = raw.slice(match[0].length);
    for (const line of match[1].split(/\r?\n/)) {
      const kv = line.match(/^([A-Za-z0-9_-]+):[ \t]*(.*)$/);
      if (!kv) continue;
      let value = kv[2].trim();
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean);
      } else {
        value = value.replace(/^["']|["']$/g, '');
      }
      meta[kv[1]] = value;
    }
  }
  return { meta, body };
}

/** Fallback title from the first top-level heading. */
function firstHeading(body) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

/** Read every .md in ideas/ and return normalized idea objects, sorted by filename. */
function listIdeas() {
  const dir = resolveIdeasDir();
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort();

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    const slug = file.replace(/\.md$/, '');
    const tags = Array.isArray(meta.tags) ? meta.tags : meta.tags ? [meta.tags] : [];

    return {
      slug,
      file,
      title: meta.title || firstHeading(body) || slug,
      summary: meta.summary || null,
      tags,
      status: meta.status || 'idea',
      date: meta.date || null,
      body: body.trim(),
    };
  });
}

module.exports = { listIdeas, resolveIdeasDir, parseFrontmatter, firstHeading };
