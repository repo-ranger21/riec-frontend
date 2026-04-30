# riec-frontend

Minimal Next.js TypeScript scaffold for the RIEC website.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS (config scaffolded)

## Local development

```bash
npm install
npm run dev
```

## Branch workflow

- Create a feature branch from `main`
- Open a pull request for review
- Merge after checks pass

## Deploy checks

GitHub Actions workflow in `.github/workflows/deploy.yml` runs lint and build on push.