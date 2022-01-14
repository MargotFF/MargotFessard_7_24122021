const { getUserDecodedToken } = require('./utils');

module.exports = (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(' ')[1];
    // const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    // const userId = decodedToken.userId;
    const userId = getUserDecodedToken(req);
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user Id !';
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({ message: "This user is not authenticated !" });
  }
};
