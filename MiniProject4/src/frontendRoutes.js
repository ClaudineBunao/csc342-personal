const express = require('express');
const router = express.Router();
const path = require('path');

// Serve the main page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates', 'index.html'));
});

// Serve the howls page
router.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates', 'main.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates', 'index.html'));
});

router.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates', 'profile.html'));
});
module.exports = router;