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