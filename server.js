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
    app.use(express.json());
    // Route to serve index.html
app.get('/', (req, res) => {
    console.log('Received request for index.html');
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error loading index.html:', err);
            res.status(500).send('Error loading index.html');
        } else {
            res.send(data);
            console.log('index.html sent successfully');
        }
    });
});
// Route to fetch all songs
app.get('/songs', (req, res) => {
    console.log('Received request to fetch all songs');
    fs.readFile('songs.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading songs.json:', err);
            res.status(500).json({ message: 'Error reading songs.json' });
        } else {
            const songs = JSON.parse(data);
            console.log(`Fetched ${songs.length} songs from songs.json`);
            res.status(200).json(songs);
        }
    });
});
    // Route to fetch a song by its ID
app.get('/songs/:id', (req, res) => {
    const songId = parseInt(req.params.id);
    console.log(`Received request to fetch song with ID: ${songId}`);

    fs.readFile('songs.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading songs.json:', err);
            res.status(500).json({ message: 'Error reading songs.json' });
        } else {
            const songs = JSON.parse(data);
            const song = songs.find(s => s.songId === songId);
            if (song) {
                console.log(`Song found:`, song);
                res.status(200).json(song);
            } else {
                console.log('Song not found');
                res.status(404).json({ message: 'Song not found' });
            }
        }
    });
});

// Route to fetch songs by artist name
app.get('/songs/artist/:name', (req, res) => {
    const artistName = req.params.name.toLowerCase();
    console.log(`Received request to fetch songs by artist: ${artistName}`);

    fs.readFile('songs.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading songs.json:', err);
            res.status(500).json({ message: 'Error reading songs.json' });
        } else {
            const songs = JSON.parse(data);
            const artistSongs = songs.filter(song => song.artistData.name.toLowerCase() === artistName);
            if (artistSongs.length > 0) {
                console.log(`Songs found for artist ${artistName}:`, artistSongs);
                res.status(200).json(artistSongs);
            } else {
                console.log('No songs found for this artist');
                res.status(404).json({ message: 'No songs found for this artist' });
            }
        }
    });
});


// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });