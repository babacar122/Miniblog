const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('miniblog', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = require('./User')(sequelize);
const Post = require('./Post')(sequelize);

User.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(User, { foreignKey: 'authorId' });

module.exports = { sequelize, User, Post };