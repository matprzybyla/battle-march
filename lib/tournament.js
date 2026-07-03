import { parseTournamentRows } from "./tournament-core.js";

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
  const value = process.env.GOOGLE_SHEETS_ID?.trim();

  return value ? value : null;
}

export function getSpreadsheetUrl() {
  const spreadsheetId = getSpreadsheetId();

  if (!spreadsheetId) {
    return null;
  }

  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit?gid=0#gid=0`;
}

async function fetchSheetRows() {
  const spreadsheetId = getSpreadsheetId();

  if (!spreadsheetId) {
    throw new Error("Missing GOOGLE_SHEETS_ID.");
  }

  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&gid=0`;
  const response = await fetch(url, {
    next:
      process.env.NODE_ENV === "development"
        ? { cache: "no-store" }
        : { revalidate: 300 },
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
      error: null,
    };
  } catch {
    return {
      players: [],
      rounds: [],
      totalStandings: [],
      error: "Sheet connection error",
    };
  }
}
