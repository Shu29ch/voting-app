const express = require('express');
const cors = require('cors');
const pool = require('./db');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.get('/', (req, res) => {
  res.send('Voting API');
});

// Initialize votes table if not exists
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS votes (
      id SERIAL PRIMARY KEY,
      option VARCHAR(100) UNIQUE NOT NULL,
      votes INTEGER DEFAULT 0
    )
  `);

  // Insert options if table empty
  const { rows } = await pool.query('SELECT COUNT(*) FROM votes');
  if (parseInt(rows[0].count) === 0) {
    await pool.query(`
      INSERT INTO votes (option, votes)
      VALUES ('Option A', 0), ('Option B', 0), ('Option C', 0)
    `);
  }
})();

// Get current vote counts
app.get('/votes', async (req, res) => {
  const result = await pool.query('SELECT option, votes FROM votes');
  res.json(result.rows);
});

// Vote for an option
app.post('/vote', async (req, res) => {
  const { option } = req.body;
  if (!option) return res.status(400).json({ error: 'Option is required' });

  try {
    await pool.query(
      'UPDATE votes SET votes = votes + 1 WHERE option = $1',
      [option]
    );
    const result = await pool.query('SELECT option, votes FROM votes');
    io.emit('updateVotes', result.rows); // send update to all clients
    res.json({ message: 'Vote counted' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

