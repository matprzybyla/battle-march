export const DEFAULT_PLAYERS = [
  "ADAM",
  "SZYMON",
  "MISIEK",
  "IKO",
  "MAŁY",
  "KUBA",
  "FUGIM",
  "BAGERRO",
  "COSMO",
  "KIRSZNIKO",
  "KAJTEK",
  "SITO",
];

function normalizeName(name) {
  return String(name ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function displayName(name) {
  const normalized = normalizeName(name);
  const known = DEFAULT_PLAYERS.find((player) => normalizeName(player) === normalized);

  return known ?? normalized;
}

export function createBattleBands(battlePoints) {
  const step = battlePoints / 10;

  return Array.from({ length: 11 }, (_, index) => {
    const start = index * step;
    const end = (index + 1) * step;

    return {
      label: index === 10 ? `${battlePoints}+` : `${start}-${end}`,
      score: `${10 + index}:${10 - index}`,
    };
  });
}

export function calculateBigPoints(scoreA, scoreB, battlePoints) {
  const safeBattlePoints = Number(battlePoints);
  const step = safeBattlePoints / 10;
  const difference = Number(scoreA) - Number(scoreB);
  const swing = Math.min(10, Math.floor(Math.abs(difference) / step));

  if (!Number.isFinite(step) || step <= 0) {
    return { a: 10, b: 10 };
  }

  if (difference > 0) {
    return { a: 10 + swing, b: 10 - swing };
  }

  if (difference < 0) {
    return { a: 10 - swing, b: 10 + swing };
  }

  return { a: 10, b: 10 };
}

export function formatBigScore(scoreA, scoreB) {
  if (scoreA === null || scoreB === null) {
    return "?";
  }

  return `${scoreA}:${scoreB}`;
}

export function formatSmallPoints(value) {
  return value === null ? "?" : value;
}

export function buildStandings(matches, players = DEFAULT_PLAYERS) {
  const table = new Map(
    players.map((player) => [
      player,
      {
        name: player,
        bigPoints: 0,
        smallPoints: 0,
        played: 0,
      },
    ]),
  );

  for (const match of matches) {
    if (!match.playerA || !match.playerB || match.bigA === null || match.bigB === null) {
      continue;
    }

    for (const playerName of [match.playerA, match.playerB]) {
      if (!table.has(playerName)) {
        table.set(playerName, {
          name: playerName,
          bigPoints: 0,
          smallPoints: 0,
          played: 0,
        });
      }
    }

    const playerA = table.get(match.playerA);
    const playerB = table.get(match.playerB);

    playerA.bigPoints += match.bigA;
    playerA.smallPoints += match.smallA ?? 0;
    playerA.played += 1;

    playerB.bigPoints += match.bigB;
    playerB.smallPoints += match.smallB ?? 0;
    playerB.played += 1;
  }

  return [...table.values()].sort((left, right) => {
    if (right.bigPoints !== left.bigPoints) {
      return right.bigPoints - left.bigPoints;
    }

    if (right.smallPoints !== left.smallPoints) {
      return right.smallPoints - left.smallPoints;
    }

    return left.name.localeCompare(right.name, "pl");
  });
}

function parseBigScore(value) {
  const match = String(value ?? "")
    .trim()
    .match(/^(\d{1,2})\s*:\s*(\d{1,2})$/);

  if (!match) {
    return null;
  }

  return {
    a: Number(match[1]),
    b: Number(match[2]),
  };
}

function readString(cell) {
  if (!cell || cell.v === null || cell.v === undefined) {
    return "";
  }

  return String(cell.v).replace(/\s+/g, " ").trim();
}

function readNumber(cell) {
  if (!cell || cell.v === null || cell.v === undefined) {
    return null;
  }

  const numeric = Number(cell.v);

  return Number.isFinite(numeric) ? numeric : null;
}

function parseRoundNumber(value) {
  const match = String(value ?? "")
    .trim()
    .match(/^VOL\.\s*(\d+)/i);

  return match ? Number(match[1]) : null;
}

export function parseTournamentRows(rows) {
  const rounds = [];
  let currentRound = null;

  for (const row of rows) {
    const cells = row.c ?? [];
    const roundNumber = parseRoundNumber(readString(cells[0]));

    if (roundNumber) {
      currentRound = {
        id: `round-${roundNumber}`,
        roundNumber,
        battlePoints: 500 + (roundNumber - 1) * 50,
        matches: [],
      };
      rounds.push(currentRound);
      continue;
    }

    if (!currentRound) {
      continue;
    }

    const playerA = displayName(readString(cells[0]));
    const playerB = displayName(readString(cells[2]));

    if (!playerA || !playerB) {
      continue;
    }

    const smallA = readNumber(cells[1]);
    const smallB = readNumber(cells[3]);
    const parsedScore = parseBigScore(readString(cells[4]));
    const computedScore =
      parsedScore || (smallA !== null && smallB !== null
        ? calculateBigPoints(smallA, smallB, currentRound.battlePoints)
        : null);

    currentRound.matches.push({
      id: `${currentRound.id}-${currentRound.matches.length + 1}`,
      playerA,
      playerB,
      smallA,
      smallB,
      bigA: computedScore?.a ?? null,
      bigB: computedScore?.b ?? null,
      note: readString(cells[8]),
    });
  }

  const allPlayers = [...new Set([...DEFAULT_PLAYERS, ...rounds.flatMap((round) => round.matches.flatMap((match) => [match.playerA, match.playerB]))])];

  return {
    players: allPlayers,
    rounds,
    totalStandings: buildStandings(rounds.flatMap((round) => round.matches), allPlayers),
  };
}
