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

export function shuffleCards(cards) {
  const shuffledCards = [...cards];

  for (
    let currentIndex = shuffledCards.length - 1;
    currentIndex > 0;
    currentIndex -= 1
  ) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

    [shuffledCards[currentIndex], shuffledCards[randomIndex]] = [
      shuffledCards[randomIndex],
      shuffledCards[currentIndex],
    ];
  }

  return shuffledCards;
}
