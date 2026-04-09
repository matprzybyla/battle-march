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

      <section className="panel experience-panel">
        <ExperienceContent />
      </section>
    </main>
  );
}
