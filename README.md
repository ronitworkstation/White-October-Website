# White October

Website for **White October**, a Bengaluru studio that designs corporate gifts, recognition awards, event branding, print and custom packaging for companies across India.

**Live site:** [whiteoctober-ronit-work-station.vercel.app](https://whiteoctober-ronit-work-station.vercel.app)

## Overview

A fast, animated marketing site built to present White October's solutions, show its client work and turn visitors into quote requests.

- Home page with hero, solutions, process, facts, client wall, FAQ and footer
- Individual solution pages generated from structured content
- Quote request page with a form
- WhatsApp shortcut and a mobile action bar
- Smooth scrolling, page transitions and scroll-triggered section motion
- SEO setup: page metadata, Open Graph and Twitter cards, `LocalBusiness` structured data, `robots.txt` and `sitemap.xml`

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) (App Router), [React](https://react.dev), TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 |
| Motion | [GSAP](https://gsap.com), [Motion](https://motion.dev), [Lenis](https://lenis.darkroom.engineering) smooth scroll |
| 3D | [three.js](https://threejs.org), React Three Fiber, drei |
| Icons | [Phosphor Icons](https://phosphoricons.com) |
| Hosting | [Vercel](https://vercel.com) |

## Getting started

You need [Node.js](https://nodejs.org) 20 or newer and npm.

```bash
# 1. Clone the repository
git clone https://github.com/ronitworkstation/White-October-Website.git
cd White-October-Website

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page reloads as you edit files.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run start` | Serves the production build |
| `npm run lint` | Checks the code with ESLint |

## Project structure

```
app/            Routes, layouts, fonts, robots and sitemap
  (site)/       Public pages: home, quote, solutions/[slug]
  lab/          Internal pages for testing fonts and UI pieces
components/
  brand/        Logo and brand mark
  motion/       Reveal, page curtain, magnetic and scroll effects
  sections/     Page sections (Hero, Solutions, Process, Clients, FAQ ...)
  site/         Header, footer, mobile bar, WhatsApp button
  ui/           Shared UI elements such as Button
content/        Site copy and data: business details, solutions, clients
lib/            Shared helpers
public/         Images, client logos and brand files
scripts/        Asset import and export helpers
docs/           Design notes and project specification
```

## Editing content

Most text and data live in `content/`:

- `site.ts` holds business details, contact information and the site URL.
- `solutions.ts` holds the solutions shown on the site.
- `clients.ts` holds the client list used in the client wall.

Change the file, save, and the page updates.

## Deployment

The site is hosted on Vercel and connected to this repository. Every push to the `main` branch builds and publishes a new version automatically. Pushes to other branches create preview links.

## Documentation

- [`docs/spec.md`](docs/spec.md): project specification
- [`docs/DESIGN.md`](docs/DESIGN.md): design system and visual rules

## License

All rights reserved. Content, logos and brand assets belong to White October.
