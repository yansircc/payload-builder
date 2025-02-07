# Development Guide

## Local Development Setup

### Prerequisites

- Node.js (v18 or later)
- Bun (latest version)
- MongoDB (v6.0 or later)
- Git
- A code editor (cursor recommended)

### Initial Setup

1. **Repository Access**

   - Wait for repository invitation
   - Accept the invitation to join the private repository

2. **Clone Repository**

   ```bash
   git clone [repository-url]
   cd [project-directory]
   ```

3. **MongoDB Setup**

   - Install MongoDB locally
   - Start MongoDB service
   - Default connection URL: `mongodb://localhost:27017/[database-name]`

4. **Environment Configuration**

   ```bash
   cp .env.example .env
   ```

   - Update the environment variables in `.env` as needed
   - Ensure MongoDB connection string is correctly set

5. **Install Bun**

   ```bash
   # For macOS/Linux
   curl -fsSL https://bun.sh/install | bash
   # For Windows
   # Use WSL2 and follow Linux instructions
   ```

6. **Install Dependencies**

   ```bash
   bun install
   ```

7. **Generate PayloadCMS Types**

   ```bash
   bun generate:types
   ```

   > ⚠️ **Important**: Run this command whenever you modify any Collection or Field configurations in PayloadCMS. Type generation is required before starting the development server after any schema changes.

8. **Start Development Server**

   ```bash
   bun dev
   ```

9. **Access the Application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## Git Workflow Guidelines

### Commit Convention

We use commitlint to enforce Conventional Commits format:

## Troubleshooting

Common issues and solutions:

1. **Type Errors After Schema Changes**

   ```bash
   bun generate:types
   ```

2. **Build Cache Issues**

   ```bash
   rm -rf .next
   bun dev
   ```

3. **Dependency Issues**

   ```bash
   rm -rf node_modules
   rm bun.lockb
   bun install
   ```

4. **PayloadCMS Issues**
   ```bash
   # ⚠️ DANGER: This will reset your local database
   # Triple check your DATABASE_URL before running!
   bun payload migration:fresh
   ```
   > ⚠️ **IMPORTANT**: During the development phase, as PayloadCMS is in its early stable release, you might encounter difficult-to-resolve errors. You can use `bun payload migration:fresh` to reset your local database. However, before running this command:
   >
   > - **ALWAYS** verify that your `DATABASE_URL` points to your local database
   > - **NEVER** run this command if there's any chance you're connected to a production database
   > - **BACKUP** any important local data before resetting

## Development Best Practices

### Important Guidelines

> ⚠️ **Critical Rule**: Do not modify files outside the `src` directory (e.g., `.prettierrc`, `.eslintrc`, etc.) unless specifically instructed. Changes to these configuration files can cause team-wide confusion and inconsistencies.

### Pre-commit Checklist

Before pushing your changes, run these checks locally to avoid CI pipeline failures:

```bash
# Run all checks in parallel (same as CI)
bun generate:types & bun run format:check & bun run typecheck & bun run lint & wait

# Build check
bun run build
```

> 💡 **Tip**: Running these checks locally before pushing saves time and CI resources. Our CI pipeline runs these same checks, and failing builds will need to be fixed and re-pushed.

### IDE Setup (VS Code Recommended)

### CI/CD Pipeline

Our CI pipeline automatically runs on:

- Push to `main` and `develop` branches
- Pull requests to these branches

The pipeline checks:

1. Type generation
2. Code formatting
3. TypeScript types
4. ESLint rules
5. Build process

Key features:

- Runs on Node.js 20.9.0
- Uses MongoDB for integration tests
- Caches dependencies for faster builds
- Creates build reports
- Compresses and archives build outputs

> 🎯 **Best Practice**: Always ensure your code passes all checks locally before pushing. This helps maintain code quality and prevents unnecessary CI runs.
