# 🐙 GitHub Integration

Source code management and version control.

## Repository

**URL**: https://github.com/VictorSlompo/VTKL_Agent_Swarm

**Local clone**: `/root/.openclaw/workspace/swarm/repo/`

## Branch Strategy

```
main
├── feature/AUTH-001-login-endpoint
├── feature/UI-002-dashboard-layout
├── feature/QA-003-integration-tests
└── ...
```

- `main`: Production-ready code
- `feature/*`: Task branches (created by Code Executor)

## Commit Convention

```
[TICKET-ID] Brief description

- Detail 1
- Detail 2

Agent: code-executor
Cycle: cycle-042
```

## Workflow

1. **FC assigns task** → Code Executor receives
2. **Code Executor creates branch** → `feature/TICKET-ID-description`
3. **Implements and commits** → Regular commits with context
4. **Opens PR** → Posts link to Slack
5. **Verifier reviews** → Approves or requests changes
6. **Merge to main** → PR squash-merged

## SSH Configuration

Server has SSH key configured:
```bash
# Key location
~/.ssh/id_ed25519

# Config
Host github.com
  IdentityFile ~/.ssh/id_ed25519
  User git
```

## Code Executor Commands

```bash
# Clone (already done)
git clone git@github.com:VictorSlompo/VTKL_Agent_Swarm.git

# Create feature branch
git checkout -b feature/TICKET-ID-description

# Commit
git add .
git commit -m "[TICKET-ID] Description"

# Push
git push origin feature/TICKET-ID-description
```

## Directory Structure

```
/
├── src/                    # Application source code
│   ├── backend/           # Squad Alpha output
│   ├── frontend/          # Squad Beta output
│   └── shared/            # Shared utilities
├── tests/                  # Test suites
├── docs/                   # Documentation
│   └── wiki/              # This wiki
├── .cycles/                # Cycle artifacts
└── .swarm/                 # Swarm configuration
```

---

*See [Code Executor](../agents/code-executor.md) for implementation details*
