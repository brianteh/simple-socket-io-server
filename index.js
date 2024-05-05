// Import required modules
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');

// Create a new Express application
const app = express();
// Enable CORS with specific origin(s)
//app.use(cors());

// Create a basic HTTP server using Express
const server = http.createServer(app);

// Create a new instance of Socket.IO by passing the HTTP server
const io = socketIO(server, {
  cors: {
    origin: "*"//['http://localhost','http://eliteolympiad.localdev','http://portal.eliteolympiad.org']
  }}
);

// Define a connection event handler
io.on('connection', (socket) => {
  console.log('A user connected');

  // Define event handlers for custom events
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    // Broadcast the received message to all connected clients
    io.emit('chat message', msg);
  });

  // Define a disconnect event handler
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server and listen on port 3000
server.listen(3002, () => {
  console.log('Server is running on port 3002');
});