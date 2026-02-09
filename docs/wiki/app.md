# 📖 APP Framework

Auto Pilot Projects - Tony's methodology for AI-driven project management.

## Overview

APP (Auto Pilot Projects) is a framework for running projects with AI agents that maintains rigor and predictability without human constant oversight.

## Core Concepts

### 1. Fixed Cycles
Work is organized into fixed-length cycles:
- **Human teams**: 2 weeks
- **AI teams**: 12 hours

Short cycles enable faster feedback and correction.

### 2. Promise vs Stretch
Each cycle has two backlogs:
- **Promise**: Committed work (must complete)
- **Stretch**: Aspirational (nice to have)

Scope is locked at cycle start. No mid-cycle additions to Promise.

### 3. Show, Don't Tell
Every deliverable must be demonstrated working:
- Not "I finished the login" 
- But "Here's the login working: [demo]"

### 4. Definition of Done
Clear, verifiable criteria before work starts:
- What "done" looks like
- How to verify it
- No ambiguity

### 5. Roles & Boundaries
Clear separation of concerns:
- PM coordinates, doesn't code
- Developers code, don't estimate
- Estimators estimate, don't commit

## APP for AI Agents

Adaptations for AI execution:

| Human APP | AI APP |
|-----------|--------|
| 2-week sprints | 12-hour cycles |
| Story points | Token budgets |
| Stand-ups | Slack updates |
| Retrospectives | Automated metrics |
| Manual demos | Automated verification |

## The See It Cycle

APP's execution rhythm:

```
PLAN → EXECUTE → CHECK → DEMO → LEARN
  │        │        │       │       │
  │        │        │       │       └─ Update velocity
  │        │        │       └─ Show working software
  │        │        └─ Mid-cycle reality check
  │        └─ Build what was promised
  └─ Lock scope, estimate capacity
```

## Key Artifacts

| Artifact | Purpose | Location |
|----------|---------|----------|
| Promise Backlog | Committed work | `state/backlogs/promise.json` |
| Stretch Backlog | Aspirational | `state/backlogs/stretch.json` |
| Cycle State | Current cycle | `state/cycles/current.json` |
| Velocity | Historical data | `state/metrics/velocity.json` |

## Success Criteria

A cycle is successful when:
1. All Promise items are Done (per DoD)
2. No critical blockers unresolved
3. Velocity tracked and reported
4. Next cycle backlog prepared

## Anti-Patterns

❌ **Scope creep**: Adding to Promise mid-cycle
❌ **Estimation theater**: Guessing without analysis
❌ **Done means started**: Claiming progress without proof
❌ **Hero mode**: One agent doing everything
❌ **Blame games**: Focus on fixing, not fault

---

*Created by Tony, adapted for AI by the VTKL team*
