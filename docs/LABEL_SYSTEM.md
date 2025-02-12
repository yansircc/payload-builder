# PR and Issue Label Management System Guide

## Label Categories

**Grey**: No action needed
**Red**: Need action
**Green**: Action completed

### Status Labels (For PRs Only)

| Label       | Description                            | Who can use | Next Action                         | Color |
| ----------- | -------------------------------------- | ----------- | ----------------------------------- | ----- |
| in progress | Work in progress, not ready for review | Developer   | No action needed                    | grey  |
| need check  | Development complete, ready for QA     | Developer   | QA will test                        | red   |
| resolved    | Fix completed                          | Developer   | Automatically changes to need check | green |
| unsolved    | Known issues pending resolution        | QA          | Developer needs to fix              | red   |
| verified    | Testing passed                         | QA          | Testing passed                      | green |
| rejected    | PR doesn't meet requirements           | Admin       | Developer needs to revise           | red   |
| approved    | Admin approved, ready to merge         | Admin       | Can be merged                       | green |

### Type Labels (For Issues Only)

**Yellow**: Need developer attention
**Purple**: Need admin attention
**Black**: This unique color stands for the state of a PR, if tagged, it means the issue is linked to a PR

| Label           | Description                         | Color  |
| --------------- | ----------------------------------- | ------ |
| bug             | Software defect                     | yellow |
| security        | Security related issues             | yellow |
| enhancement     | Improvement to existing feature     | yellow |
| technical debt  | Code improvement/refactoring needed | yellow |
| feature request | New feature proposal                | purple |
| research        | Research/investigation needed       | purple |
| doc             | Documentation related               | purple |
| linked          | Linked to a PR                      | black  |

### Priority Labels (For Both PRs and Issues)

Different colors stand for different priorities.

| Label    | Description                                             | Color   |
| -------- | ------------------------------------------------------- | ------- |
| critical | Import and urgent, needs immediate attention            | deepred |
| minor    | Not important but urgent, can be handled after critical | orange  |
| major    | Important but not urgent, handle in regular order       | blue    |
| trivial  | Not important and not urgent, can be deferred           | brown   |

## Label Usage Rules

### General Rules

1. Label Flow: Developer -> QA -> Admin
2. PRs must have exactly one status label and one priority label
3. Issues must have exactly one type label and one priority label
4. Automated label transitions:
   - When `bug` is added to an issue, related PR's `need check` is removed
   - When `resolved` is added, it automatically changes to `need check`

### Role-based Permissions

#### For Developers

- Can add/remove: `in progress`, `need check`, `resolved`
- Can add priority labels to their PRs
- Cannot remove QA or Admin labels
- Start with `in progress` when creating PR
- Change to `need check` when ready for QA review

#### For QA

- Can add priority labels
- Must remove `need check` when adding `bug`
- Cannot remove Admin labels

#### For Admins

- Can add/remove any labels
- Should review PRs with `verified` label
- Final approval with `approved` label
- Can reject PR with `rejected` label

### Best Practices

1. Always update labels promptly
2. Add detailed comments when changing labels
3. Follow the standard flow: `in progress` -> `need check` -> `verified` -> `approved`
4. For bug fixes: `bug` -> `resolved` -> `need check` -> `verified` -> `approved`
5. Regular label audit to ensure correct usage
6. Use priority labels consistently across related issues and PRs

### Notifications

- `bug` label: Notifies developer
- `verified` label: Notifies admin
- `rejected` label: Notifies developer
- `need check` label: Notifies QA team

### Benefits of Separated Label Categories

1. Clear workflow visualization
2. Simplified tracking and filtering
3. Prevents confusion between issue types and PR status
4. Enables accurate reporting and metrics
5. Facilitates better planning and prioritization
6. Maintains clear separation of concerns

### Label Maintenance

1. Review label usage quarterly
2. Archive unused labels
3. Document any new label additions
4. Maintain consistent color scheme
5. Update automation rules as needed
