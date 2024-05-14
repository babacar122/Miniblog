const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Post = sequelize.define('Post', {
        content: { type: DataTypes.STRING, allowNull: false },
        likes: { type: DataTypes.JSON, defaultValue: [] },
        comments: { type: DataTypes.JSON, defaultValue: [] }
    });

    return Post;
};