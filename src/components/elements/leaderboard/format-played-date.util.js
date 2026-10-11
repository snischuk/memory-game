const DATE_COMPONENT_WIDTH = 2
const DATE_PADDING_CHARACTER = '0'
const MONTH_INDEX_OFFSET = 1

export function formatPlayedDate(playedAt) {
  const date = new Date(playedAt)

  const day = String(date.getDate()).padStart(
    DATE_COMPONENT_WIDTH,
    DATE_PADDING_CHARACTER
  )
  const month = String(date.getMonth() + MONTH_INDEX_OFFSET).padStart(
    DATE_COMPONENT_WIDTH,
    DATE_PADDING_CHARACTER
  )
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}
