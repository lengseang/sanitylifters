'use strict';

// Vercel serverless function: GET /api/ideas
// Reads ideas/*.md at request time (files bundled via vercel.json `functions.includeFiles`).

const { listIdeas } = require('../lib/ideas-core.js');

module.exports = function handler(req, res) {
  try {
    const ideas = listIdeas();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ ideas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
