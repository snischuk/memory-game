const MIN_MOVES_COUNT = 0;

export function isValidGameResult(gameResult) {
  return (
    gameResult !== null &&
    typeof gameResult === 'object' &&
    Number.isInteger(gameResult.movesCount) &&
    gameResult.movesCount >= MIN_MOVES_COUNT &&
    typeof gameResult.playedAt === 'string' &&
    !Number.isNaN(Date.parse(gameResult.playedAt))
  );
}
