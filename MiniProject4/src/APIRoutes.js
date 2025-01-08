const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// Load initial data from JSON files
const howlsPath = path.join(__dirname, '../src/data', 'howls.json');
const followsPath = path.join(__dirname, '../src/data', 'follows.json');
const usersPath = path.join(__dirname, '../src/data', 'users.json');

let howls = JSON.parse(fs.readFileSync(howlsPath, 'utf8'));
let follows = JSON.parse(fs.readFileSync(followsPath, 'utf8'));
if (!Array.isArray(follows)) {
  follows = [];
}
let users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

router.use(express.json());

// Middleware to authenticate user
function authenticate(req, res, next) {
  // const username = req.body.username || req.query.username;
  const { username } = req.body;
  // console.log('Received user:', username); // Log the received username
  // if (!username) {
  //   console.log('Undefined username received from:', req.originalUrl); // Log the source of the undefined username
  // }
  
  const user = Object.values(users).find(u => u.username === username);
  console.log('Found user:', user); // Log the found user
  if (user) {
    req.user = user;
    next();
  } else {
    console.log('User not found'); // Log if user is not found
    res.status(401).json({ error: 'Invalid credentials' });
  }
}

// Generate a simple token
function generateToken(user) {
  const token = jwt.sign({ userId: user.id, username: user.username }, 'your_secret_key');
  return token;
}

// Authenticate a user
router.post('/login', authenticate, (req, res) => {
  // const token = jwt.sign({ sub: req.user.id }, 'your_jwt_secret', { expiresIn: '1h' });
  // res.json({ token }); 
  const token = generateToken(req.user);
  res.json({ message: 'Authenticated', token: token }); 
});


// Middleware to verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Ensure token is correctly verified
    req.user = decoded;
    console.log('User ID from token:', req.user.userId); // Log the user ID from the token
    next();
  } catch (err) {
    console.error('Token Verification Error:', err); // Log any errors during token verification
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

// Serve main
router.get('/main', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, '../static/templates', 'main.html'));
});

// Serve profile
router.get('/profile', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, '../static/templates', 'profile.html'));
});

// Route to fetch howls
router.get('/api/howls', verifyToken, (req, res) => {
  res.json(howls);
});

// Get the currently authenticated user's object
// router.get('/me', authenticate, (req, res) => {
//   res.json(req.user);
// });

// Get howls for the logged-in user and the users they follow
router.get('/howls', verifyToken, (req, res) => {
  const userFollows = follows[req.user.userId]?.following || [];
  console.log('Followed users:', userFollows); // Log the followed users

  const userHowls = howls.filter(h => h.userId === req.user.userId || userFollows.includes(h.userId)).sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  console.log('Filtered howls:', userHowls); // Log the filtered howls

  // Add username to each howl
  const userHowlsWithUsername = userHowls.map(howl => ({
    ...howl,
    username: users[howl.userId]?.username || 'unknown',
    text: howl.text 
  }));

  res.json(userHowlsWithUsername);
});

// Create a new howl
router.post('/howls', verifyToken, (req, res) => {
  const newHowl = { 
    userId: req.user.userId, 
    text: req.body.text, 
    datetime: new Date().toISOString() // Add datetime property
  };
  // console.log('New howl:', newHowl); // Log the new howl
  howls.push(newHowl);
  res.status(201).json(newHowl);
});

// Get howls posted by a specific user
router.get('/howls/:username', (req, res) => {
  const userHowls = howls.filter(h => h.user === req.params.username);
  res.json(userHowls);
});

// Get howls posted by all users followed by the authenticated user
router.get('/howls', verifyToken, (req, res) => {
  const followedUsers = follows.filter(f => f.follower === req.user.username).map(f => f.followee);
  const followedHowls = howls.filter(h => followedUsers.includes(h.user));
  res.json(followedHowls);
});

// Get a specific user's object
router.get('/users/:username', (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Get the list of users followed by a specific user
router.get('/follows/:username', (req, res) => {
  const followedUsers = follows.filter(f => f.follower === req.params.username).map(f => f.followee);
  res.json(followedUsers);
});

// Follow a user
router.post('/follows', verifyToken, (req, res) => {
  const newFollow = { follower: req.user.username, followee: req.body.followee };
  follows.push(newFollow);
  res.status(201).json(newFollow);
});

// Unfollow a user
router.delete('/follows', verifyToken, (req, res) => {
  const { followee } = req.body;
  follows = follows.filter(f => !(f.follower === req.user.username && f.followee === followee));
  res.status(200).json({ message: 'Unfollowed successfully' });
});

module.exports = router;