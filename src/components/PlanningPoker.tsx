import React, { useState } from 'react';
import PlanningPokerTable from './PlanningPokerTable';

type Player = {
  id: string;
  name: string;
  vote: number | null;
};

const PlanningPoker: React.FC = () => {
  const [cards] = useState([0, 1, 2, 3, 5, 8, 13, 20, 40, 100]);
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Player 1', vote: null },
    { id: '2', name: 'Player 2', vote: null },
    { id: '3', name: 'Player 3', vote: null },
  ]);
  const [revealVotes, setRevealVotes] = useState<boolean>(false);

  const handleVote = (playerId: string, vote: number) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId ? { ...player, vote } : player
      )
    );
  };

  const handleReset = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({ ...player, vote: null }))
    );
    setRevealVotes(false)
  };

  const handleRevealVotes = () => {
    setRevealVotes(true);
  };

  return (
    <div className="planning-poker">
      <h1>Planning Poker</h1>
      <PlanningPokerTable players={players} cards={cards} onVote={handleVote} revealVotes={revealVotes} />
      <div className="button-container">
        <button onClick={handleReset}>Reset</button>
        {!revealVotes && (
          <button onClick={handleRevealVotes}>Reveal Votes</button>
        )}
      </div>
    </div>
  );
};

export default PlanningPoker;
