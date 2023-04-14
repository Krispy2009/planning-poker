import React, { useState, useEffect } from 'react';
import PlanningPokerTable from './PlanningPokerTable';

interface Props {
  sessionId: string;
}

type Player = {
  id: string;
  name: string;
  vote: number | null;
};

const PlanningPoker: React.FC<Props> = ({sessionId}) => {
  const [cards] = useState([0, 1, 2, 3, 5, 8, 13, 20, 40, 100]);
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Player 1', vote: null },
    { id: '2', name: 'Player 2', vote: null },
    { id: '3', name: 'Player 3', vote: null },
  ]);
  const [revealVotes, setRevealVotes] = useState<boolean>(false);

  const [connection, setConnection] = useState<WebSocket | null>(null);
  const [votes, setVotes] = useState<number[]>([]);

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocket(`ws://localhost:8000/ws/${sessionId}`);
    setConnection(ws);

    // Handle incoming messages from the server
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // If vote values were received, update the UI
      if (data.votes) {
        setVotes(data.votes);
      }
    };


    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, [sessionId]);

  // Send a vote to the server
  const sendVote = (value: number) => {
    if (connection) {
      connection.send(JSON.stringify({ vote: value }));
    }
  };


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
