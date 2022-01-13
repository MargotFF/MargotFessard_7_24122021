const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '../.env'});

function getUserDecodedToken(req) {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  return userId;
}

module.exports = { getUserDecodedToken };
