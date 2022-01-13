const fs = require('fs');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: './.env' });

const Post = require('../models/post');

exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    order: [[
      'createdAt', 'DESC'
    ]]
  })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ message: error.message }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ message: error.message }));
};

exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  Post.create({
    message: req.body.message,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    userId: userId
  })
    .then(() => res.status(201).json({ message: 'Post created successfully !'}))
    .catch(error => res.status(400).json({ message: error.message }));
};

exports.updatePost = (req, res, next) => {
  const postObject = req.file ?
    {
      message: JSON.parse(req.body.message),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Post.update({ ...postObject }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Post updated successfully !'}))
    .catch(error => res.status(400).json({ message: error.message }));
};
  
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'Post deleted successfully !'}))
          .catch(error => res.status(400).json({ message: error.message }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
