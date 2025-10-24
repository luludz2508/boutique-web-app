# Deployment & Version Control

- Workflow: GitHub repository with Vercel auto-deploys.
- Branching:
  - `main`: Live production
  - `staging`: Pre-release testing
- CI/CD: Preview deployments on PRs; protect `main` with reviews.
- Env vars: Manage Supabase/Cloudinary/Vercel keys via project settings.
- Rollback: Use Vercel deployments history; tag releases in Git.

