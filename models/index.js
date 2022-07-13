const User = require("./User");
const Post = require("./Post");
const Forum = require('./Forum')
const Subscription = require("./Subscription");
const Comment = require("./Comment");
const Vote = require("./Vote");

User.hasMany(Post, {
  onDelete: "cascade",
  foreignKey: { name: "user_id", allowNull: false },
});
Post.belongsTo(User, {
  onDelete: "cascade",
  foreignKey: { name: "user_id", allowNull: false },
});

Forum.hasMany(Post, {
  onDelete: "cascade",
  foreignKey: { name: "forum_id", allowNull: false },
});
Post.belongsTo(Forum, {
  onDelete: "cascade",
  foreignKey: { name: "forum_id", allowNull: false },
});

User.hasMany(Subscription, {
  onDelete: "cascade",
  foreignKey: { name: "user_id", allowNull: false },
});
Subscription.belongsTo(User, {
  onDelete: "cascade",
  foreignKey: { name: "user_id", allowNull: false },
});

Forum.hasMany(Subscription, {
  onDelete: "cascade",
  foreignKey: { name: "forum_id", allowNull: false },
});
Subscription.belongsTo(Forum, {
  onDelete: "cascade",
  foreignKey: { name: "forum_id", allowNull: false },
});
User.belongsToMany(Forum, {
  through: Subscription,
  as: "forums",
  onDelete: "cascade",
  foreignKey: { name: "user_id", allowNull: false },
});
Forum.belongsToMany(User, {
  as: "forums",
  onDelete: "cascade",
  foreignKey: { name: "forum_id", allowNull: false },
});

Comment.belongsTo(User, {
  onDelete: "cascade",
  foreignKey: { name: "user_id", allowNull: false },
});
Comment.belongsTo(Post, {
  onDelete: "cascade",
  foreignKey: { name: "post_id", allowNull: false },
});
User.hasMany(Comment, {
  onDelete: "cascade",
  foreignKey: { name: "user_id", allowNull: false },
});
Post.hasMany(Comment, {
  onDelete: "cascade",
  foreignKey: { name: "post_id", allowNull: false },
});

Vote.belongsTo(User, {
  onDelete: "cascade",
  foreignKey: { name: "user_id", allowNull: false },
});
Vote.belongsTo(Post, {
  onDelete: "cascade",
  foreignKey: { name: "post_id", allowNull: false },
});
User.hasMany(Vote, {
  onDelete: "cascade",
  foreignKey: { name: "user_id", allowNull: false },
});
Post.hasMany(Vote, {
  onDelete: "cascade",
  foreignKey: { name: "post_id", allowNull: false },
});

User.belongsToMany(Post, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "user_id",
});
Post.belongsToMany(User, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "post_id",
});

module.exports = { User, Post, Forum, Subscription, Comment, Vote };
