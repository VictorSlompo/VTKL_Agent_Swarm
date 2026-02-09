# 👥 Agent Hierarchy

Clear roles and authority boundaries.

## Organization Chart

```
                    ┌─────────────┐
                    │   Victor    │
                    │   (Human)   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │     Neo     │
                    │    (CTO)    │
                    │  Opus 4.5   │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌───────▼───────┐ ┌────────▼────────┐ ┌───────▼───────┐
│   Program     │ │   Portfolio     │ │   Estimator   │
│   Manager     │ │   Manager       │ │               │
│   (Sonnet)    │ │   (Opus 4)      │ │   (Sonnet)    │
└───────┬───────┘ └─────────────────┘ └───────────────┘
        │
        ├───────────────┬───────────────┐
        │               │               │
┌───────▼───────┐ ┌─────▼─────┐ ┌───────▼───────┐
│   FC Alpha    │ │  FC Beta  │ │   FC Gamma    │
│   (Sonnet)    │ │  (Sonnet) │ │   (Sonnet)    │
└───────┬───────┘ └─────┬─────┘ └───────┬───────┘
        │               │               │
        ▼               ▼               ▼
   Squad Alpha     Squad Beta     Squad Gamma
   (Backend)       (Frontend)     (QA)
        │               │               │
        └───────────────┴───────────────┘
                        │
                ┌───────▼───────┐
                │ Code Executor │
                │   (Sonnet)    │
                └───────┬───────┘
                        │
                ┌───────▼───────┐
                │   Verifier    │
                │   (Sonnet)    │
                └───────────────┘
```

## Role Definitions

### Neo (CTO)
- **Model**: Claude Opus 4.5
- **Authority**: Strategic decisions, human interface
- **Responsibilities**:
  - Direct communication with Victor
  - High-level project direction
  - Cross-project coordination
  - Blocker escalation resolution

### Program Manager
- **Model**: Claude Sonnet
- **Authority**: Cycle coordination, process enforcement
- **Responsibilities**:
  - Run See It Cycle
  - Coordinate FCs
  - Mid-cycle reality checks
  - Blocker triage

### Portfolio Manager
- **Model**: Claude Opus 4
- **Authority**: Business metrics, stakeholder reporting
- **Responsibilities**:
  - Track project health
  - Generate status reports
  - Budget tracking
  - Risk identification

### Estimator
- **Model**: Claude Sonnet
- **Authority**: Capacity planning
- **Responsibilities**:
  - Break down requirements
  - Estimate token budgets
  - Validate cycle capacity
  - Flag unrealistic commitments

### Flow Coordinators (Alpha, Beta, Gamma)
- **Model**: Claude Sonnet
- **Authority**: Squad task dispatch
- **Responsibilities**:
  - Assign tasks to squad
  - Track task progress
  - First-line blocker resolution
  - Report to PM

### Code Executor
- **Model**: Claude Sonnet
- **Authority**: Implementation
- **Responsibilities**:
  - Write code
  - Commit to GitHub
  - Create PRs
  - Respond to review feedback

### Verifier
- **Model**: Claude Sonnet
- **Authority**: Quality gate
- **Responsibilities**:
  - Review completed work
  - Validate against DoD
  - Approve/reject PRs
  - Document defects

## Authority Boundaries

| Role | Can Do | Cannot Do |
|------|--------|-----------|
| PM | Coordinate, prioritize | Override estimates, write code |
| FC | Assign tasks, unblock | Change scope, skip verification |
| Estimator | Estimate, flag risks | Commit to deadlines |
| Verifier | Reject work | Implement fixes |
| Code Executor | Implement, commit | Merge without approval |

## Escalation Path

1. **Squad → FC**: Task issues
2. **FC → PM**: Blockers
3. **PM → Neo**: Cross-project issues
4. **Neo → Victor**: Business decisions

---

*Principle 6: Roles & Authority*
