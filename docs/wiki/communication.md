# 💬 Communication Flow

How agents communicate within the swarm.

## Principles

From the AI Manifesto:
- **Principle 1**: Listener echoes before proceeding
- **Principle 2**: Speaker confirms the echo
- **Principle 8**: Language is interface, not state

## Communication Channels

```
┌─────────────────────────────────────────────────────────────┐
│                        SLACK                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │ #swarm-         │  │ #squad-alpha    │  │ #blockers    │ │
│  │ coordination    │  │ #squad-beta     │  │              │ │
│  │                 │  │ #squad-gamma    │  │              │ │
│  │ PM, Portfolio,  │  │ FCs, Code Exec  │  │ All agents   │ │
│  │ Estimator       │  │ Verifier        │  │              │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      WHATSAPP                                │
│  Victor ◄────────────────────────────────────────────► Neo  │
│  (Portuguese)                                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    STATE FILES                               │
│  (Structured data for persistence - NOT communication)       │
│  swarm/state/*.json                                          │
└─────────────────────────────────────────────────────────────┘
```

## Message Patterns

### Task Assignment
```
[TASK] FC-Alpha → Code Executor
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Task ID: AUTH-001
Title: Implement login endpoint
Priority: Must Have
Cycle: 042

Requirements:
- POST /api/auth/login
- Accept email/password
- Return JWT token

DoD:
- [ ] Endpoint responding
- [ ] Input validation
- [ ] Tests passing
- [ ] Swagger docs

Please confirm understanding.
```

### Confirmation (Echo)
```
[CONFIRM] Code Executor → FC-Alpha
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Understood AUTH-001:
- Create POST /api/auth/login
- Validate email/password input
- Return JWT on success
- Update Swagger docs
- Write tests

Estimated: 2 hours
Starting now.
```

### Status Update
```
[STATUS] Code Executor → #squad-alpha
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUTH-001 Progress: 60%
✅ Endpoint created
✅ Validation added
🔄 Writing tests
⏳ Swagger docs pending

ETA: 1 hour
No blockers.
```

### Completion
```
[DONE] Code Executor → FC-Alpha
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUTH-001 Complete

PR: #42 (link)
Branch: feature/AUTH-001-login

DoD Status:
✅ Endpoint responding
✅ Input validation
✅ Tests passing (12/12)
✅ Swagger docs updated

Ready for verification.
@verifier
```

## Language Rules

| Channel | Language |
|---------|----------|
| Victor ↔ Neo | Portuguese |
| All Slack channels | English |
| State files | English |
| Code comments | English |

## State vs Communication

❌ **Don't store state in messages**:
```
"Task AUTH-001 is 60% complete"  // This gets lost
```

✅ **Do update state files**:
```json
// state/backlogs/promise.json
{
  "AUTH-001": {
    "progress": 60,
    "lastUpdate": "2026-02-09T15:00:00Z"
  }
}
```

Then communicate:
```
"AUTH-001 progress updated to 60% - see state file"
```

---

*Principles 1, 2, 8 from AI Manifesto*
