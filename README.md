# VTKL Agent Swarm

AI-powered autonomous engineering system using OpenClaw orchestration and Claude Code execution.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     OPENCLAW GATEWAY                         │
│              (Orchestration & Communication)                 │
├─────────────────────────────────────────────────────────────┤
│  Portfolio Manager │ Program Manager │ Flow Coordinators    │
│       (Opus)       │     (Sonnet)    │      (Sonnet)        │
├─────────────────────────────────────────────────────────────┤
│                        SLACK                                 │
│            (Transparent Communication Bus)                   │
├─────────────────────────────────────────────────────────────┤
│  Squad Alpha      │  Squad Beta       │  Squad Gamma        │
│  (Backend/API)    │  (Frontend/UX)    │  (QA/Integration)   │
│  [Claude Code]    │  [Claude Code]    │  [Claude Code]      │
└─────────────────────────────────────────────────────────────┘
```

## Cycle Cadence

- **12-hour sprints** (not 2-week sprints)
- **6-hour check-ins**
- **Mid-cycle reality checks**
- **End-cycle demos & look-backs**

## Directory Structure

```
/
├── src/                    # Application source code
│   ├── backend/           # Squad Alpha output
│   ├── frontend/          # Squad Beta output
│   └── shared/            # Shared utilities
├── tests/                  # Test suites
├── docs/                   # Documentation
├── .cycles/                # Cycle artifacts
│   └── cycle-001/
│       ├── promise.json   # Committed backlog
│       ├── stretch.json   # Stretch goals
│       └── results.json   # Cycle results
└── .swarm/                 # Swarm configuration
    └── agents.json        # Agent assignments
```

## Agents

| Agent | Role | Channel |
|-------|------|---------|
| Program Manager | Servant Leader / Coordination | #swarm-coordination |
| Flow Coordinator | Sprint Backlog / Task Dispatch | #squad-* |
| Estimator | Capacity Planning | On-demand |
| Verifier | Quality Gate | On-demand |
| Portfolio Manager | Business Metrics | #business-reports |

## Getting Started

1. Tasks are assigned via Slack channels
2. Claude Code agents execute work
3. Code is committed to feature branches
4. PRs are posted to Slack for review
5. Verified work is merged to main

---

*Managed by Neo (CTO) via OpenClaw*
