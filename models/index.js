const User = require('./User');
const Post = require('./Posts');

User.hasMany(Post, {
    onDelete: 'cascade', 
    foreignKey: { name: 'user_id', allowNull: false } 
});

Post.belongsTo(User);

module.exports = { User, Post }