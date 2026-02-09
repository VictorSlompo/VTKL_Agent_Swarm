# ✅ Definition of Done

Clear, verifiable criteria for completed work.

## Standard DoD

Every deliverable must meet:

1. **Code committed** to feature branch on main repository
2. **Tests passing** (unit tests, integration tests if applicable)
3. **Deployed to staging** and verified working
4. **Documentation updated** (code comments, README, API docs)

## Extended DoD by Type

### Backend Feature
- [ ] Endpoint implemented and responding
- [ ] Input validation in place
- [ ] Error handling with proper status codes
- [ ] Unit tests with >80% coverage
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Database migrations (if applicable)

### Frontend Feature
- [ ] Component renders correctly
- [ ] Responsive design verified
- [ ] Loading/error states handled
- [ ] Accessibility basics (ARIA, keyboard nav)
- [ ] Unit tests for logic
- [ ] Visual regression check

### Infrastructure Change
- [ ] Config applied and verified
- [ ] Rollback procedure documented
- [ ] Monitoring/alerts configured
- [ ] Credentials secured
- [ ] Team notified of changes

### Bug Fix
- [ ] Root cause identified
- [ ] Fix implemented
- [ ] Regression test added
- [ ] Original reporter notified
- [ ] Related areas checked

## Verification Process

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Code        │────▶│  Verifier    │────▶│  Merged to   │
│  Executor    │     │  Reviews     │     │  Main        │
│  Submits PR  │     │  Against DoD │     │              │
└──────────────┘     └──────┬───────┘     └──────────────┘
                            │
                    ┌───────▼───────┐
                    │   Passes?     │
                    └───────┬───────┘
                      Yes   │   No
                    ┌───────┴───────┐
                    │               │
                    ▼               ▼
               ✅ Approve      🔄 Request
                              Changes
```

## DoD in State Files

Stored in project/task JSON:

```json
{
  "taskId": "AUTH-001",
  "dod": [
    { "item": "POST /api/auth/login working", "verified": true },
    { "item": "Tests passing", "verified": true },
    { "item": "Swagger docs updated", "verified": false }
  ],
  "status": "in-verification"
}
```

## Verifier Checklist

The Verifier agent checks:

1. **Functional**: Does it work as specified?
2. **Complete**: All DoD items addressed?
3. **Quality**: Code follows standards?
4. **Safe**: No security issues introduced?
5. **Documented**: Can someone else understand it?

## Rejection Handling

If DoD not met:
1. Verifier documents gaps
2. Task returned to Code Executor
3. Code Executor addresses feedback
4. Re-submitted for verification
5. No partial approvals

---

*Principle 5: Definition of Done*
