import StandingsApp from "../components/standings-app";
import { getSpreadsheetUrl, getTournamentData } from "../lib/tournament";

export const revalidate = 300;

export default async function Page() {
  const data = await getTournamentData();
  const spreadsheetUrl = getSpreadsheetUrl();

  return <StandingsApp data={data} spreadsheetUrl={spreadsheetUrl} />;
}
