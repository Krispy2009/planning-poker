import React from 'react';
import PokerCard from './PokerCard';

type PokerDeckProps = {
  cards: number[];
  selectedCard: number | null;
  onCardClick: (value: number) => void;
};

const PokerDeck: React.FC<PokerDeckProps> = ({ cards, selectedCard, onCardClick }) => {
  return (
    <div className="deck">
      {cards.map((cardValue) => (
        <PokerCard
          key={cardValue}
          value={cardValue}
          selected={cardValue === selectedCard}
          onClick={() => onCardClick(cardValue)}
        />
      ))}
    </div>
  );
};

export default PokerDeck;
