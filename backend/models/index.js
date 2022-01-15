const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

User.hasMany(Post, { onDelete: "CASCADE" });

Post.belongsTo(User, { foreignKey: "userId" });
Post.hasMany(Comment, { onDelete: "CASCADE" });

Comment.belongsTo(User, { foreignKey: "userId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

module.exports = { User, Post, Comment };