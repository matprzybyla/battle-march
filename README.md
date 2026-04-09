# Warhammer: The Old World local event page

Small Next.js app for Vercel that reads the Google Sheet, shows total standings, round-by-round results, and a big-points calculator.
Vibe coded pet project with Codex

## Local run

```bash
npm install
cp env.sample .env.local
npm run dev
```

## Environment

Set the spreadsheet ID in `.env.local`:

```bash
GOOGLE_SHEETS_ID=your_google_sheet_id
```

Use [env.sample](/home/mat/projects/tow/env.sample) as the template file.

`GOOGLE_SHEETS_ID` is required. If it is missing or the sheet cannot be reached, the app shows `Sheet connection error`.
