import {
  getMatchedPairsCount,
  getTotalPairsCount
} from '@/core/game/game.logic.js'

import { closeModal, openModal } from '@/components/ui/modal/modal.ui.js'

import { createHeader } from '@/components/elements/header/header.element.js'
import { createLeaderboardModal } from '@/components/elements/leaderboard-modal/leaderboard-modal.element.js'
import { createLeaderboard } from '@/components/elements/leaderboard/leaderboard.element.js'
import { createMatchCounter } from '@/components/elements/match-counter/match-counter.element.js'
import { createMovesCounter } from '@/components/elements/moves-counter/moves-counter.element.js'
import { createVictoryModal } from '@/components/elements/victory-modal/victory-modal.element.js'

import { createGameBoardContainer } from '@/components/containers/game-board/game-board.container.js'

import './game.container.css'

export function createGameContainer(messages) {
  const {
    headerElement,
    newGameButtonElement: newGameHeaderButtonElement,
    leaderboardButtonElement,
    audioButtonElement
  } = createHeader(messages)

  const { gameBoardElement, render: renderGameBoard } =
    createGameBoardContainer(messages)

  const movesCounterElement = createMovesCounter()
  const matchCounterElement = createMatchCounter()

  const {
    modalElement: victoryModalElement,
    movesCountElement: victoryMovesCountElement,
    saveStatusElement: victorySaveStatusElement,
    newGameButtonElement,
    closeButtonElement: closeVictoryButtonElement
  } = createVictoryModal(messages)

  const { leaderboardElement, render: renderLeaderboard } =
    createLeaderboard(messages)

  const {
    modalElement: leaderboardModalElement,
    closeButtonElement: closeLeaderboardButtonElement
  } = createLeaderboardModal(leaderboardElement, messages)

  const rootElement = document.createElement('div')
  const mainElement = document.createElement('main')

  rootElement.classList.add('app')
  mainElement.classList.add('main')

  mainElement.append(gameBoardElement, movesCounterElement, matchCounterElement)

  rootElement.append(
    headerElement,
    mainElement,
    victoryModalElement,
    leaderboardModalElement
  )

  function renderGame(game) {
    renderGameBoard(game.cards, game.gameState)
    const matchedPairsCount = getMatchedPairsCount(
      game.gameState.matchedCardIds
    )
    const totalPairsCount = getTotalPairsCount(game.cards)

    movesCounterElement.textContent = messages.game.moves(
      game.gameState.movesCount
    )
    matchCounterElement.textContent = messages.game.pairs(
      matchedPairsCount,
      totalPairsCount
    )
  }

  function showVictoryModal(movesCount, { isSaved } = {}) {
    victoryMovesCountElement.textContent = messages.game.moves(movesCount)

    victorySaveStatusElement.textContent = isSaved
      ? ''
      : messages.victory.resultSaveFailed

    openModal(victoryModalElement)
  }

  function closeVictoryModal() {
    closeModal(victoryModalElement)
  }

  function showLeaderboard(gameResults) {
    renderLeaderboard(gameResults)

    openModal(leaderboardModalElement)
  }

  function closeLeaderboard() {
    closeModal(leaderboardModalElement)
  }

  return {
    rootElement,
    renderGame,
    showVictoryModal,
    closeVictoryModal,
    showLeaderboard,
    closeLeaderboard,
    newGameHeaderButtonElement,
    audioButtonElement,
    newGameButtonElement,
    leaderboardButtonElement,
    closeVictoryButtonElement,
    closeLeaderboardButtonElement,
    gameBoardElement
  }
}
