import './game-board.element.css';

export function createGameBoardElement() {
  const gameBoardElement = document.createElement('div');

  gameBoardElement.classList.add('game-board');

  return gameBoardElement;
}
