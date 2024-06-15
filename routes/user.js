const express = require('express');
const router = express.Router();
const db = require('./db');
const authMiddleware = require('../middlewares/auth');
const getBlockedUsers = require('../middlewares/getBlockedUser');

const getBlockedAccounts = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const [blockedAccounts] = await db.query('SELECT * FROM blocked_accounts WHERE blocker_id = ?', [userId]);

    if (!blockedAccounts.length) {
        return res.status(404).json({ message: 'Blocked accounts not found' });
    }

    req.blockedAccounts = blockedAccounts;
    next();
  } catch (error) {
    console.error('Error fetching blocked accounts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const [result] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);

    const newUser = { user_id: result.insertId, username, email };

    req.session.user = newUser;
    res.cookie('userId', newUser.user_id, { httpOnly: true });
    res.cookie('username', newUser.username, { httpOnly: true });
    res.cookie('email', newUser.email, { httpOnly: true });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log("received data");
    const { email, password } = req.body;
    const [users] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

    if (users.length) {
      const user = users[0];
      if (user)
        console.log("Got the user");
      req.session.user = user;
      console.log('Session:', req.session);
      res.cookie('userId', user.user_id, { httpOnly: true });
      res.cookie('username', user.username, { httpOnly: true });
      res.cookie('email', user.email, { httpOnly: true });
      res.json(user);
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.clearCookie('userId');
    res.clearCookie('username');
    res.clearCookie('email');
    res.json({ message: 'Logged out successfully' });
  });
});

router.get('/me', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const [users] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);

    if (!users.length) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = users[0];
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

router.get('/:id', getUserById, (req, res) => {
  res.json(req.user);
});

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
  res.json(profileInfo);
});

router.post('/block', authMiddleware, async (req, res) => {
  const blockerId = req.session.user.user_id;
  const { blockedId } = req.body;

  try {
    await db.query('INSERT INTO blocked_accounts (blocker_id, blocked_id) VALUES (?, ?)', [blockerId, blockedId]);
    res.status(201).json({ message: 'User blocked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error blocking user', details: error.message });
  }
});

router.get('/blocked/:userId', authMiddleware, getBlockedAccounts, (req, res) => {
  res.json(req.blockedAccounts);
});

module.exports = router;

