const express = require('express');
const mongoose = require('mongoose');
const Song = require('./models/Song');
const app = express();
const port = 3000;
const fs = require('fs');
