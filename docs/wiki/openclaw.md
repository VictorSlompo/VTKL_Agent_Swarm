# 🦞 OpenClaw Configuration

OpenClaw is the orchestration layer for the agent swarm.

## Overview

OpenClaw provides:
- Multi-agent management
- Channel routing (WhatsApp, Slack, Telegram)
- Session management
- Cron scheduling
- Sub-agent spawning

## Server Details

| Setting | Value |
|---------|-------|
| Host | srv1329140.hstgr.cloud |
| IP | 92.112.179.137 |
| Gateway Port | Default |
| Intake Processor | Port 3847 |

## Agent Configuration

Agents are configured in `/root/.openclaw/agents/`:

```
/root/.openclaw/agents/
├── program-manager/
│   └── agent/
│       └── agent.md
├── portfolio-manager/
├── fc-alpha/
├── fc-beta/
├── fc-gamma/
├── estimator/
├── verifier/
└── code-executor/
```

## Agent Prompt Template

```markdown
# {Agent Name}

## Role
{Description of role and authority}

## Responsibilities
- {Responsibility 1}
- {Responsibility 2}

## State Files
Read from: `swarm/state/{relevant-files}`
Write to: `swarm/state/{relevant-files}`

## Communication
- Channel: #{slack-channel}
- Format: English, structured messages

## Principles
Follow the AI Manifesto, especially:
- Principle X: {relevant principle}
```

## Channel Routing

```yaml
channels:
  whatsapp:
    target: neo  # Victor's messages to Neo
  slack:
    agents:
      program-manager: swarm-coordination
      fc-alpha: squad-alpha
      fc-beta: squad-beta
      fc-gamma: squad-gamma
```

## Spawning Sub-Agents

```javascript
// From Neo, spawn a task to an agent
sessions_spawn({
  agentId: "code-executor",
  task: "Implement AUTH-001 login endpoint",
  label: "auth-task"
});
```

## Useful Commands

```bash
# Check status
openclaw status

# Restart gateway
openclaw gateway restart

# View logs
journalctl -u openclaw-gateway -f

# List sessions
openclaw sessions list
```

## Environment Variables

```bash
# Core
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-proj-...

# Slack
SLACK_APP_TOKEN=xapp-1-...
SLACK_BOT_TOKEN=xoxb-...

# Vercel
VERCEL_TOKEN=XGU3D...

# Blob
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

---

*See [OpenClaw docs](https://docs.openclaw.ai) for full reference*
