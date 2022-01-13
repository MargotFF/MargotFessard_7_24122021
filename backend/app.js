const express = require('express');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config({ path: './.env' });

const sequelize = require('./database/mysql');
const User = require('./models/user');
sequelize.sync();

const userRoutes = require('./routes/user');

const app = express();

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);

module.exports = app;
