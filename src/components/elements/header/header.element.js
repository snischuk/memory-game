import './header.element.css';

import {
  LEADERBOARD_BUTTON_TEXT,
  NEW_GAME_BUTTON_TEXT,
} from '../../../constants/ui.constants.js';

import { createButton } from '../../ui/button/button.ui.js';

export function createHeader() {
  const headerElement = document.createElement('header');

  headerElement.classList.add('header');

  const newGameButtonElement = createButton({
    textContent: NEW_GAME_BUTTON_TEXT,
  });

  const audioButtonElement = createButton();

  const leaderboardButtonElement = createButton({
    textContent: LEADERBOARD_BUTTON_TEXT,
  });

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
