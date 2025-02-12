# PR Label Management System Guide

## Label Categories by Role

### Developer Labels

| Label       | Description                            | Next Action                         | Color   |
| ----------- | -------------------------------------- | ----------------------------------- | ------- |
| in progress | Work in progress, not ready for review | No action needed                    | #ff0000 |
| need check  | Development complete, ready for QA     | QA will test                        | #00ff00 |
| resolved    | Bug fix completed                      | Automatically changes to need check | #0000ff |

### QA Labels

| Label           | Description                         | Next Action            | Color   |
| --------------- | ----------------------------------- | ---------------------- | ------- |
| verified        | Testing passed                      | Admin can merge        | #00ff00 |
| bug             | Issues found during testing         | Developer needs to fix | #ff0000 |
| e2e in progress | E2E test development in progress    | No action needed       | #0000ff |
| e2e ready       | E2E test complete, ready for review | Developer/Admin review | #0000ff |

### Admin Labels

| Label    | Description                    | Next Action               | Color   |
| -------- | ------------------------------ | ------------------------- | ------- |
| rejected | PR doesn't meet requirements   | Developer needs to revise | #ff0000 |
| approved | Admin approved, ready to merge | Can be merged             | #00ff00 |

## Usage Guide

### General Rules

1. Label Flow: Developer -> QA -> Admin
2. One PR should always have at least one status label
3. Automated label transitions:
   - When 'bug' is added, 'need_check' is automatically removed
   - When 'resolved' is added, it automatically changes to 'need_check'

### For Developers

- Start with 'in progress' when creating PR
- Change to 'need check' when ready for QA review
- Use 'resolved' after fixing bugs
- Cannot remove QA or Admin labels

### For QA

- Can add 'bug' or 'verified' labels
- When working on E2E tests, use 'e2e in progress' and 'e2e ready'
- Must remove 'need check' when adding 'bug'
- Cannot remove Admin labels

### For Admins

- Can add/remove any labels
- Should review PRs with 'verified' label
- Can reject PR with 'rejected' label
- Final approval with 'approved' label

### Best Practices

1. Always update labels promptly
2. Add detailed comments when changing labels
3. Follow the standard flow: in progress -> need check -> verified -> approved
4. For bug fixes: bug -> resolved -> need check -> verified -> approved
5. Regular label audit to ensure correct usage

### Notifications

- 'bug' label: Notifies developer
- 'verified' label: Notifies admin
- 'rejected' label: Notifies developer
- 'need check' label: Notifies QA team
