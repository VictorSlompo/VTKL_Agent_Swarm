# 💬 Slack Integration

All agent communication happens transparently in Slack.

## Channels

| Channel | ID | Purpose | Agents |
|---------|-----|---------|--------|
| #swarm-coordination | `C0ADEL7JPU7` | Main coordination hub | PM, Portfolio, all |
| #squad-alpha | `C0AE91WP273` | Backend squad work | FC Alpha, Code Executor |
| #squad-beta | `C0ADZMYFQAG` | Frontend squad work | FC Beta, Code Executor |
| #squad-gamma | `C0AE91YA8N5` | QA squad work | FC Gamma, Verifier |
| #blockers | `C0ADZN46WMS` | Blocker escalation | All agents |

## Routing Configuration

```yaml
# OpenClaw slack channel routing
slack:
  defaultChannel: swarm-coordination
  routing:
    program-manager: swarm-coordination
    portfolio-manager: swarm-coordination
    fc-alpha: squad-alpha
    fc-beta: squad-beta
    fc-gamma: squad-gamma
    verifier: squad-gamma
    code-executor: squad-alpha  # or dynamic
    estimator: swarm-coordination
```

## Message Format

Agents communicate in English with structured formats:

```
[TASK DISPATCH] FC-Alpha → Squad Alpha
Task: Implement user authentication endpoint
Ticket: AUTH-001
Priority: Must Have
Deadline: End of cycle
DoD: 
- POST /api/auth/login working
- Tests passing
- Swagger docs updated
```

## Blocker Protocol

When blocked:
1. Post to squad channel first
2. If unresolved in 30 min → escalate to #blockers
3. PM picks up from #blockers
4. Resolution posted back to original channel

## Credentials

Stored in OpenClaw config:
- `SLACK_APP_TOKEN`: `xapp-1-...`
- `SLACK_BOT_TOKEN`: `xoxb-...`

---

*See [Communication Flow](./communication.md) for message patterns*
