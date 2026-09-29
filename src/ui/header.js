export function createHeader() {
  const headerElement = document.createElement('header');

  const newGameButtonElement = document.createElement('button');

  newGameButtonElement.textContent = 'New Game';

  const leaderboardButtonElement = document.createElement('button');

  leaderboardButtonElement.textContent = 'Leaderboard';

  headerElement.append(newGameButtonElement, leaderboardButtonElement);

  return {
    headerElement,
    newGameButtonElement,
    leaderboardButtonElement,
  };
}
