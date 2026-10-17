# Intellobloom Corporate Website

Premium corporate site for **Intellobloom** (parent company), with dedicated venture pages for **IntelliSTEM** and **AgniKawach**.

## Stack

- Next.js (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content configuration

| File | Purpose |
|------|---------|
| `src/content/company.ts` | Parent company copy, verified contact & social URLs |
| `src/content/businesses.ts` | Venture definitions and future placeholders |
| `src/content/industries.ts` | Industry showcase |
| `src/content/capabilities.ts` | Capability list (`enabled` flags) |
| `src/content/clients.ts` | Verified clients/partners (`published: true` only) |
| `src/content/navigation.ts` | Nav and footer links |

## Contact form

The form validates on the client and posts to `/api/contact`. Delivery requires environment variables (see `.env.example`):

- `CONTACT_WEBHOOK_URL`, or
- `RESEND_API_KEY` + `CONTACT_TO_EMAIL`

If neither is configured, submissions return **503** and the UI shows a clear message (no fake success).

## Production metadata

Set `productionDomain` in `src/content/company.ts` when the live domain is known to enable canonical URLs and sitemap entries.

## Assets

Add approved logos to `public/` and reference them from content config. Text-based wordmarks are used until official assets are added.

## Scripts

```bash
npm run lint
npm run build
npm start
```
