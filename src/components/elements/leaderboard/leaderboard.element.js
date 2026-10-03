import './leaderboard.element.css';

export function createLeaderboard() {
  const leaderboardElement = document.createElement('div');

  leaderboardElement.classList.add('leaderboard-results');

  function render(gameResults) {
    leaderboardElement.replaceChildren();

    if (gameResults.length === 0) {
      const noResultsElement = document.createElement('p');

      noResultsElement.classList.add('leaderboard-empty');
      noResultsElement.textContent = 'No results yet.';

      leaderboardElement.append(noResultsElement);

      return;
    }

    const leaderboardTableElement = createLeaderboardTable(gameResults);

    leaderboardElement.append(leaderboardTableElement);
  }

  return {
    leaderboardElement,
    render,
  };
}

function createLeaderboardTable(gameResults) {
  const tableElement = document.createElement('table');

  tableElement.classList.add('leaderboard-table');

  const tableHeadElement = document.createElement('thead');
  const tableHeaderRowElement = createLeaderboardHeader();

  tableHeadElement.append(tableHeaderRowElement);

  const tableBodyElement = createLeaderboardBody(gameResults);

  tableElement.append(tableHeadElement, tableBodyElement);

  return tableElement;
}

function createLeaderboardHeader() {
  const tableRowElement = document.createElement('tr');

  const placeHeaderElement = document.createElement('th');
  placeHeaderElement.textContent = 'Place';

  const movesHeaderElement = document.createElement('th');
  movesHeaderElement.textContent = 'Moves';

  const dateHeaderElement = document.createElement('th');
  dateHeaderElement.textContent = 'Date';

  tableRowElement.append(
    placeHeaderElement,
    movesHeaderElement,
    dateHeaderElement,
  );

  return tableRowElement;
}

function createLeaderboardBody(gameResults) {
  const tableBodyElement = document.createElement('tbody');

  gameResults.forEach((gameResult, index) => {
    const place = index + 1;
    const tableRowElement = createLeaderboardRow(gameResult, place);

    tableBodyElement.append(tableRowElement);
  });

  return tableBodyElement;
}

function createLeaderboardRow(gameResult, place) {
  const tableRowElement = document.createElement('tr');

  const placeElement = document.createElement('td');
  placeElement.textContent = place;

  const movesElement = document.createElement('td');
  movesElement.textContent = gameResult.movesCount;

  const dateElement = document.createElement('td');
  dateElement.textContent = formatPlayedDate(gameResult.playedAt);

  tableRowElement.append(placeElement, movesElement, dateElement);

  return tableRowElement;
}

function formatPlayedDate(playedAt) {
  const date = new Date(playedAt);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
