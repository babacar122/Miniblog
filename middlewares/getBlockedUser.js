const db = require('../config/db');

const getBlockedUsers = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const [blockedUsers] = await db.query('SELECT * FROM blocked_accounts WHERE blocker_id = ?', [userId]);

        req.blockedUsers = blockedUsers;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getBlockedUsers;
