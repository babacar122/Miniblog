const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        username: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        blockedUsers: { type: DataTypes.JSON, defaultValue: [] },
        signaledUsers: { type: DataTypes.JSON, defaultValue: [] }
    });

    return User;
};