# PR and Issue Label Management System Guide

## Automated Label Management System

Our repository implements an automated label management system that helps maintain label consistency and workflow. The system automatically handles label conflicts and ensures proper label usage based on roles.

### Key Automation Features

1. **Single Label Per Category**

   - System automatically maintains only one priority label
   - For PRs: Only one status label from each group (Developer/QA/Admin) is allowed
   - Most recent label takes precedence; older conflicting labels are automatically removed

2. **Priority Label Synchronization**

   - When a priority label is added to an issue, it automatically syncs to all linked PRs
   - Linked PRs automatically receive the 'linked' label

3. **Automated Notifications**
   The system provides comprehensive notification coverage:

   1. **Direct Notifications**

      - When action-required labels are added, the system comments on the PR
      - Comments mention relevant team members or individuals
      - Clearly states required actions

   2. **Cross-Item Notifications**

      - Automatically notifies on all linked PRs and issues
      - Clearly shows which item triggered the notification
      - Maintains traceability between related items

   3. **Action-Required Labels**

      - `need check`: Notifies QA team for review
      - `bug`: Notifies PR author to investigate and fix
      - `rejected`: Notifies PR author to address feedback
      - `unsolved`: Notifies PR author of QA issues
      - `blocked`: Notifies admin team of blocker that needs attention
      - `approved`: Notifies that PR is ready for merge (no action required)

   4. **Notification Format**
      - Direct notification: "Action required (Team/Role): Message"
      - Linked item notification: "[Linked from #XX] Action required (Team/Role): Message"

## Label Categories

**Grey**: No action needed
**Red**: Need action
**Green**: Action completed

### Status Labels (For PRs Only)

| Label           | Description                            | Who can use | Next Action                         | Color |
| --------------- | -------------------------------------- | ----------- | ----------------------------------- | ----- |
| dev:in-progress | Work in progress, not ready for review | Developer   | No action needed                    | grey  |
| dev:need-check  | Development complete, ready for QA     | Developer   | QA will test                        | red   |
| dev:blocked     | Blocked by development issues          | Developer   | Admin needs to review blocker       | red   |
| dev:resolved    | Fix completed                          | Developer   | Automatically changes to need check | green |
| qa:unsolved     | Known issues pending resolution        | QA          | Developer needs to fix              | red   |
| qa:blocked      | Blocked by QA issues                   | QA          | Admin needs to review blocker       | red   |
| qa:verified     | Testing passed                         | QA          | Testing passed                      | green |
| admin:blocked   | Blocked by system/policy issues        | Admin       | Waiting for admin resolution        | red   |
| admin:rejected  | PR doesn't meet requirements           | Admin       | Developer needs to revise           | red   |
| admin:approved  | Admin approved, ready to merge         | Admin       | Can be merged                       | green |

### Type Labels (For Issues Only)

| Label           | Description                         | Color  |
| --------------- | ----------------------------------- | ------ |
| bug             | Software defect                     | yellow |
| security        | Security related issues             | yellow |
| technical-debt  | Code improvement/refactoring needed | yellow |
| enhancement     | Improvement to existing feature     | purple |
| feature-request | New feature proposal                | purple |
| research        | Research/investigation needed       | purple |
| doc             | Documentation related               | purple |
| linked          | Linked to a PR                      | black  |

### Priority Labels (For Both PRs and Issues)

| Label       | Description                                             | Color   |
| ----------- | ------------------------------------------------------- | ------- |
| p1:critical | Import and urgent, needs immediate attention            | deepred |
| p2:major    | Important but not urgent, handle in regular order       | blue    |
| p3:minor    | Not important but urgent, can be handled after critical | orange  |
| p4:trivial  | Not important and not urgent, can be deferred           | brown   |

## Role-Based Usage Guidelines

### For Developers

- **Focus on These Labels Only**: `dev:in-progress`, `dev:need-check`, `dev:resolved`, `dev:blocked`
- **Let Automation Handle**:
  - Label conflicts
  - Priority synchronization with linked issues
  - Removal of QA/Admin labels
  - Notifications to other team members

### For QA Team

- **Focus on These Labels Only**: `qa:blocked`, `qa:unsolved`, `qa:verified`
- **Let Automation Handle**:
  - Removal of conflicting developer labels
  - Notification dispatch to relevant team members
  - Label conflict resolution

### For Admins

- **Focus on These Labels Only**: `admin:rejected`, `admin:approved`
- **Let Automation Handle**:
  - Removal of conflicting developer/QA labels
  - Notification management
  - Label hierarchy enforcement

## Best Practices with Automation

1. **Single Label Actions**

   - Add only one label at a time
   - Let the automation handle removing conflicting labels
   - Wait for automation to complete before adding another label

2. **Priority Labels**

   - Add priority labels to issues
   - Let automation sync priorities to linked PRs
   - Don't manually add priority labels to PRs with linked issues

3. **Label Transitions**

   - Follow the standard flow: `in progress` → `need check` → `verified` → `approved`
   - Trust the automation to handle label cleanup
   - Focus on your role-specific labels

4. **Linked Issues and PRs**
   - Create proper issue links in PRs
   - Let automation handle the 'linked' label and priority sync
   - Don't manually manage synchronization

## Benefits of Automated Management

1. **Reduced Manual Work**

   - No need to remove old labels
   - Automatic notification dispatch
   - Automatic priority synchronization

2. **Error Prevention**

   - Prevents conflicting labels
   - Maintains consistent state across linked items
   - Enforces role-based label usage

3. **Clear Workflow**
   - Automated enforcement of process
   - Immediate feedback through notifications
   - Consistent label states

## Important Notes

1. The automation system ensures that:

   - Only one priority label exists at a time
   - Labels follow the hierarchy: Admin > QA > Developer
   - Notifications are sent to relevant team members
   - Linked issues and PRs maintain consistent priority labels

2. If you encounter unexpected label behavior:
   - Wait a few seconds for automation to complete
   - Check the PR/Issue timeline for automation logs
   - Focus only on adding labels relevant to your role

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

- Can add/remove: `dev:in-progress`, `dev:need-check`, `dev:resolved`, `dev:blocked`
- Can add priority labels to their PRs
- Cannot remove QA or Admin labels
- Start with `dev:in-progress` when creating PR
- Change to `dev:need-check` when ready for QA review

#### For QA

- Can add priority labels
- Must remove `dev:need-check` when adding `dev:bug`
- Cannot remove Admin labels

#### For Admins

- Can add/remove any labels
- Should review PRs with `qa:verified` label
- Final approval with `admin:approved` label
- Can reject PR with `admin:rejected` label

### Best Practices

1. Always update labels promptly
2. Add detailed comments when changing labels
3. Follow the standard flow: `dev:in-progress` -> `dev:need-check` -> `qa:verified` -> `admin:approved`
4. For bug fixes: `dev:bug` -> `dev:resolved` -> `dev:need-check` -> `qa:verified` -> `admin:approved`
5. Regular label audit to ensure correct usage
6. Use priority labels consistently across related issues and PRs

### Notifications

- `dev:bug` label: Notifies developer
- `qa:verified` label: Notifies admin
- `admin:rejected` label: Notifies developer
- `dev:need-check` label: Notifies QA team

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
