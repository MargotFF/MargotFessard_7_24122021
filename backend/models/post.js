const Sequelize = require('sequelize');
const sequelize = require('../database/mysql');

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    references: {
      model: 'User',
      key: 'id'
    }
  }
})

Post.associate = function(models) {
  Post.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE'
  })
}

module.exports = Post;
