const express = require('express');
const router = express.Router();
const User = require('../models/User');
const BlockedAccount = require('../models/BlockedAccount');
const getBlockedUsers = require('../middlewares/getBlockedUsers');  // Import the getBlockedUsers middleware

router.get('/blocked/:userId', authMiddleware, getBlockedUsers);

const blockUser = async (req, res) => {
    const blockerId = req.session.user._id;  // Assuming the blocker is the logged-in user
    const { blockedId } = req.body;

    try {
        const blockedAccount = new BlockedAccount({ blockerId, blockedId });
        await blockedAccount.save();
        res.status(201).json({ message: 'User blocked successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error blocking user', details: error.message });
    }
};

router.post('/block', authMiddleware, blockUser);

const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        
        req.session.user = newUser;
        res.cookie('userId', newUser._id, { httpOnly: true });
        res.cookie('username', newUser.username, { httpOnly: true });
        res.cookie('email', newUser.email, { httpOnly: true });

        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            req.session.user = user;
            res.cookie('userId', user._id, { httpOnly: true });
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

router.get('/:id', getUserById, (req, res) => {
    res.json(req.user);
});

router.get('/profile/:id', getUserById, (req, res) => {
    const user = req.user;
    const profileInfo = {
        username: user.username,
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        birthDate: user.birthDate || '',
        birthPlace: user.birthPlace || '',
        accountCreationDate: user.createdAt,
        postCount: user.posts ? user.posts.length : 0, // Assuming user has posts field
    };
    res.json(profileInfo);
});

// Middleware to get blocked accounts
const getBlockedAccounts = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const blockedAccounts = await BlockedAccount.find({ userId });

    if (!blockedAccounts) {
      return res.status(404).json({ message: 'Blocked accounts not found' });
    }

    req.blockedAccounts = blockedAccounts;
    next();
  } catch (error) {
    console.error('Error fetching blocked accounts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Route to get blocked accounts
router.get('/blocked/:id', getBlockedAccounts, (req, res) => {
  res.json(req.blockedAccounts);
});



module.exports = router;


