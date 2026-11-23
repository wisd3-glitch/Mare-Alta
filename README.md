# Maré Alta — Independent Bookshop (Lisbon)

Concept brand and 6-page storefront built with **TanStack Start**, **React 19**, **Vite**, and **Nitro** (configured for Vercel).

## Pages
- **Home (`/`)** — Book of the Week hero, featured shelf, staff picks preview, upcoming events, newsletter signup, and shop hours.
- **Shop (`/shop`)** — Filterable & sortable catalogue (Fiction, Non-fiction, Portuguese authors, Children, Poetry) with search and persistent basket drawer.
- **Book Details (`/book/$bookId`)** — Full description, language, price, add-to-basket, bookseller notes, and related titles.
- **Escolhas / Staff Picks (`/staff-picks`)** — Six curated titles with bookseller notes.
- **Events & Book Club (`/events`)** — Monthly calendar and Sunday Book Club signup form.
- **About (`/about`)** — Story of the bookshop by the Tagus and bookseller profiles.
- **Contact (`/contact`)** — Address, opening hours, Lisbon map graphic, and message form.

## Local Development

```bash
npm install
npm run dev
```

## Production Build & Vercel Deployment

```bash
npm run build
```

Push this repository to GitHub and import it into Vercel. The project uses Nitro's `vercel` preset in `vite.config.ts` and requires no environment variables or database setup out of the box.

## Notes Before Going Live With a Real Storefront
- Replace placeholder catalogue items, prices, and generated book covers in `src/data/catalog.ts` with real inventory and photography.
- Wire the newsletter, book club, and contact forms (`src/routes/index.tsx`, `src/routes/events.tsx`, `src/routes/contact.tsx`) to an email service or API endpoint.
- Connect the basket drawer (`src/components/site/SiteShell.tsx`) to Stripe/checkout or a store reservation endpoint.
- Add a GDPR privacy policy and cookie notice for EU customers before collecting live form submissions.
