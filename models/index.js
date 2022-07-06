const User = require('./User');
const Post = require('./Posts');
const Forum = require('./Forum');
const Subscription = require('./Subscription');

User.hasMany(Post, {
    onDelete: 'cascade', 
    foreignKey: { name: 'user_id', allowNull: false } 
});
Post.belongsTo(User);

Forum.hasMany(Post, {
    onDelete: 'cascade', 
    foreignKey: { name: 'forum_id', allowNull: false } 
});
Post.belongsTo(Forum);

User.hasMany(Subscription, {
    onDelete: 'cascade', 
    foreignKey: { name: 'user_id', allowNull: false } 
});
Subscription.belongsTo(User);

Forum.hasMany(Subscription, {
    onDelete: 'cascade', 
    foreignKey: { name: 'forum_id', allowNull: false } 
});
Subscription.belongsTo(Forum);

User.belongsToMany(Forum, {
    through: Subscription,
    as: 'user',
    foreignKey: 'user_id'
});
Forum.belongsToMany(User, {
    through: Subscription,
    as: 'forum',
    foreignKey: 'forum_id'
});

module.exports = { User, Post, Forum, Subscription };