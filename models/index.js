const User = require('./User');
const Post = require('./Post');
const Forum = require('./Forum');
const Subscription = require('./Subscription');

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
    as: 'forums',
    onDelete: 'cascade',
    foreignKey: { name: 'user_id', allowNull: false } 
});
Forum.belongsToMany(User, {
    through: Subscription,
    as: 'forums',
    onDelete: 'cascade',
    foreignKey: { name: 'forum_id', allowNull: false } 
});

module.exports = { User, Post, Forum, Subscription };