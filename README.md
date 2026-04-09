# Warhammer: The Old World local event page

Small Next.js app for Vercel that reads the Google Sheet, shows total standings, round-by-round results, and a big-points calculator.

## Local run

```bash
npm install
npm run dev
```

## Environment

Optional:

```bash
GOOGLE_SPREADSHEET_ID=your_google_sheet_id
```

If the live sheet cannot be reached, the app falls back to an embedded snapshot so the UI still renders.
