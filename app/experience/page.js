import Image from "next/image";

import TopNav from "../../components/top-nav";
import { getSpreadsheetUrl, getTournamentData } from "../../lib/tournament";

export const revalidate = 300;

export default async function ExperiencePage() {
  const data = await getTournamentData();
  const spreadsheetUrl = getSpreadsheetUrl();

  return (
    <main className="page-shell">
      <section className="hero hero-single panel">
        <div className="hero-copy">
          <div className="hero-topline">
            <p className="eyebrow">Warhammer: The Old World</p>
          </div>
          <h1>Battle March</h1>
          <p className="hero-subtitle">
            {data.rounds.length} {data.rounds.length === 1 ? "round" : "rounds"}
          </p>
          <TopNav activePath="/experience" spreadsheetUrl={spreadsheetUrl} />
        </div>
      </section>

      <section className="panel experience-panel">
        <div className="experience-placeholder">
          <Image
            alt="Twin-Tailed Comet"
            className="comet-mark"
            height={265}
            priority
            src="/twin-tailed-comet.png"
            width={250}
          />
          <p className="eyebrow">Experience</p>
          <h2>Elders are debating about it...</h2>
        </div>
      </section>
    </main>
  );
}
