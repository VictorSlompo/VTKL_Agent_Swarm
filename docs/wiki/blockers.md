# 🚧 Blocker Resolution

Process for handling blockers during execution.

## What is a Blocker?

A blocker is anything that prevents task progress:
- Missing information
- Technical dependency
- Access/permission issues
- Unclear requirements
- External dependencies

## Blocker Severity

| Level | Description | Response Time |
|-------|-------------|---------------|
| 🔴 Critical | Stops all progress | Immediate |
| 🟠 High | Blocks current task | < 1 hour |
| 🟡 Medium | Slows progress | < 3 hours |
| 🟢 Low | Workaround available | End of cycle |

## Escalation Path

```
┌─────────────┐
│   Agent     │ Encounters blocker
│   (any)     │
└──────┬──────┘
       │
       ▼ Post to squad channel
┌─────────────┐
│   FC        │ First attempt to resolve
│   (squad)   │
└──────┬──────┘
       │ If unresolved after 30 min
       ▼ Escalate to #blockers
┌─────────────┐
│   PM        │ Triage and coordinate
│             │
└──────┬──────┘
       │ If cross-project or needs human
       ▼
┌─────────────┐
│   Neo       │ Strategic resolution
│   (CTO)     │
└──────┬──────┘
       │ If business decision needed
       ▼
┌─────────────┐
│   Victor    │ Final authority
│   (Human)   │
└─────────────┘
```

## Blocker State File

`swarm/state/blockers/active.json`:

```json
{
  "blockers": [
    {
      "id": "BLK-001",
      "severity": "high",
      "title": "Missing API credentials",
      "description": "Need Stripe API key for payment integration",
      "reportedBy": "fc-alpha",
      "reportedAt": "2026-02-09T14:30:00Z",
      "affectedTasks": ["PAY-001", "PAY-002"],
      "status": "escalated",
      "assignedTo": "pm",
      "updates": [
        {
          "at": "2026-02-09T14:45:00Z",
          "by": "pm",
          "message": "Escalated to Neo for credential request"
        }
      ]
    }
  ]
}
```

## Blocker Message Format

```
🚧 BLOCKER REPORTED

ID: BLK-001
Severity: 🟠 High
Task: PAY-001 - Payment Integration
Blocker: Missing Stripe API credentials
Impact: Cannot proceed with payment endpoint

Attempted:
- Checked environment variables
- Reviewed documentation
- Asked in #squad-alpha

Need: Stripe API key from Victor

@pm Please advise
```

## Resolution Protocol

1. **Report**: Agent posts blocker with full context
2. **Acknowledge**: FC/PM acknowledges within SLA
3. **Investigate**: Try to resolve at current level
4. **Escalate**: If needed, move to next level
5. **Resolve**: Document solution
6. **Close**: Update state file, notify affected agents

## Prevention

- Clear requirements before starting
- DoD includes dependency checks
- Early identification in planning
- Regular mid-cycle check-ins

---

*Principle 7: Cadence & Reality Check*
