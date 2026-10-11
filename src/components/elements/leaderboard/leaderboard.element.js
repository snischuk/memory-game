import './leaderboard.element.css'
import { formatPlayedDate } from './format-played-date.util.js'

const FIRST_LEADERBOARD_PLACE = 1

export function createLeaderboard(messages) {
  const leaderboardElement = document.createElement('div')

  leaderboardElement.classList.add('leaderboard-results')

  function render(gameResults) {
    leaderboardElement.replaceChildren()

    if (gameResults.length === 0) {
      const noResultsElement = document.createElement('p')

      noResultsElement.classList.add('leaderboard-empty')
      noResultsElement.textContent = messages.leaderboard.noResults

      leaderboardElement.append(noResultsElement)

      return
    }

    const leaderboardTableElement = createLeaderboardTable(
      gameResults,
      messages
    )

    leaderboardElement.append(leaderboardTableElement)
  }

  return {
    leaderboardElement,
    render
  }
}

function createLeaderboardTable(gameResults, messages) {
  const tableElement = document.createElement('table')

  tableElement.classList.add('leaderboard-table')

  const tableHeadElement = document.createElement('thead')
  const tableHeaderRowElement = createLeaderboardHeader(messages)

  tableHeadElement.append(tableHeaderRowElement)

  const tableBodyElement = createLeaderboardBody(gameResults)

  tableElement.append(tableHeadElement, tableBodyElement)

  return tableElement
}

function createLeaderboardHeader(messages) {
  const tableRowElement = document.createElement('tr')

  const placeHeaderElement = document.createElement('th')
  placeHeaderElement.textContent = messages.leaderboard.place

  const movesHeaderElement = document.createElement('th')
  movesHeaderElement.textContent = messages.leaderboard.moves

  const dateHeaderElement = document.createElement('th')
  dateHeaderElement.textContent = messages.leaderboard.date

  tableRowElement.append(
    placeHeaderElement,
    movesHeaderElement,
    dateHeaderElement
  )

  return tableRowElement
}

function createLeaderboardBody(gameResults) {
  const tableBodyElement = document.createElement('tbody')

  gameResults.forEach((gameResult, index) => {
    const place = index + FIRST_LEADERBOARD_PLACE
    const tableRowElement = createLeaderboardRow(gameResult, place)

    tableBodyElement.append(tableRowElement)
  })

  return tableBodyElement
}

function createLeaderboardRow(gameResult, place) {
  const tableRowElement = document.createElement('tr')

  const placeElement = document.createElement('td')
  placeElement.textContent = place

  const movesElement = document.createElement('td')
  movesElement.textContent = gameResult.movesCount

  const dateElement = document.createElement('td')
  dateElement.textContent = formatPlayedDate(gameResult.playedAt)

  tableRowElement.append(placeElement, movesElement, dateElement)

  return tableRowElement
}
