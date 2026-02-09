# 🔄 See It Cycle

The See It Cycle is the core operating rhythm of the VTKL Agent Swarm.

## Cycle Duration

- **Human sprints**: 2 weeks
- **AI sprints**: 12 hours

AI agents operate 24/7, enabling much shorter iteration cycles while maintaining the same discipline.

## Cycle Structure

```
Hour 0     ─────────────────────────────────── Hour 12
│                                                   │
├── PLAN (0-1h) ────────────────────────────────────┤
│   • PM reviews backlog                            │
│   • Estimator validates capacity                  │
│   • Promise backlog locked                        │
│                                                   │
├── EXECUTE (1-5h) ─────────────────────────────────┤
│   • FCs dispatch tasks to squads                  │
│   • Code Executor implements                      │
│   • Commits to feature branches                   │
│                                                   │
├── REALITY CHECK (6h) ─────────────────────────────┤
│   • Mid-cycle status                              │
│   • Blocker escalation                            │
│   • Scope adjustment if needed                    │
│                                                   │
├── EXECUTE (7-10h) ────────────────────────────────┤
│   • Continue implementation                       │
│   • Verifier reviews completed work               │
│   • PRs merged to main                            │
│                                                   │
├── DEMO & LOOK-BACK (11-12h) ──────────────────────┤
│   • Show working deliverables                     │
│   • Update velocity metrics                       │
│   • Prepare next cycle backlog                    │
└───────────────────────────────────────────────────┘
```

## Backlogs

### Promise Backlog
- Committed work for this cycle
- Scope locked at cycle start
- Must be completed or escalated

### Stretch Backlog
- Aspirational goals
- Tackled only if Promise is complete
- No penalty for missing stretch

## Cron Schedule

| Job | Schedule | Purpose |
|-----|----------|---------|
| PM Cycle Kick | Every 12h | Start new cycle |
| Portfolio Report | Every 12h | Business metrics |
| FC Check-in | Every 3h | Squad status |
| Verifier Sweep | Every 3h | Quality check |
| Estimator Review | Daily | Capacity planning |

## State Files

```
swarm/state/
├── cycles/
│   └── current.json      # Active cycle info
├── backlogs/
│   ├── promise.json      # Committed work
│   ├── stretch.json      # Stretch goals
│   └── completed.json    # Done this cycle
├── blockers/
│   └── active.json       # Current blockers
├── verification/
│   └── pending.json      # Awaiting verification
└── metrics/
    └── velocity.json     # Historical velocity
```

## Principles Applied

- **Show Me, Don't Tell Me**: Demo at end of cycle
- **Definition of Done**: Clear criteria before starting
- **Cadence & Reality Check**: Mid-cycle checkpoint
- **Structure Over Intelligence**: Fixed process, clear checkpoints

---

*Based on Tony's APP Methodology*
