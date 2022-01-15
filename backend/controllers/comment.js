const { User, Comment } = require('../models/index');
const { getUserDecodedToken } = require('../utils/index');

exports.getAllComments = (req, res, next) => {
  Comment.findAll({
    where: { postId: req.params.postId },
    include: [{
      model: User,
      attributes: ['id', 'userName', 'avatar']
    }],
    order: [['createdAt', 'ASC']]
  })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) => {
  const userId = getUserDecodedToken(req);
    Comment.create({
      content: req.body.content,
      userId: userId,
      postId: req.body.postId
    })
      .then(() => res.status(201).json({ message: 'Comment created successfully !'}))
      .catch(error => res.status(400).json({ error }));
};
  
exports.deleteComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then(() => {
      Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Comment deleted successfully !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
