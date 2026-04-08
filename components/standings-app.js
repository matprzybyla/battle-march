"use client";

import Link from "next/link";
import { useState } from "react";

import {
  buildStandings,
  formatSmallPoints,
} from "../lib/tournament-core";

function RoundSelector({ rounds, value, onChange }) {
  return (
    <label className="header-select">
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="total">Total standings</option>
        {rounds.map((round) => (
          <option key={round.id} value={round.id}>
            Round {round.roundNumber} · {round.battlePoints} pts
          </option>
        ))}
      </select>
    </label>
  );
}

function SummaryTable({ rounds, standings, view, onViewChange }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Total</p>
          <h2>Overall standings</h2>
        </div>
        <RoundSelector rounds={rounds} value={view} onChange={onViewChange} />
      </div>
      <div className="table-wrap">
        <table className="results-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Big points</th>
              <th>Small points</th>
              <th>Played</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((player, index) => (
              <tr key={player.name}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.bigPoints}</td>
                <td>{player.smallPoints}</td>
                <td>{player.played}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RoundView({ round, players, rounds, view, onViewChange }) {
  const standings = buildStandings(round.matches, players).filter((player) => player.played > 0);

  return (
    <div className="round-layout">
      <div className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Round {round.roundNumber}</p>
            <h2>{round.battlePoints} pts battles</h2>
          </div>
          <div className="panel-toolbar">
            <RoundSelector rounds={rounds} value={view} onChange={onViewChange} />
          </div>
        </div>
        <div className="round-list">
          {round.matches.map((match) => (
            <article className="match-card match-card-compact" key={match.id}>
              <div className="match-summary">
                <p className="match-summary-head">
                  <span className="player-name">{match.playerA}</span> :{" "}
                  <span className="player-name">{match.playerB}</span>
                  <strong className="match-big-score">
                    {match.bigA ?? "-"} : {match.bigB ?? "-"}
                  </strong>
                </p>
                <p className="match-summary-small">
                  {formatSmallPoints(match.smallA)} : {formatSmallPoints(match.smallB)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Round table</p>
            <h2>Sorted by that round only</h2>
          </div>
        </div>
        <div className="table-wrap">
          <table className="results-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Big points</th>
                <th>Small points</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((player, index) => (
                <tr key={player.name}>
                  <td>{index + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.bigPoints}</td>
                  <td>{player.smallPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function StandingsApp({ data }) {
  const [view, setView] = useState("total");

  const selectedRound =
    view === "total" ? null : data.rounds.find((round) => round.id === view) ?? null;

  return (
    <main className="page-shell">
      <section className="hero hero-single panel">
        <div className="hero-copy">
          <div className="hero-topline">
            <p className="eyebrow">Warhammer: The Old World</p>
            <nav className="mini-menu" aria-label="Page navigation">
              <Link className="mini-link active" href="/">
                Standings
              </Link>
              <Link className="mini-link" href="/calculator">
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

      {selectedRound ? (
        <RoundView
          players={data.players}
          round={selectedRound}
          rounds={data.rounds}
          view={view}
          onViewChange={setView}
        />
      ) : (
        <SummaryTable
          rounds={data.rounds}
          standings={data.totalStandings}
          view={view}
          onViewChange={setView}
        />
      )}
    </main>
  );
}
