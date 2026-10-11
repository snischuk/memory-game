import { createGameController } from '@/controller/game.controller.js'
import { createLeaderboardController } from '@/controller/leaderboard.controller.js'
import { CARD_VALUES } from '@/core/game/game.constants.js'
import { GameService } from '@/core/game/game.service.js'
import { GameAudioService } from '@/services/game-audio.service.js'
import { LeaderboardService } from '@/services/leaderboard.service.js'
import { MemoryGameStorageService } from '@/services/memory-game-storage.service.js'
import { LocalStorageService } from '@/infrastructure/storage/local-storage.service.js'
import { createGameContainer } from '@/components/containers/game/game.container.js'
import { messages } from '@/i18n/index.js'
import { setupGameContainerEvents } from './setup-game-events.js'

export function initializeApp() {
  const gameContainer = createGameContainer(messages)

  document.body.append(gameContainer.rootElement)

  const storageService = new LocalStorageService()
  const memoryGameStorageService = new MemoryGameStorageService(storageService)
  const gameService = new GameService()
  const leaderboardService = new LeaderboardService(memoryGameStorageService)
  const audioMuted = memoryGameStorageService.load().settings.audioMuted
  const gameAudioService = new GameAudioService(audioMuted)

  const leaderboardController = createLeaderboardController(leaderboardService)

  function finishGame(completedGame) {
    const movesCount = completedGame.gameState.movesCount
    const { isSaved } =
      leaderboardController.saveGameResultToLeaderboard(movesCount)

    gameContainer.showVictoryModal(movesCount, { isSaved })
  }

  const gameController = createGameController({
    gameService,
    cardValues: CARD_VALUES,
    renderGame: gameContainer.renderGame,
    onGameComplete: finishGame,
    onCardFlip: () => gameAudioService.playCardFlipSound(),
    onCardFlipBack: () => gameAudioService.playCardFlipBackSound()
  })

  setupGameContainerEvents({
    gameContainer,
    gameController,
    leaderboardController,
    audioService: gameAudioService,
    messages,
    onAudioMutedChange: isMuted =>
      memoryGameStorageService.update({ settings: { audioMuted: isMuted } })
  })
}
