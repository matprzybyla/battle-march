import Image from "next/image";
import Link from "next/link";

import { getTournamentData } from "../../lib/tournament";

export const revalidate = 300;

export default async function ExperiencePage() {
  const data = await getTournamentData();

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
          <nav className="mini-menu" aria-label="Page navigation">
            <Link className="mini-link" href="/">
              Standings
            </Link>
            <Link className="mini-link" href="/calculator">
              Calculator
            </Link>
            <Link className="mini-link active" href="/experience">
              Experience
            </Link>
          </nav>
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
