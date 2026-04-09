"use client";

import { useState } from "react";

const EXPERIENCE_RULES = [
  {
    title: "Gain XP",
    items: [
      "+1 XP if the unit survives without dropping below 50% of its starting Unit Strength.",
      "+1 XP per trophy of war captured or enemy unit destroyed during the game.",
    ],
  },
  {
    title: "Spend XP",
    items: [
      "After a game, roll a D6 and add the unit's current XP to the result.",
      "Once the unit rolls on the Veteran Abilities table, its XP resets to 0.",
    ],
  },
  {
    title: "Loss Trigger",
    items: [
      "If a veteran unit drops below 25% strength, is destroyed, or flees, roll on Battlefield Losses at the end of the game.",
    ],
  },
  {
    title: "Fresh Blood",
    items: [
      "If Unit Strength increases by five or more between two campaign phases, the unit keeps its upgrades but loses D3 unspent XP.",
    ],
  },
];

const VETERAN_ABILITIES = [
  {
    roll: "2-5",
    name: "Reluctant Warriors",
    effect: "No Veteran Ability gained, but XP is not reduced to 0.",
  },
  {
    roll: "6-8",
    name: "Grizzled Veterans",
    effect: "Leadership +1, up to 10. If already 10, treat as a roll of 2-6.",
  },
  {
    roll: "9-10",
    name: "Experienced Warriors",
    effect: "Once per game, re-roll any To Hit rolls of a natural 1. Repeating the upgrade grants a second re-roll.",
  },
  {
    roll: "11-12",
    name: "Weapon Masters",
    effect: "Weapon Skill or Ballistic Skill +1, chosen by the controlling player, up to 10.",
  },
  {
    roll: "13-14",
    name: "Fighting Formation",
    effect: "Maximum rank bonus +1, based on troop type, up to +4.",
  },
  {
    roll: "15+",
    name: "The Spoils of War",
    effect: "Improve the Armour Piercing characteristic of one weapon by 1, chosen by the controlling player, up to -5.",
  },
];

const BATTLEFIELD_LOSSES = [
  {
    roll: "1-3",
    name: "Insurmountable Losses",
    effect: "Lose all Veteran Abilities and any unspent XP.",
  },
  {
    roll: "4",
    name: "Terrible Losses",
    effect: "The unit survives, but loses one Veteran Ability chosen by the controlling player.",
  },
  {
    roll: "5",
    name: "Mauled",
    effect: "The unit's casualties recover quickly after the battle.",
  },
  {
    roll: "6",
    name: "Lesson Learned",
    effect: "The unit gains 1 XP.",
  },
];

function UnitsTab() {
  return (
    <div className="experience-layout">
      <div className="experience-lead">
        <div className="experience-rule-grid">
          {EXPERIENCE_RULES.map((rule) => (
            <article className="experience-rule-card" key={rule.title}>
              <p className="eyebrow">{rule.title}</p>
              <ul className="experience-list">
                {rule.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="experience-table-grid">
        <article className="experience-table-card">
          <div className="experience-table-head">
            <p className="eyebrow">Veteran Abilities</p>
          </div>
          <div className="table-wrap">
            <table className="results-table compact">
              <thead>
                <tr>
                  <th>D6</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {VETERAN_ABILITIES.map((entry) => (
                  <tr key={entry.roll}>
                    <td>{entry.roll}</td>
                    <td>
                      <strong>{entry.name}</strong>
                      <span className="experience-cell-copy">{entry.effect}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="experience-table-card">
          <div className="experience-table-head">
            <p className="eyebrow">Battlefield Losses</p>
          </div>
          <div className="table-wrap">
            <table className="results-table compact">
              <thead>
                <tr>
                  <th>D6</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {BATTLEFIELD_LOSSES.map((entry) => (
                  <tr key={entry.roll}>
                    <td>{entry.roll}</td>
                    <td>
                      <strong>{entry.name}</strong>
                      <span className="experience-cell-copy">{entry.effect}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </div>
  );
}

function CharactersTab() {
  return (
    <div className="experience-layout">
      <div className="experience-empty">
        <h2>Elders are debating on this...</h2>
      </div>
    </div>
  );
}

export default function ExperienceContent() {
  const [tab, setTab] = useState("units");

  return (
    <>
      <div className="experience-tabs" role="tablist" aria-label="Experience sections">
        <button
          className={tab === "units" ? "mini-link active" : "mini-link"}
          type="button"
          role="tab"
          aria-selected={tab === "units"}
          onClick={() => setTab("units")}
        >
          Units
        </button>
        <button
          className={tab === "characters" ? "mini-link active" : "mini-link"}
          type="button"
          role="tab"
          aria-selected={tab === "characters"}
          onClick={() => setTab("characters")}
        >
          Characters
        </button>
      </div>

      {tab === "units" ? <UnitsTab /> : <CharactersTab />}
    </>
  );
}
