const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middlewares/auth');
const getBlockedUsers = require('../middlewares/getBlockedUser');

// Middleware to get blocked accounts
const getBlockedAccounts = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const [blockedAccounts] = await db.query('SELECT * FROM blocked_accounts WHERE blocker_id = ?', [userId]);

    if (!blockedAccounts.length) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        return res.status(404).json({ message: 'Blocked accounts not found' });
    }

    req.blockedAccounts = blockedAccounts;
    next();
  } catch (error) {
    console.error('Error fetching blocked accounts:', error);
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.status(500).json({ message: 'Server error' });
  }
};

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const [result] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);

    const newUser = { user_id: result.insertId, username, email };

    req.session.user = newUser;
    res.cookie('userId', newUser.user_id, { httpOnly: true });
    res.cookie('username', newUser.username, { httpOnly: true });
    res.cookie('email', newUser.email, { httpOnly: true });
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

    if (users.length) {
      const user = users[0];
      req.session.user = user;
      res.cookie('userId', user.user_id, { httpOnly: true });
      res.cookie('username', user.username, { httpOnly: true });
      res.cookie('email', user.email, { httpOnly: true });
      res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.json(user);
    } else {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.status(500).json({ error: err.message });
  }
});

// User logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.clearCookie('userId');
    res.clearCookie('username');
    res.clearCookie('email');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json({ message: 'Logged out successfully' });
  });
});

// Get current user
router.get('/me', (req, res) => {
  if (req.session.user) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json(req.session.user);
  } else {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Get user by ID
const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const [users] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);

    if (!users.length) {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = users[0];
    next();
  } catch (err) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.status(500).json({ error: err.message });
  }
};

router.get('/:id', getUserById, (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.json(req.user);
});

// Get user profile
router.get('/profile/:id', getUserById, (req, res) => {
  const user = req.user;
  const profileInfo = {
    username: user.username,
    email: user.email,
    firstName: user.first_name || '',
    lastName: user.last_name || '',
    birthDate: user.birth_date || '',
    birthPlace: user.birth_place || '',
    accountCreationDate: user.created_at,
  };
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.json(profileInfo);
});

// Block a user
router.post('/block', authMiddleware, async (req, res) => {
  const blockerId = req.session.user.user_id;
  const { blockedId } = req.body;

  try {
    await db.query('INSERT INTO blocked_accounts (blocker_id, blocked_id) VALUES (?, ?)', [blockerId, blockedId]);
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.status(201).json({ message: 'User blocked successfully' });
  } catch (error) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.status(500).json({ error: 'Error blocking user', details: error.message });
  }
});

// Get blocked users
router.get('/blocked/:userId', authMiddleware, getBlockedAccounts, (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.json(req.blockedAccounts);
});

module.exports = router;

