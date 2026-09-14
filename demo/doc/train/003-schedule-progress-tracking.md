---
title: "Schedule & Progress Tracking"
summary: "A progress tracker with a GitHub-style task board for workouts."
tags: [tracking, ui, habits]
status: idea
category: train
priority: p0
date: 2026-09-14
---

# Schedule & Progress Tracking

A tracking system that shows progress the way a GitHub profile does — as a board
of completed work, not a wall of numbers.

## Problem

Every app logs sets, but progress stays invisible. Users can't see the streak of
completed sessions that makes consistency feel real.

## Target user

- **The consistency-seeker** who wants to see the accumulation of their effort.
- **The data nerd** who loves a contribution graph and streaks.
- **The plan-follower** who needs each session broken into clear tasks.

## Why now

The "task board + contribution graph" mental model is proven — people understand
and are motivated by a visual record of completed work.

## Core experience

1. A schedule view turns each planned session into a task card.
2. A task-board UI (GitHub-style) moves sessions from planned → done.
3. A progress heatmap fills in as you show up, month over month.

## User stories

- As a consistent lifter, I want to see my completed sessions fill a heatmap, so
  I feel the momentum of showing up.
- As a plan-follower, I want today's session broken into a checklist, so I always
  know what's next.
- As a returning user, I want to glance at my streak, so I can decide whether to
  push or rest.

## MVP scope

**In:** session checklist, done-state logging, streak counter, weekly heatmap.

**Out:** full analytics, custom boards, social comparison, export.

## Success metrics

- Weekly active loggers.
- Board completion rate (sessions checked off vs. planned).
- D7 / D30 retention lift vs. no board.

## Risks

- **Over-building a task manager** — keep it read-focused, not a Jira clone.
- **Logging friction** — minimize taps; auto-advance through sets.

## Open questions

- Does the heatmap motivate lifters as much as it does developers?
- Should the board sync with a coach's view?
