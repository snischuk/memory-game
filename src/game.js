export function createCards(cardValues) {
  const cards = [];

  cardValues.forEach((cardValue) => {
    cards.push(
      {
        id: cards.length,
        value: cardValue,
      },
      {
        id: cards.length + 1,
        value: cardValue,
      },
    );
  });

  return cards;
}
