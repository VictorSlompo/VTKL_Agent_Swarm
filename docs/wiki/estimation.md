# 📊 AI Estimation Model

Estimation adapted for AI agents instead of human developers.

## Key Differences

| Aspect | Human Estimation | AI Estimation |
|--------|-----------------|---------------|
| Unit | Story points / hours | Tokens / reasoning complexity |
| Capacity | ~6 productive hours/day | 24/7 availability |
| Variability | High (mood, interruptions) | Lower (consistent processing) |
| Parallelism | Limited | Multiple agents concurrent |

## Complexity Dimensions

### 1. Token Budget
Estimated tokens needed for:
- Reading/understanding requirements
- Planning approach
- Generating code
- Iterating on feedback

### 2. Reasoning Depth
- **Simple**: Direct translation (spec → code)
- **Medium**: Some design decisions needed
- **Complex**: Architecture choices, trade-offs
- **Research**: Unknown patterns, exploration needed

### 3. Integration Surface
- **Isolated**: Self-contained module
- **Light**: Few dependencies
- **Heavy**: Multiple system interactions
- **Critical**: Core system changes

## Estimation Formula

```
Effort = (Token Budget × Reasoning Multiplier × Integration Factor) / Agent Throughput

Where:
- Token Budget: Estimated tokens (k)
- Reasoning Multiplier: 1.0 (simple) to 3.0 (research)
- Integration Factor: 1.0 (isolated) to 2.5 (critical)
- Agent Throughput: ~100k tokens/hour (varies by model)
```

## Example Estimates

| Task | Tokens | Reasoning | Integration | Effort |
|------|--------|-----------|-------------|--------|
| Add API endpoint | 50k | 1.0 (simple) | 1.2 (light) | 0.6h |
| New feature module | 200k | 1.5 (medium) | 1.5 (heavy) | 4.5h |
| Auth system | 300k | 2.0 (complex) | 2.0 (critical) | 12h |

## Capacity Planning

Per 12-hour cycle:
- **Single agent**: ~1.2M tokens capacity
- **Squad (3 agents)**: ~3.6M tokens capacity
- **Buffer**: Keep 20% for blockers/rework

## Velocity Tracking

Tracked in `state/metrics/velocity.json`:
```json
{
  "cycles": [
    {
      "id": "cycle-042",
      "promised": 500000,
      "delivered": 480000,
      "velocity": 0.96
    }
  ],
  "averageVelocity": 0.92
}
```

## Estimator Role

The Estimator agent:
1. Reviews incoming project requirements
2. Breaks down into estimable units
3. Applies complexity factors
4. Recommends cycle allocation
5. Flags high-risk items

---

*Based on APP methodology, adapted for AI execution*
