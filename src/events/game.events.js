export function setupGameContainerEvents({
  gameContainer,
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

  gameContainer.audioButtonElement.addEventListener('click', () => {
    const isAudioMuted = toggleAudio();

    gameContainer.audioButtonElement.textContent = isAudioMuted ? '🔇' : '🔊';
  });

  gameContainer.audioButtonElement.textContent = getAudioMutedState()
    ? '🔇'
    : '🔊';

  gameContainer.gameBoardElement.addEventListener('click', (event) => {
    const cardElement = event.target.closest('[data-card-id]');

    if (!cardElement) {
      return;
    }

    const cardId = Number(cardElement.dataset.cardId);

    gameController.handleCardClick(cardId);
  });

  gameContainer.newGameHeaderButtonElement.addEventListener('click', () => {
    gameController.startNewGame();
    gameContainer.closeVictoryModal();
    gameContainer.closeLeaderboard();
  });

  gameContainer.newGameButtonElement.addEventListener('click', () => {
    gameController.startNewGame();
    gameContainer.closeVictoryModal();
  });

  gameContainer.leaderboardButtonElement.addEventListener('click', () => {
    const leaderboardResults = leaderboardController.getLeaderboardResults();

    gameContainer.showLeaderboard(leaderboardResults);
  });

  gameContainer.closeVictoryButtonElement.addEventListener('click', () => {
    gameContainer.closeVictoryModal();
  });

  gameContainer.closeLeaderboardButtonElement.addEventListener('click', () => {
    gameContainer.closeLeaderboard();
  });
}
