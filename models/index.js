const User = require('./User');
const Post = require('./Posts');
const Forum = require('./Forum');
const Subscription = require('./Subscription');
const Comment = require('./Comment');

User.hasMany(Post, {
    onDelete: 'cascade', 
    foreignKey: { name: 'user_id', allowNull: false } 
});
Post.belongsTo(User, {
    onDelete: 'cascade', 
    foreignKey: { name: 'user_id', allowNull: false } 
});

Forum.hasMany(Post, {
    onDelete: 'cascade', 
    foreignKey: { name: 'forum_id', allowNull: false } 
});
Post.belongsTo(Forum, {
    onDelete: 'cascade', 
    foreignKey: { name: 'forum_id', allowNull: false } 
});

User.hasMany(Subscription, {
    onDelete: 'cascade', 
    foreignKey: { name: 'user_id', allowNull: false } 
});
Subscription.belongsTo(User, {
    onDelete: 'cascade', 
    foreignKey: { name: 'user_id', allowNull: false } 
});

Forum.hasMany(Subscription, {
    onDelete: 'cascade', 
    foreignKey: { name: 'forum_id', allowNull: false } 
});
Subscription.belongsTo(Forum, {
    onDelete: 'cascade', 
    foreignKey: { name: 'forum_id', allowNull: false } 
});

User.belongsToMany(Forum, {
    through: Subscription,
    as: 'user',
    onDelete: 'cascade',
    foreignKey: { name: 'user_id', allowNull: false } 
});
Forum.belongsToMany(User, {
    through: Subscription,
    as: 'forum',
    onDelete: 'cascade',
    foreignKey: { name: 'forum_id', allowNull: false } 
});

Comment.belongsTo(User, {
    onDelete: 'cascade', 
    foreignKey: { name: 'user_id', allowNull: false } 
});
  
Comment.belongsTo(Post, {
    onDelete: 'cascade', 
    foreignKey: { name: 'post_id', allowNull: false } 
});
  
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
  
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Forum, Subscription, Comment };