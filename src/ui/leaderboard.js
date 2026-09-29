import { createModal } from './modals.js';

export function createLeaderboardModal() {
  const titleElement = document.createElement('h2');

  titleElement.textContent = 'Leaderboard';

  const resultsElement = document.createElement('div');

  const closeButtonElement = document.createElement('button');

  closeButtonElement.textContent = 'Close';

  const modalElement = createModal([
    titleElement,
    resultsElement,
    closeButtonElement,
  ]);

  return {
    modalElement,
    resultsElement,
    closeButtonElement,
  };
}

function formatPlayedDate(playedAt) {
  const date = new Date(playedAt);

  const day = String(date.getDate()).padStart(2, '0');

  const month = String(date.getMonth() + 1).padStart(2, '0');

  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
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

function createLeaderboardBody(gameResults) {
  const tableBodyElement = document.createElement('tbody');

  gameResults.forEach((gameResult, index) => {
    const place = index + 1;

    const tableRowElement = createLeaderboardRow(gameResult, place);

    tableBodyElement.append(tableRowElement);
  });

  return tableBodyElement;
}

function createLeaderboardTable(gameResults) {
  const tableElement = document.createElement('table');

  const tableHeadElement = document.createElement('thead');

  const tableHeaderRowElement = createLeaderboardHeader();

  tableHeadElement.append(tableHeaderRowElement);

  const tableBodyElement = createLeaderboardBody(gameResults);

  tableElement.append(tableHeadElement, tableBodyElement);

  return tableElement;
}

export function renderLeaderboard(resultsElement, gameResults) {
  resultsElement.replaceChildren();

  if (gameResults.length === 0) {
    const noResultsElement = document.createElement('p');

    noResultsElement.textContent = 'No results yet.';

    resultsElement.append(noResultsElement);

    return;
  }

  const leaderboardTable = createLeaderboardTable(gameResults);

  resultsElement.append(leaderboardTable);
}
