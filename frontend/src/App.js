import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Change this if backend URL is different

function App() {
  const [votes, setVotes] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/votes')
      .then(res => res.json())
      .then(setVotes);

    socket.on('updateVotes', (data) => {
      setVotes(data);
    });

    return () => socket.off('updateVotes');
  }, []);

  const vote = () => {
    if (!selected) return alert('Select an option first!');
    fetch('http://localhost:4000/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ option: selected })
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', fontFamily: 'Arial' }}>
      <h2>Live Voting App</h2>
      <ul>
        {votes.map(({ option, votes }) => (
          <li key={option}>
            <label>
              <input
                type="radio"
                name="option"
                value={option}
                onChange={() => setSelected(option)}
                checked={selected === option}
              />
              {option}: {votes} votes
            </label>
          </li>
        ))}
      </ul>
      <button onClick={vote}>Vote</button>
    </div>
  );
}

export default App;

