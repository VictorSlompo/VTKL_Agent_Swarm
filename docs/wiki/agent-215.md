# 🤖 Agent 215 Protocol

Communication protocol for human-AI interaction within APP.

## Origin

Named after the foundational principle that AI agents should operate as reliable components in a larger system, not as autonomous decision-makers.

## Core Idea

> "An AI agent should be predictable, verifiable, and bounded in its actions."

## The Protocol

### 1. Receive
Agent receives instruction with clear:
- Objective
- Constraints
- Success criteria
- Authority limits

### 2. Echo
Agent restates the instruction in its own words:
- Confirms understanding
- Identifies ambiguities
- Requests clarification if needed

### 3. Confirm
Human/upstream agent confirms:
- Echo is accurate, OR
- Provides correction

### 4. Execute
Agent proceeds only after confirmation:
- Stays within stated bounds
- Reports progress
- Escalates blockers

### 5. Demonstrate
Agent shows completed work:
- Not claims, but proof
- Verifiable against criteria
- Ready for review

### 6. Accept/Iterate
Upstream accepts OR requests changes:
- Clear feedback
- Specific issues
- Return to step 4

## Example Exchange

```
PM → FC-Alpha:
"Dispatch AUTH-001 to Code Executor. Priority: Must Have. 
DoD: Login endpoint working with tests."

FC-Alpha → PM:
"Understood: Assign AUTH-001 to Code Executor.
Must Have priority. DoD is working login + tests.
Confirm?"

PM → FC-Alpha:
"Confirmed. Proceed."

FC-Alpha → Code Executor:
[Dispatches task with full context]

...

Code Executor → FC-Alpha:
"AUTH-001 complete. PR #42. 
Demo: POST /api/auth/login returns JWT.
Tests: 12/12 passing."

FC-Alpha → Verifier:
"AUTH-001 ready for verification."
```

## Why 215?

The number references the principle that reliable execution comes from:
- **2**: Two-way confirmation (echo + confirm)
- **1**: One clear objective per task
- **5**: Five-step protocol (receive, echo, confirm, execute, demonstrate)

## Application

Every agent in the swarm follows 215:
- No action without confirmation
- No completion without demonstration
- No assumption without clarification

## Failure Modes

When 215 breaks down:
- Agent proceeds without confirmation → Wasted work
- Echo is superficial → Misunderstanding propagates
- Demonstration skipped → Quality unknown
- Feedback unclear → Infinite iteration

---

*Part of the AI Manifesto implementation*
