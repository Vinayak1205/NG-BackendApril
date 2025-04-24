const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const myDb = require('../MongoDb'); // Your MongoDB connection
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware for JSON body parsing
app.use(express.json());
app.use(cors()); // Enable CORS

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected.');

  // Listen for notifications from clients
  socket.on('send_notification', (notification) => {
    // Broadcast the notification to all connected clients
    io.emit('receive_notification', notification);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

// API endpoint to save notifications to the database
app.post('/api/messages', async (req, res) => {
  try {
    // Extract message from the request body
    const { message } = req.body;

    console.log(message)

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    // Insert the message into the "Messages" collection in MongoDB
    await myDb.collection('Messages').insertOne({ message });

    // Send a success response
    res.status(201).json({ success: true, message: 'Notification saved successfully.' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, error: 'Failed to save notification.' });
  }
});

// Start the server
const PORT = 9000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
