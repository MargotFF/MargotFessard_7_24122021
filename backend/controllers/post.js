const fs = require('fs');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');

const Post = require('../models/post');
const { User, Comment } = require('../models/index');
const { getUserDecodedToken } = require('../utils/index');

exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    attributes: ['id', 'message', 'imageUrl', 'createdAt', 'updatedAt', [sequelize.fn('COUNT', sequelize.col('comments.id')), 'countComments']],
    include: [{
      model: User,
      attributes: ['id', 'userName', 'avatar']
    },
    {
      model: Comment,
      attributes: []
    }],
    order: [['createdAt', 'DESC']],
    group: ['id']
  })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(404).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ 
    where: { id: req.params.id },
    include: [{
      model: User,
      attributes: ['id', 'userName', 'avatar']
    }]
  })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};

exports.createPost = (req, res, next) => {
  const userId = getUserDecodedToken(req);

  if (req.file) {
    Post.create({
      message: req.body.message,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      userId: userId,
    })
      .then(() => res.status(201).json({ message: 'Post created successfully !'}))
      .catch(error => res.status(400).json({ error }));
  } else {
    Post.create({
      message: req.body.message,
      userId: userId
    })
      .then(() => res.status(201).json({ message: 'Post created successfully !'}))
      .catch(error => res.status(400).json({ error }));
  }
};

exports.updatePost = (req, res, next) => {
  const postObject = req.file ? {
      message: req.body.message,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { message: req.body.message };
  Post.update({ ...postObject }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Post updated successfully !'}))
    .catch(error => res.status(400).json({ error }));
};
  
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      if (post.imageUrl != null) {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Post deleted successfully !'}))
            .catch(error => res.status(400).json({ error }));
        })
      } else {
        Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'Post deleted successfully !'}))
          .catch(error => res.status(400).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
};
