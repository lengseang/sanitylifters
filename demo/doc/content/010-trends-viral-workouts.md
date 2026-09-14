---
title: "Trends & Viral Workouts"
summary: "Surface trending fitness content and turn it into curated tips and plans."
tags: [trends, content, discovery]
status: idea
category: content
priority: p2
date: 2026-09-14
---

# Trends & Viral Workouts

A discovery feed that pulls trending fitness content from YouTube, TikTok, and
Instagram, evaluates it, and turns the signal into curated tips and plans.

## Problem

Fitness trends are scattered across platforms, and there's no way to tell what's
legit from what's noise.

## Target user

- **The trend-follower** who wants to know what's hot this week.
- **The busy lifter** who wants someone to filter the noise into the best tips.
- **The influencer fan** who wants plans by the creators they already follow.

## Why now

A daily aggregator with an evaluation layer converts raw trends into a
differentiated feature — "top tips", influencer-recommended plans, and viral
exercises by muscle.

## Core experience

1. Daily pulls of trending fitness content (YouTube, TikTok, Instagram).
2. An evaluation layer surfaces the best into top tips.
3. Influencer-recommended workout plans, tagged and searchable.
4. Viral exercise categories by target muscle.

## User stories

- As a trend-follower, I want a daily feed of what's worth trying, so I don't
  scroll three apps.
- As a busy lifter, I want the noise filtered into the top tips, so I save time.
- As an influencer fan, I want plans by creators I trust, so I can follow them.

## MVP scope

**In:** a daily top-tips feed, influencer plan pages, viral exercise tags.

**Out:** full social API integrations, a VPS pull pipeline, AI evaluation at scale.

## Success metrics

- Tips-to-saves and plan adoption.
- Daily feed return rate.
- Share rate (content people forward).

## Risks

- **Research-heavy** — needs social APIs or a VPS doing daily pulls; validate
  demand before building the pipeline.
- **Trends go stale fast** — freshness is the whole product.

## Open questions

- Is AI needed for evaluation, or does a simple heuristic + human curation suffice?
- Which platform's data is actually accessible through official APIs?
