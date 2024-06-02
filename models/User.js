const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    blockedUsers: { 
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'User', 
        default: [] 
    },
    signaledUsers: { 
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'User', 
        default: [] 
    }
});

module.exports = mongoose.model('User', UserSchema);
