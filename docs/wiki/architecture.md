# 🏗️ System Architecture

## Overview

The VTKL Agent Swarm is an AI-powered autonomous engineering system using:
- **OpenClaw** for orchestration
- **Slack** for agent communication
- **Claude Code** for code execution
- **GitHub** for code storage
- **Vercel** for dashboard hosting

## System Diagram

```
                         ┌─────────────────────┐
                         │   Victor (Human)    │
                         │   WhatsApp          │
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │    NEO (CTO)        │
                         │    Opus 4.5         │
                         │    Control Plane    │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
   ┌──────────▼──────────┐ ┌───────▼────────┐ ┌─────────▼─────────┐
   │   Program Manager   │ │   Portfolio    │ │    Estimator      │
   │   Servant Leader    │ │   Manager      │ │    Capacity       │
   └──────────┬──────────┘ └────────────────┘ └───────────────────┘
              │
   ┌──────────┼──────────────────────┐
   │          │                      │
┌──▼───┐  ┌───▼───┐  ┌───────┐  ┌────▼────┐
│  FC  │  │  FC   │  │  FC   │  │Verifier │
│Alpha │  │ Beta  │  │ Gamma │  │Quality  │
└──┬───┘  └───┬───┘  └───┬───┘  └─────────┘
   │          │          │
   ▼          ▼          ▼
┌──────┐  ┌──────┐  ┌──────┐
│Squad │  │Squad │  │ Squad│
│Alpha │  │ Beta │  │Gamma │
│Backend│ │Front │  │ QA   │
└──────┘  └──────┘  └──────┘
   │          │          │
   └──────────┴──────────┘
              │
   ┌──────────▼──────────┐
   │   Code Executor     │
   │   GitHub Commits    │
   └─────────────────────┘
```

## Components

### Control Plane

| Agent | Model | Role |
|-------|-------|------|
| Neo (CTO) | Claude Opus 4.5 | Strategic oversight, human interface |
| Program Manager | Claude Sonnet | Servant leader, coordination |
| Portfolio Manager | Claude Opus 4 | Business metrics, stakeholder reports |
| Estimator | Claude Sonnet | Capacity planning, token budgets |

### Execution Layer

| Agent | Model | Role |
|-------|-------|------|
| FC Alpha | Claude Sonnet | Backend task dispatch |
| FC Beta | Claude Sonnet | Frontend task dispatch |
| FC Gamma | Claude Sonnet | QA task dispatch |
| Code Executor | Claude Sonnet | Implementation, commits |
| Verifier | Claude Sonnet | Quality gate |

## Communication

- **Victor ↔ Neo**: WhatsApp (Portuguese)
- **Agents ↔ Agents**: Slack (English)
- **State Storage**: JSON files in `swarm/state/`

## Infrastructure

| Component | Location |
|-----------|----------|
| OpenClaw Gateway | srv1329140.hstgr.cloud |
| Dashboard | Vercel (dashboard-silk-one-72) |
| Blob Storage | Vercel Blob |
| Source Code | GitHub (VictorSlompo/VTKL_Agent_Swarm) |
| Intake Processor | Port 3847 |

---

*See [Agent Hierarchy](./hierarchy.md) for detailed role descriptions*
