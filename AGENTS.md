# Project Notes

Small Next.js app for a Warhammer: The Old World local event page. It reads a Google Sheet and shows standings, round results, and a big-points calculator. This is a fun project to play around with AI tools.

## Commands

- Install: `npm install`
- Run locally: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Environment

- Copy `env.sample` to `.env.local`.
- Set `GOOGLE_SHEETS_ID`.

## Data Source

- The Google Sheet is the master source of data.
- Its structure is not fully defined by rules. It is based more on agreement and repeated patterns.
- Code may need to adapt when the sheet differs from previous examples.

## Main Files

- `app/page.js` - home page; loads tournament data and renders standings.
- `app/calculator/page.js` - big-points calculator page.
- `app/experience/page.js` - campaign experience rules page.
- `app/layout.js` - shared HTML shell, metadata, and theme setup.
- `app/globals.css` - global styles.
- `components/standings-app.js` - main standings and round results UI.
- `components/big-points-calculator.js` - calculator UI for big-points bands.
- `components/experience-content.js` - static experience rules content.
- `components/hero-header.js`, `components/top-nav.js`, `components/theme-toggle.js` - shared header, navigation, and theme controls.
- `lib/tournament.js` - Google Sheets fetch and app-level tournament data loading.
- `lib/tournament-core.js` - parsing, scoring, formatting, and standings logic.
- `public/twin-tailed-comet.png` - header image asset.

## Codex Guidance

- Keep changes small and simple.
- Follow the existing Next.js and React style.
- Ask before changing data formats, scoring rules, or Google Sheets assumptions.
