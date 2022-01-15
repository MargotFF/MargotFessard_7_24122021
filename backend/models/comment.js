const Sequelize = require('sequelize');
const sequelize = require('../database/mysql');
const User = require("../models/user");
const Post = require("../models/post");

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: User.id
    }
  },
  postId: {
    type: Sequelize.INTEGER,
    references: {
      model: Post,
      key: Post.id
    }
  }
});

module.exports = Comment;
