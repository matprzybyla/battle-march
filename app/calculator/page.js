import BigPointsCalculator from "../../components/big-points-calculator";
import HeroHeader from "../../components/hero-header";
import { getSpreadsheetUrl, getTournamentData } from "../../lib/tournament";

export const revalidate = 300;

export default async function CalculatorPage() {
  const data = await getTournamentData();
  const spreadsheetUrl = getSpreadsheetUrl();
  const initialBattlePoints = data.rounds.length
    ? [...new Set(data.rounds.map((round) => round.battlePoints))]
        .sort((left, right) => left - right)[0]
    : 500;

  return (
    <main className="page-shell">
      <section className="hero hero-single panel">
        <HeroHeader
          activePath="/calculator"
          roundsCount={data.rounds.length}
          spreadsheetUrl={spreadsheetUrl}
        />
      </section>

      <BigPointsCalculator
        initialBattlePoints={initialBattlePoints}
      />
    </main>
  );
}
