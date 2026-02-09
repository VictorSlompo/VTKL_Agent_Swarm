# ⏰ Cron Jobs

Automated scheduling for the See It Cycle.

## Active Jobs

| Job | Schedule | Agent | Purpose |
|-----|----------|-------|---------|
| PM Cycle Kick | Every 12h | program-manager | Start new cycle |
| Portfolio Report | Every 12h | portfolio-manager | Business metrics |
| FC Check-in | Every 3h | fc-alpha/beta/gamma | Squad status |
| Verifier Sweep | Every 3h | verifier | Quality check |
| Estimator Review | Daily | estimator | Capacity planning |

## Cron Configuration

Managed via OpenClaw cron tool:

```bash
# List jobs
openclaw cron list

# Add job
openclaw cron add --name "PM Cycle" --schedule "0 */12 * * *" --agent program-manager

# Run job manually
openclaw cron run --id <job-id>
```

## Job Payloads

### PM Cycle Kick
```json
{
  "kind": "agentTurn",
  "message": "Start new cycle. Read state files and coordinate."
}
```

### FC Check-in
```json
{
  "kind": "agentTurn", 
  "message": "Squad check-in. Report status to #swarm-coordination."
}
```

### Verifier Sweep
```json
{
  "kind": "agentTurn",
  "message": "Check pending verifications. Review and update state."
}
```

## Schedule Alignment

```
Hour:  0    3    6    9    12   15   18   21   24
       │    │    │    │    │    │    │    │    │
PM     ●─────────────●─────────────●
       │    │    │    │    │    │    │    │    │
FC     ●────●────●────●────●────●────●────●────●
       │    │    │    │    │    │    │    │    │
Verify ●────●────●────●────●────●────●────●────●
       │    │    │    │    │    │    │    │    │
Estim  ●─────────────────────────●
```

## Monitoring

Check job status:
```bash
# Via OpenClaw
openclaw cron status

# View logs
journalctl -u openclaw-gateway | grep cron
```

## Job IDs

| Job | ID |
|-----|-----|
| PM Cycle | `pm-cycle-12h` |
| Portfolio | `portfolio-12h` |
| FC Alpha | `fc-alpha-3h` |
| FC Beta | `fc-beta-3h` |
| FC Gamma | `fc-gamma-3h` |
| Verifier | `verifier-3h` |
| Estimator | `estimator-daily` |

---

*Part of the See It Cycle automation*
