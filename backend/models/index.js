const User = require("../models/user");
const Post = require("../models/post");

User.hasMany(Post, { onDelete: "CASCADE", hooks: true });
Post.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Post };