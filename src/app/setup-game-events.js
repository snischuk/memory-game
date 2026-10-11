export function setupGameContainerEvents({
  gameContainer,
  gameController,
  leaderboardController,
  audioService,
  messages,
  onAudioMutedChange
}) {
  function updateAudioButton() {
    const isMuted = audioService.isMuted

    gameContainer.audioButtonElement.textContent = isMuted
      ? messages.audio.mutedIcon
      : messages.audio.enabledIcon
    gameContainer.audioButtonElement.setAttribute(
      'aria-label',
      isMuted ? messages.audio.enableLabel : messages.audio.muteLabel
    )
  }

  document.addEventListener(
    'click',
    () => {
      audioService.startBackgroundMusic()
    },
    { once: true }
  )

  gameContainer.audioButtonElement.addEventListener('click', () => {
    const isAudioMuted = audioService.toggleAudio()
    onAudioMutedChange(isAudioMuted)

    updateAudioButton()
  })

  updateAudioButton()

  gameContainer.gameBoardElement.addEventListener('click', event => {
    const cardElement = event.target.closest('[data-card-id]')

    if (!cardElement) {
      return
    }

    const cardId = Number(cardElement.dataset.cardId)

    gameController.handleCardClick(cardId)
  })

  gameContainer.newGameHeaderButtonElement.addEventListener('click', () => {
    gameController.startNewGame()
    gameContainer.closeVictoryModal()
    gameContainer.closeLeaderboard()
  })

  gameContainer.newGameButtonElement.addEventListener('click', () => {
    gameController.startNewGame()
    gameContainer.closeVictoryModal()
  })

  gameContainer.leaderboardButtonElement.addEventListener('click', () => {
    const leaderboardResults = leaderboardController.getLeaderboardResults()

    gameContainer.showLeaderboard(leaderboardResults)
  })

  gameContainer.closeVictoryButtonElement.addEventListener('click', () => {
    gameContainer.closeVictoryModal()
  })

  gameContainer.closeLeaderboardButtonElement.addEventListener('click', () => {
    gameContainer.closeLeaderboard()
  })
}
