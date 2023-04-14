import React from 'react';

type PokerCardProps = {
  value: number;
  selected: boolean;
  onClick: () => void;
};

const PokerCard: React.FC<PokerCardProps> = ({ value, selected, onClick }) => {
  const cardClasses = `card ${selected ? 'selected' : ''}`;

  return (
    <div className={cardClasses} onClick={onClick}>
      {value}
    </div>
  );
};

export default PokerCard;
