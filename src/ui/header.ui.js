export function createHeader() {
  const headerElement = document.createElement('header');
  headerElement.classList.add('header');

  const newGameButtonElement = document.createElement('button');
  newGameButtonElement.classList.add('button');
  newGameButtonElement.textContent = 'New Game';

  const audioButtonElement = document.createElement('button');
  audioButtonElement.classList.add('button');

  const leaderboardButtonElement = document.createElement('button');
  leaderboardButtonElement.classList.add('button');
  leaderboardButtonElement.textContent = 'Leaderboard';

  headerElement.append(
    newGameButtonElement,
    audioButtonElement,
    leaderboardButtonElement,
  );

  return {
    headerElement,
    newGameButtonElement,
    audioButtonElement,
    leaderboardButtonElement,
  };
}
