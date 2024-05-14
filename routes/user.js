const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).send('User created');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user.id }, 'secret');
    res.json({ token });
});

router.post('/block', async (req, res) => {
    const { userId, blockUserId } = req.body;
    const user = await User.findByPk(userId);
    user.blockedUsers = [...user.blockedUsers, blockUserId];
    await user.save();
    res.send('User blocked');
});

router.post('/signal', async (req, res) => {
    const { userId, signalUserId } = req.body;
    const user = await User.findByPk(userId);
    user.signaledUsers = [...user.signaledUsers, signalUserId];
    await user.save();
    res.send('User signaled');
});

module.exports = router;