const mongoose = require('mongoose');

const BlockedAccountSchema = new mongoose.Schema({
  blockerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  blockedId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  blockedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BlockedAccount', BlockedAccountSchema);

