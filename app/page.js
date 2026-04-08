import StandingsApp from "../components/standings-app";
import { getTournamentData } from "../lib/tournament";

export const revalidate = 300;

export default async function Page() {
  const data = await getTournamentData();

  return <StandingsApp data={data} />;
}
