const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const registerSocketEvents = require('./socket');

const app = express();

// Create HTTP server manually
const server = http.createServer(app);

// Attaching Socket.io to HTTP server
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.get('/', (req, res) => res.send('Chat server running'));

registerSocketEvents(io);

const PORT = process.env.PORT ?? 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));