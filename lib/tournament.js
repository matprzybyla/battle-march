import { parseTournamentRows } from "./tournament-core.js";

const DEFAULT_SHEET_ID = "1_hTGWm5yPpybKjfDxPqUs02AjfWovdFIGZCdprOhNUU";

const FALLBACK_ROWS = [
  {
    c: [{ v: "VOL.1" }],
  },
  {
    c: [{ v: "ADAM" }, { v: 624 }, { v: "FUGIM" }, { v: 111 }, { v: "20:0" }],
  },
  {
    c: [{ v: "SZYMON" }, { v: 505 }, { v: "BAGERRO" }, { v: 670 }, { v: "07:13" }],
  },
  {
    c: [{ v: "MISIEK" }, { v: 244 }, { v: "COSMO" }, { v: 315 }, { v: "09:11" }],
  },
  {
    c: [{ v: "IKO" }, { v: 592 }, { v: "KIRSZNIOK" }, { v: 90 }, { v: "20:0" }],
  },
  {
    c: [{ v: "MAŁY" }, { v: 630 }, { v: "KAJTEK" }, { v: 222 }, { v: "18:2" }],
  },
  {
    c: [{ v: "KUBA" }, { v: 590 }, { v: "SITO" }, { v: 110 }, { v: "19:1" }],
  },
  {
    c: [{ v: "VOL.2" }],
  },
  {
    c: [{ v: "MAŁY" }, { v: 150 }, { v: "KUBA" }, { v: 650 }, { v: "01:19" }],
  },
  {
    c: [{ v: "ADAM" }, { v: 448 }, { v: "IKO" }, { v: 539 }, { v: "11:9" }],
  },
  {
    c: [{ v: "FUGIM" }, null, { v: "KIRSZNIOK" }, null, null, null, null, null, { v: "3 obj" }],
  },
  {
    c: [{ v: "COSMO" }, { v: 100 }, { v: "BAGERRO" }, { v: 600 }, { v: "01:19" }],
  },
  {
    c: [{ v: "MISIEK" }, { v: 210 }, { v: "SZYMON" }, { v: 390 }, { v: "07:13" }],
  },
  {
    c: [{ v: "SITO" }, null, { v: "KAJTEK" }, null, null],
  },
  {
    c: [{ v: "VOL.3" }],
  },
];

function parseGoogleVisualizationResponse(text) {
  const prefix = "google.visualization.Query.setResponse(";
  const start = text.indexOf(prefix);

  if (start === -1) {
    throw new Error("Unexpected Google Sheets response.");
  }

  const jsonStart = start + prefix.length;
  const jsonEnd = text.lastIndexOf(");");

  if (jsonEnd === -1) {
    throw new Error("Google Sheets response was truncated.");
  }

  return JSON.parse(text.slice(jsonStart, jsonEnd));
}

export function getSpreadsheetId() {
  return (
    process.env.GOOGLE_SPREADSHEET_ID ??
    process.env.GOOGLE_SHEETS_ID ??
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID ??
    DEFAULT_SHEET_ID
  );
}

export function getSpreadsheetUrl() {
  return `https://docs.google.com/spreadsheets/d/${getSpreadsheetId()}/edit?gid=0#gid=0`;
}

async function fetchSheetRows() {
  const url = `https://docs.google.com/spreadsheets/d/${getSpreadsheetId()}/gviz/tq?tqx=out:json&gid=0`;
  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Unable to fetch sheet: ${response.status}`);
  }

  const text = await response.text();
  const payload = parseGoogleVisualizationResponse(text);

  return payload.table?.rows ?? [];
}

export async function getTournamentData() {
  try {
    const rows = await fetchSheetRows();
    const data = parseTournamentRows(rows);

    return {
      ...data,
      source: "live sheet",
    };
  } catch {
    return {
      ...parseTournamentRows(FALLBACK_ROWS),
      source: "fallback snapshot",
    };
  }
}
