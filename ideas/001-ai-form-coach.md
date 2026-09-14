---
title: "AI Form Coach"
summary: "A camera-based coach that catches bad reps before they become bad habits."
tags: [ai, coaching, camera]
status: wip
category: coach
priority: p0
date: 2026-09-13
---

# AI Form Coach

A real-time form coach that watches a workout through the phone camera and gives
instant, spoken feedback — the way a good human coach would, but in your pocket.

## Problem

Most lifters train alone. Bad form goes unnoticed for weeks, then turns into a
stalled lift or an injury that costs months. Watching a YouTube video doesn't
tell you *your* hips are shooting up early or *your* knees caving in.

## Target user

- **The solo beginner** — new to lifting, no coach, learns from videos.
- **The home-gym owner** — no training partner to spot or cue them.
- **The remote client** — trains with a coach who can't be there in person.

## Why now

On-device pose estimation is finally fast enough to run on a mid-range phone
without a server round-trip. That changes the economics: real-time feedback
becomes free to run, not a GPU bill.

## Core experience

1. Point the camera at the lift.
2. The model tracks ~33 keypoints per frame, fully on-device.
3. Rule-based cues fire on the moments that matter (knee valgus, bar path, back
   angle, depth).
4. The coach speaks or vibrates the instant a cue breaks, then offers a fix.

## User stories

- As a solo lifter, I want my phone to warn me when my back rounds, so I don't
  injure myself on a heavy deadlift.
- As a beginner, I want a cue the moment my knees cave, so I can self-correct
  without rewatching my own footage.
- As a remote coach, I want to see a client's flagged reps, so I focus my review
  on the reps that actually need it.

## MVP scope

**In:** squat, deadlift, bench; 5–8 safety cues per lift; spoken + vibration
feedback; a session summary of flagged reps.

**Out:** every exercise, barbell path overlays, program prescription, social
sharing.

## Success metrics

- Cue accuracy vs. a coach's manual review on 100 recorded reps (target ≥ 90%).
- False-negative rate (missing a real fault) — the trust killer.
- Weekly active users who complete a coached session.

## Risks

- **False negatives** erode trust faster than no feature — ship only high-confidence cues.
- **Camera angle variance** breaks tracking — lock a setup guide before each lift.
- **Safety liability** — frame it as coaching, never medical advice.

## Open questions

- Ship standalone or bundle it into a guided program?
- Can we hold 30fps keypoint tracking on a 3-year-old Android?
