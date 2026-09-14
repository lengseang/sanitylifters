```
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    ┃                                              ┃
                    ┃   ███████╗ █████╗  ███╗   ██╗ ██╗ ████████╗ ██╗   ██╗
                    ┃   ██╔════╝ ██╔══██╗ ████╗  ██║ ██║ ╚══██╔══╝ ╚██╗ ██╔╝
                    ┃   ███████╗ ███████║ ██╔██╗ ██║ ██║    ██║     ╚████╔╝
                    ┃   ╚════██║ ██╔══██║ ██║╚██╗██║ ██║    ██║      ╚██╔╝
                    ┃   ███████║ ██║  ██║ ██║ ╚████║ ██║    ██║       ██║
                    ┃   ╚══════╝ ╚═╝  ╚═╝ ╚═╝  ╚═══╝ ╚═╝    ╚═╝       ╚═╝
                    ┃                                              ┃
                    ┃        L  I  F  T  E  R  S                    ┃
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                       (ᕙ(⇀‸↼‶)ᕗ)  lift the heavy ideas first  (ᕙ( •̀ ᗜ •́ )ᕗ)
```

# Sanity Lifters

**Lift the heavy ideas first. Everything else is accessory work.**

A personal idea board with a built-in CMS. Ideas live as markdown files you can
commit to git *and* as drafts you write straight from the browser — on your phone
or your laptop. No build step, no framework, zero runtime dependencies.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lengseang/sanitylifters)

## Features

- **CMS in the browser** — create, edit, and delete ideas from the UI, with a live markdown preview.
- **Markdown-first** — seed content is plain `.md` files; drafts persist to Upstash Redis.
- **Cross-device** — drafts sync anywhere the site is reachable (phone included).
- **Search + tag filters** — filter live as you type.
- **Status tracking** — `idea` / `wip` / `live` per draft.
- **Keyboard nav** — `↑` / `↓` to move, `n` for a new idea, `Esc` to close.
- **Responsive** — a drawer sidebar and stacked layout on phones.
- **Animated hero** — a lifting barbell and floating glyphs greet you on load.
- **Component-based** — object-oriented UI (`Component`, `IdeaStore`, `Sidebar`, `IdeaView`, `Hero`, `Editor`) with a zero-dependency markdown renderer.

## One-time setup (CMS)

The site reads and writes drafts through Upstash Redis. Reads are public; writes
require a passcode. Set this up once:

1. In Vercel, open the project → **Storage** → **Create** → **Upstash Redis** (the
   Redis integration). Link it to the project — it injects `UPSTASH_REDIS_REST_URL`
   and `UPSTASH_REDIS_REST_TOKEN` automatically.
2. In **Settings → Environment Variables**, add `ADMIN_PASSCODE` (any secret string).
3. Redeploy. In the app, click **New idea**, enter your passcode when prompted, and go.

Without a Redis integration, the app still works read-only (it shows the committed
`.md` files), and locally drafts persist to a `.data/` file.

## Quick start

Local:

```bash
cd demo
npm start        # or: node server.js
# open http://localhost:3000
# local drafts persist to demo/.data/drafts.json
```

Vercel:

```bash
npm i -g vercel
vercel dev       # local, mirrors the /api/ideas function
vercel deploy    # production
```

Or use the **Deploy with Vercel** button above, then do the one-time CMS setup.

> **Important:** the app lives in `demo/`, so set the Vercel **Root Directory to
> `demo`** (project → Settings → General → Root Directory) before deploying.

## Structure

The board is organized into six pillars (see `demo/doc/overview/000-vision.md`),
each with a build priority:

- **Coach** (p0) — AI form coaching + planning.
- **Train** (p0–p1) — progress tracking + recovery.
- **Engage** (p1) — challenges + streaks.
- **Connect** (p2) — matching + group rooms.
- **Content** (p1–p2) — guides + trends.
- **Monetize** (p2) — coach marketplace.

`category` and `priority` live in each file's frontmatter; the sidebar groups
ideas by pillar and badges them `p0`–`p2`.

## Adding an idea

Two ways:

1. **In the browser** — hit **New idea**, write, save. (Requires the passcode.)
2. **As a file** — commit `demo/doc/<category>/###-your-slug.md`:

```markdown
---
title: "AI Form Coach"
summary: "One-line pitch."
tags: [ai, coaching, camera]
status: wip
category: coach
priority: p1
date: 2026-09-13
---

# AI Form Coach

The idea body in plain markdown — headings, **bold**, *italics*, lists, `code`,
and blockquotes all render.
```

`title` and `summary` fall back to the first heading and body if omitted. `tags`
become the filter chips; `status` drives the badge and hero counters. A draft with
the same slug shadows its file version, so you can edit any idea.

## Project structure

```
sanitylifters/
  demo/                     The web app (set as the Vercel Root Directory)
    api/ideas.js            Vercel function → GET/POST/DELETE /api/ideas
    lib/ideas-core.js       Parse doc/*.md recursively
    lib/store.js            Persistence: Upstash Redis (or local .data/ fallback)
    lib/http-api.js         Auth + routing shared by server.js and the function
    doc/                    Ideas, grouped by pillar
      overview/             000-vision.md
      coach/                001-ai-form-coach.md · 002-ai-suggestion-planning.md
      train/                003-schedule-progress-tracking.md · 004-recovery-score.md
      engage/               005-daily-workout-challenge.md · 006-streak-accountability.md
      connect/              007-chatting-topics.md
      content/              009-lifting-guides.md · 010-trends-viral-workouts.md
      monetize/             008-coach-marketplace.md
    index.html              Layout (sidebar + reading pane + hero + editor)
    style.css               Theme + animations + responsive
    app.js                  OO component framework + markdown renderer + editor
    server.js               Local dev server
    vercel.json             Bundles doc/** into the function
```

## License

MIT
