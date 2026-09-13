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

An idea board that turns plain markdown drafts into a browsable web UI. Drop a `.md`
file into `ideas/`, refresh, and it appears — no build step, no database, no framework.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lengseang/sanitylifters)

## What it is

A zero-dependency static site with a tiny serverless function. Ideas live as markdown
files you can edit anywhere; the app discovers them at request time and renders them
with search, tag filtering, and keyboard navigation.

## Features

- **Markdown-first** — every idea is a single `.md` file with optional frontmatter.
- **Auto-discovery** — new files show up on refresh, no manifest to maintain.
- **Search + tag filters** — filter live as you type.
- **Status tracking** — `idea` / `wip` / `live` per draft.
- **Keyboard nav** — `↑` / `↓` to move between ideas, `Esc` to close dialogs.
- **Animated hero** — a lifting barbell and floating glyphs greet you on load.
- **Component-based** — object-oriented UI (`Component`, `IdeaStore`, `Sidebar`,
  `IdeaView`, `Hero`) with a zero-dependency markdown renderer.

## Quick start

Local:

```bash
npm start        # or: node server.js
# open http://localhost:3000
```

Vercel:

```bash
npm i -g vercel
vercel dev       # local, mirrors the /api/ideas function
vercel deploy    # production
```

Or use the **Deploy with Vercel** button above — the `api/ideas.js` function and
`vercel.json` are already wired up.

## Adding an idea

Create a file `ideas/###-your-slug.md`:

```markdown
---
title: "AI Form Coach"
summary: "One-line pitch."
tags: [ai, coaching, camera]
status: wip
date: 2026-09-13
---

# AI Form Coach

The idea body in plain markdown — headings, **bold**, *italics*, lists, `code`,
and blockquotes all render.
```

`title` and `summary` fall back to the first heading and body if omitted. `tags`
become the filter chips in the sidebar; `status` drives the badge and hero counters.

## Project structure

```
sanitylifters/
  api/ideas.js          Vercel serverless function → /api/ideas
  lib/ideas-core.js     Shared logic: glob + parse ideas/*.md
  ideas/                Your drafts live here (one .md per idea)
  index.html            Layout (sidebar + reading pane + hero)
  style.css             Theme + animations
  app.js                OO component framework + markdown renderer
  server.js             Local dev server
  vercel.json           Bundles ideas/** into the function
```

## License

MIT
