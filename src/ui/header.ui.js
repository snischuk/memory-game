export function createHeader() {
  const headerElement = document.createElement('header');
  headerElement.classList.add('header');

  const newGameButtonElement = document.createElement('button');
  newGameButtonElement.classList.add('button');
  newGameButtonElement.textContent = 'New Game';

  const leaderboardButtonElement = document.createElement('button');
  leaderboardButtonElement.classList.add('button');
  leaderboardButtonElement.textContent = 'Leaderboard';

  headerElement.append(newGameButtonElement, leaderboardButtonElement);

  return {
    headerElement,
    newGameButtonElement,
    leaderboardButtonElement,
  };
}
