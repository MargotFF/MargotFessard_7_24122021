const Sequelize = require('sequelize');
const sequelize = require('../database/mysql');
const User = require("../models/user");

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: true
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: User.id
    }
  }
});

// Post.associate = function(models) {
//   Post.belongsTo(models.User, {
//     foreignKey: 'userId',
//   })
// };

module.exports = Post;
