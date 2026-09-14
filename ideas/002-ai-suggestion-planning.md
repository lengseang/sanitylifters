---
title: "AI Suggestion & Planning"
summary: "AI builds a personalized routine and goal plan from a few quick inputs."
tags: [ai, planning, personalization]
status: idea
category: coach
priority: p1
date: 2026-09-14
---

# AI Suggestion & Planning

A conversational planner that turns a handful of inputs into a personalized
routine — and keeps adjusting it with an AI evaluation guide.

## Problem

Beginners don't know what program to follow, and one-size-fits-all plans ignore
equipment, schedule, and experience. The result is a plan abandoned in week two.

## Target user

- **The true beginner** who has never touched a program and just wants to start.
- **The time-crunched lifter** who has 3 days a week and limited equipment.
- **The goal-switcher** who changes targets (strength → aesthetics → sport) and
  needs the plan to change with them.

## Why now

LLMs make personalized plan generation cheap and conversational — no coach needed
to get a reasonable starting routine.

## Core experience

1. User answers a short intake: goal, days per week, equipment, experience level.
2. AI generates a routine with progression rules and exercise substitutions.
3. An evaluation guide checks in after a few sessions and regenerates based on
   real feedback and stated preferences.

## User stories

- As a beginner, I want a plan I can actually follow, so I don't quit by week two.
- As a busy parent, I want a routine that fits my 3 days and home equipment, so I
  stop feeling guilty about skipping a 5-day split.
- As an intermediate, I want the plan to adapt when I stall, so I keep progressing.

## MVP scope

**In:** guided intake questionnaire; plan generation (weekly split + exercise
selection); a check-in flow that tweaks the plan.

**Out:** full periodization, exercise video integration, coach hand-off.

## Success metrics

- Plan adoption (started) and completion (finished 4 weeks).
- % of generated plans the user edits or abandons.
- Check-in engagement rate.

## Risks

- **Generic output** erodes trust — make plans reference the user's real answers.
- **Unsafe prescriptions** — constrain generation to safe defaults and rep ranges.
- **Over-promising** — position as a starting point, not a replacement for a coach.

## Open questions

- How much does the intake need to ask before output stops feeling generic?
- Should the plan generation live on-device or server-side?
