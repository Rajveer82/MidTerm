const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  songId: Number,
  artistData: {
    artistId: Number,
    name: String,
    country: String
  },
  releaseDate: String,
  songTitle: String,
  genre: String
});

module.exports = mongoose.model('Song', songSchema);
