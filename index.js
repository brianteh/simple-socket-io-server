// Import required modules
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Create a new Express application
const app = express();

// Create a basic HTTP server using Express
const server = http.createServer(app);

// Create a new instance of Socket.IO by passing the HTTP server
const io = socketIO(server);

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
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});