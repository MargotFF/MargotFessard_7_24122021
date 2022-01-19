const { getUserDecodedToken } = require('../utils/index');

module.exports = (req, res, next) => {
  try {
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
