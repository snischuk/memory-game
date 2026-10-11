export const enMessages = {
  audio: {
    mutedIcon: '🔇',
    enabledIcon: '🔊',
    muteLabel: 'Mute sound',
    enableLabel: 'Turn sound on',
  },
  buttons: {
    close: 'Close',
    leaderboard: 'Leaderboard',
    newGame: 'New Game',
  },
  game: {
    cardBack: '?',
    cardLabel: (value) => `Card ${value}`,
    hiddenCard: 'Hidden card',
    moves: (count) => `Moves: ${count}`,
    pairs: (matchedCount, totalCount) =>
      `Pairs: ${matchedCount} / ${totalCount}`,
  },
  leaderboard: {
    date: 'Date',
    moves: 'Moves',
    noResults: 'No results yet.',
    place: 'Place',
    title: 'Leaderboard',
  },
  victory: {
    resultSaveFailed: 'Your result could not be saved to the leaderboard.',
    title: 'You won!',
  },
};
