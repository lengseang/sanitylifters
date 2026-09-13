---
title: "AI Form Coach"
summary: "A camera-based coach that catches bad reps before they become bad habits."
tags: [ai, coaching, camera]
status: wip
date: 2026-09-13
---

# AI Form Coach

A real-time form coach that watches a workout through the phone camera and gives
instant, spoken feedback — the way a good human coach would, but in your pocket.

## Problem

Most lifters train alone. Bad form goes unnoticed for weeks, then turns into a
stalled lift or an injury that costs months. Watching a YouTube video does not
tell you *your* hips are shooting up early.

## Why now

On-device pose estimation is finally fast enough to run on a mid-range phone
without a server round-trip. That changes the economics: real-time feedback
becomes free to run, not a GPU bill.

## Core loop

1. Point the camera at the lift.
2. Model tracks ~33 keypoints per frame.
3. Rules check the cues that matter (knee valgus, bar path, back angle).
4. Coach speaks or vibrates the moment a cue breaks.

## Notes

- Start with **three lifts** (squat, deadlift, bench), not all of them.
- Spoken feedback beats text — eyes are busy under a bar.
- **Metric:** cue accuracy vs. a coach's manual review on 100 recorded reps.
- **Risk:** false negatives erode trust faster than no feature at all.
