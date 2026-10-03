export function setupGameUIEvents({
  gameUI,
  gameController,
  leaderboardController,
  startBackgroundMusic,
  toggleAudio,
  getAudioMutedState,
}) {
  document.addEventListener(
    'click',
    () => {
      startBackgroundMusic();
    },
    { once: true },
  );

  gameUI.audioButtonElement.addEventListener('click', () => {
    const isAudioMuted = toggleAudio();
    gameUI.audioButtonElement.textContent = isAudioMuted ? '🔇' : '🔊';
  });

  gameUI.audioButtonElement.textContent = getAudioMutedState() ? '🔇' : '🔊';

  gameUI.gameBoardElement.addEventListener('click', (event) => {
    const cardElement = event.target.closest('[data-card-id]');

    if (!cardElement) {
      return;
    }

    const cardId = Number(cardElement.dataset.cardId);

    gameController.handleCardClick(cardId);
  });

  gameUI.newGameHeaderButtonElement.addEventListener('click', () => {
    gameController.startNewGame();
    gameUI.closeVictoryModal();
    gameUI.closeLeaderboard();
  });

  gameUI.newGameButtonElement.addEventListener('click', () => {
    gameController.startNewGame();
    gameUI.closeVictoryModal();
  });

  gameUI.leaderboardButtonElement.addEventListener('click', () => {
    const leaderboardResults = leaderboardController.getLeaderboardResults();
    gameUI.showLeaderboard(leaderboardResults);
  });

  gameUI.closeVictoryButtonElement.addEventListener('click', () => {
    gameUI.closeVictoryModal();
  });

  gameUI.closeLeaderboardButtonElement.addEventListener('click', () => {
    gameUI.closeLeaderboard();
  });
}
