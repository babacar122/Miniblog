const BlockedAccount = require('../models/BlockedAccount');

const getBlockedUsers = async (req, res) => {
    const { userId } = req.params;

    try {
        const blockedAccounts = await BlockedAccount.find({ blockerId: userId }).populate('blockedId', 'username');
        res.status(200).json(blockedAccounts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching blocked users', details: error.message });
    }
};

module.exports = getBlockedUsers;
