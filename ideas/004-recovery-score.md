---
title: "Recovery & Readiness Score"
summary: "A daily readiness score that tells you to push, pull back, or rest."
tags: [recovery, data, sleep]
status: idea
category: train
priority: p1
date: 2026-09-13
---

# Recovery & Readiness Score

A single number each morning — train hard, train light, or rest — built from
sleep, resting heart rate, HRV, and how your last session actually felt.

## Problem

Programs assume you are recovered. Life assumes otherwise. Most lifters either
push through fatigue or skip the gym on a hunch — neither is informed.

## Target user

- **The overtrainer** who never takes a rest day and keeps stalling.
- **The anxious beginner** who skips sessions on a vague feeling.
- **The wearable owner** who already has the raw signals but no decision.

## Why now

Wearables already stream the raw signals (sleep, HRV, RHR). The gap is turning
them into a *decision*, not a chart.

## Core experience

1. Morning check-in pulls sleep, resting HR, and HRV.
2. The score compares today against the user's own baseline, never the population.
3. It outputs one of three calls — train, train light, or rest — with a named reason.

## User stories

- As an overtrainer, I want the app to tell me when to back off, so I stop
  grinding myself into a stall.
- As a beginner, I want a clear go/no-go each day, so I stop second-guessing.
- As a data owner, I want the score to explain itself, so I actually trust it.

## MVP scope

**In:** sleep + subjective RPE inputs; 3-point readiness output; a 7-day trend.

**Out:** wearable integrations, HRV edge cases, full load management.

## Success metrics

- Does following the score reduce "junk" sessions (self-reported)?
- Score check-in daily frequency.
- Correlation of score with next-session performance.

## Risks

- **Overclaiming accuracy** on cheap sensors — frame it as a suggestion, not science.
- **Alert fatigue** — a daily number people ignore.

## Open questions

- Which single input matters most for lifters (sleep vs. RPE vs. HRV)?
- Should the score auto-adjust tomorrow's program?
