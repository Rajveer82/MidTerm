const express = require('express');
const mongoose = require('mongoose');
const Song = require('./models/Song');
const app = express();
const port = 3000;
const fs = require('fs');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Rajveer:Rajjo123@cluster0.jdl76.mongodb.net/', 
    
  )
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
    
    app.get('/songs', async (req, res) => {
        try {
          const songs = await Song.find(); // Fetch all songs from MongoDB
          res.status(200).json(songs);
        } catch (err) {
          res.status(500).json({ message: 'Error fetching songs' });
        }
      });



// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });