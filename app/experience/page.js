import HeroHeader from "../../components/hero-header";
import ExperienceContent from "../../components/experience-content";
import { getSpreadsheetUrl, getTournamentData } from "../../lib/tournament";

export const revalidate = 300;

export default async function ExperiencePage() {
  const data = await getTournamentData();
  const spreadsheetUrl = getSpreadsheetUrl();

  return (
    <main className="page-shell">
      <section className="hero hero-single panel">
        <HeroHeader
          activePath="/experience"
          roundsCount={data.rounds.length}
          spreadsheetUrl={spreadsheetUrl}
        />
      </section>

      {data.error ? (
        <section className="panel status-panel">
          <div className="status-message" role="alert">
            <p className="eyebrow">Warning</p>
            <h2>{data.error}</h2>
          </div>
        </section>
      ) : null}

      <section className="panel experience-panel">
        <ExperienceContent />
      </section>
    </main>
  );
}
