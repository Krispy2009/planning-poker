import React, { useState } from 'react';
import PokerDeck from './PokerDeck';

type Player = {
  id: string;
  name: string;
  vote: number | null;
};

type PlanningPokerTableProps = {
  players: Player[];
  cards: number[];
  onVote: (playerId: string, vote: number) => void;
};

const PlanningPokerTable: React.FC<PlanningPokerTableProps> = ({
  players,
  cards,
  onVote,
}) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (cardValue: number) => {
    setSelectedCard(cardValue);
  };

  const handleVote = (playerId: string) => {
    if (selectedCard !== null) {
      onVote(playerId, selectedCard);
      setSelectedCard(null);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Vote</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={player.id}>
            <td>{player.name}</td>
            <td>
              {player.vote !== null ? (
                <span>{player.vote}</span>
              ) : (
                <PokerDeck
                  cards={cards}
                  selectedCard={selectedCard}
                  onCardClick={() => handleVote(player.id)}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlanningPokerTable;
