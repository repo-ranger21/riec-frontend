# riec-frontend

A Next.js 14 App Router website for a nonprofit organization.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Cloudflare Pages
- **Forms**: Formspree

## Branch Workflow

| Branch | Purpose |
|--------|---------|
| `main` | Production — deployed to Cloudflare Pages |
| `develop` | Integration — merge feature branches here first |
| `feature/*` | Work branches — branch off from `develop` |

### Workflow

1. Create a feature branch from `develop`: `git checkout -b feature/your-feature develop`
2. Commit and push your changes.
3. Open a Pull Request into `develop`.
4. After review and CI passes, merge into `develop`.
5. When ready for production, merge `develop` into `main`.

## Getting Started

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

See `.env.local.example` for required variables.

| Variable | Description |
|----------|-------------|
| `FORMSPREE_ENDPOINT` | Your Formspree form endpoint key |