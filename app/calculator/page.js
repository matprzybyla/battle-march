import Link from "next/link";

import BigPointsCalculator from "../../components/big-points-calculator";
import { getTournamentData } from "../../lib/tournament";

export const revalidate = 300;

export default async function CalculatorPage() {
  const data = await getTournamentData();
  const initialBattlePoints = data.rounds.length
    ? [...new Set(data.rounds.map((round) => round.battlePoints))]
        .sort((left, right) => left - right)[0]
    : 500;

  return (
    <main className="page-shell">
      <section className="hero hero-single panel">
        <div className="hero-copy">
          <div className="hero-topline">
            <p className="eyebrow">Warhammer: The Old World</p>
            <nav className="mini-menu" aria-label="Page navigation">
              <Link className="mini-link" href="/">
                Standings
              </Link>
              <Link className="mini-link active" href="/calculator">
                Calculator
              </Link>
            </nav>
          </div>
          <h1>Battle March</h1>
          <p className="hero-subtitle">
            {data.rounds.length} {data.rounds.length === 1 ? "round" : "rounds"}
          </p>
        </div>
      </section>

      <BigPointsCalculator
        initialBattlePoints={initialBattlePoints}
      />
    </main>
  );
}
