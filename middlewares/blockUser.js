const BlockedAccount = require('../models/BlockedAccount');

const blockUser = async (req, res) => {
    const blockerId = req.session.user._id;
    const { blockedId } = req.body;

    try {
        const blockedAccount = new BlockedAccount({ blockerId, blockedId });
        await blockedAccount.save();
        res.status(201).json({ message: 'User blocked successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error blocking user', details: error.message });
    }
};

module.exports = blockUser;
