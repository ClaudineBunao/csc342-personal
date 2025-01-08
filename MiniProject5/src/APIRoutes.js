const express = require('express');
const cookieParser = require('cookie-parser');
// const crypto = require('crypto');

const router = express.Router();
router.use(cookieParser());
router.use(express.json());

const path = require('path');


const jwtAlgorithm = require('./middleware/jwtAlgorithm');
const { TokenMiddleware, removeToken } = require('./middleware/TokenMiddleware');

const UserDAO = require('./dao/UserDAO');

const TOKEN_COOKIE_NAME = "mp5_token";
const API_SECRET = "random";

const follows = require('../src/data/follows.json'); // Import the follows object from follows.json
const howls = require('../src/data/howls.json'); // Import the howls array from howls.json
const users = require('../src/data/users.json'); // Import the users array from users.json

router.use(express.json());

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserDAO.getUserByCredentials(username, password);
    const token = jwtAlgorithm.generateToken(user, API_SECRET);
    res.cookie(TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 3600000 // 1 hour
    });
    res.json({ message: 'Login successful' });
  } catch (err) {
    const statusCode = typeof err.code === 'number' ? err.code : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

//api/userinfo
router.get('/users/current', TokenMiddleware, (req, res) => {
  res.json(req.user);
});

router.post('/logout', TokenMiddleware, (req, res) => {
  removeToken(req, res);
  res.json({ message: 'Logout successful' });
});

// Serve main
router.get('/main', TokenMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

// Serve profile
router.get('/profile', TokenMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, '../static/templates', 'profile.html'));
});

// Route to fetch howls
router.get('/api/howls', TokenMiddleware, (req, res) => {
  res.json(howls);
});

router.get('/howls', TokenMiddleware, (req, res) => {
  // console.log('req.user:', req.user); // Log the req.user object
  // console.log('follows object:', follows); // Log the follows object

  const userFollows = follows[req.user.id]?.following || [];
  // console.log('Followed users:', userFollows); // Log the followed users

  // Ensure howls is an array of objects with userId and datetime properties
  const userHowls = howls
    .filter(h => h.userId === req.user.id || userFollows.includes(h.userId))
    .sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

  // console.log('Filtered howls:', userHowls); // Log the filtered howls

  const userHowlsWithUsername = userHowls.map(howl => ({
    ...howl,
    username: users[howl.userId]?.username || 'unknown',
    text: howl.text
  }));

  res.json(userHowlsWithUsername);
});

// Create a new howl
router.post('/howls', TokenMiddleware, (req, res) => {
  console.log('req.user:', req.user); // Log the req.user object
  const newHowl = {
    userId: req.user.id,
    text: req.body.text,
    datetime: new Date().toISOString() // Add datetime property
  };
  console.log('New howl:', newHowl); // Log the new howl
  howls.push(newHowl);
  res.status(201).json(newHowl);
});




// Get howls posted by a specific user
router.get('/howls/:username', TokenMiddleware, (req, res) => {
  const userHowls = howls.filter(h => h.user === req.params.username);
  res.json(userHowls);
});

// Get howls posted by all users followed by the authenticated user
router.get('/howls', TokenMiddleware, (req, res) => {
  const followedUsers = follows.filter(f => f.follower === req.user.username).map(f => f.followee);
  const followedHowls = howls.filter(h => followedUsers.includes(h.user));
  res.json(followedHowls);
});

// Get a specific user's object
router.get('/users/:username', TokenMiddleware, (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Get the list of users followed by a specific user
router.get('/follows/:username', TokenMiddleware, (req, res) => {
  const followedUsers = follows.filter(f => f.follower === req.params.username).map(f => f.followee);
  res.json(followedUsers);
});

// Follow a user
router.post('/follows', TokenMiddleware, (req, res) => {
  const newFollow = { follower: req.user.username, followee: req.body.followee };
  follows.push(newFollow);
  res.status(201).json(newFollow);
});

// Unfollow a user
router.delete('/follows', TokenMiddleware, (req, res) => {
  const { followee } = req.body;
  follows = follows.filter(f => !(f.follower === req.user.username && f.followee === followee));
  res.status(200).json({ message: 'Unfollowed successfully' });
});

// Example unfollow route
router.post('/unfollow', TokenMiddleware, (req, res) => {
  const { followee } = req.body;
  follows = follows.filter(f => !(f.follower === req.user.username && f.followee === followee));
  res.status(200).json({ message: 'Unfollowed successfully' });
});

router.use((err, req, res, next) => {
  if (err) {
    const statusCode = err.code || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ message });
  } else {
    next();
  }
});

module.exports = router;