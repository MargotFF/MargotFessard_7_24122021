const Sequelize = require('sequelize');
const sequelize = require('../database/mysql');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  jobTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: true, 
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

User.associate = function(models) {
  User.hasMany(models.Post, {
    foreignKey: 'userId',
    as: 'posts'
  })
}

module.exports = User;
