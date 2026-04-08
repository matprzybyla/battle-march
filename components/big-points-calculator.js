"use client";

import { useState } from "react";

import { createBattleBands } from "../lib/tournament-core";

const MIN_BATTLE_POINTS = 500;
const MAX_BATTLE_POINTS = 2000;
const BATTLE_POINTS_STEP = 50;

function normalizeBattlePoints(value) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return MIN_BATTLE_POINTS;
  }

  const clamped = Math.min(MAX_BATTLE_POINTS, Math.max(MIN_BATTLE_POINTS, numeric));

  return Math.floor(clamped / BATTLE_POINTS_STEP) * BATTLE_POINTS_STEP;
}

export default function BigPointsCalculator({ initialBattlePoints }) {
  const [battlePoints, setBattlePoints] = useState(normalizeBattlePoints(initialBattlePoints));
  const [inputValue, setInputValue] = useState(String(normalizeBattlePoints(initialBattlePoints)));
  const bands = createBattleBands(battlePoints);

  function updateBattlePoints(value) {
    const normalized = normalizeBattlePoints(value);

    setBattlePoints(normalized);
    setInputValue(String(normalized));
  }

  return (
    <div className="panel">
      <div className="calculator-grid">
        <label className="field slider-field">
          <div className="slider-value">
            <input
              aria-label="Battle points value"
              className="slider-value-input"
              inputMode="numeric"
              type="number"
              min={MIN_BATTLE_POINTS}
              max={MAX_BATTLE_POINTS}
              step={BATTLE_POINTS_STEP}
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onBlur={() => updateBattlePoints(inputValue)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.currentTarget.blur();
                }
              }}
            />
            <span>pts</span>
          </div>
          <input
            className="battle-points-slider"
            min={MIN_BATTLE_POINTS}
            max={MAX_BATTLE_POINTS}
            step={BATTLE_POINTS_STEP}
            type="range"
            value={battlePoints}
            onChange={(event) => updateBattlePoints(event.target.value)}
          />
        </label>
      </div>

      <div className="table-wrap">
        <table className="results-table compact">
          <thead>
            <tr>
              <th>Small points diff</th>
              <th>Big points</th>
            </tr>
          </thead>
          <tbody>
            {bands.map((band) => (
              <tr key={band.label}>
                <td>{band.label}</td>
                <td>{band.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
