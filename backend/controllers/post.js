const fs = require('fs');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: './.env' });

const Post = require('../models/post');
const { User } = require('../models/index');
const { getUserDecodedToken } = require('../middleware/utils');

exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    include: [{
      model: User,
      attributes: ['userName', 'avatar']
    }],
    order: [['createdAt', 'DESC']]
  })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ message: error.message }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ 
    where: { id: req.params.id },
    include: [{
      model: User,
      attributes: ['userName', 'avatar']
    }]
  })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ message: error.message }));
};

exports.createPost = (req, res, next) => {
  const userId = getUserDecodedToken(req);
  console.log(userId);

  if (req.file) {
    Post.create({
      message: req.body.message,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      userId: userId,
    })
      .then(() => res.status(201).json({ message: 'Post created successfully !'}))
      .catch(error => res.status(400).json({ message: error.message }));
  } else {
    Post.create({
      message: req.body.message,
      imageUrl: '',
      userId: userId
    })
      .then(() => res.status(201).json({ message: 'Post created successfully !'}))
      .catch(error => res.status(400).json({ message: error.message }));
  }
};

exports.updatePost = (req, res, next) => {
  const postObject = req.file ?
    {
      message: req.body.message,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Post.update({ ...postObject }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Post updated successfully !'}))
    .catch(error => res.status(400).json({ message: error.message }));
};
  
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      if (post.imageUrl != null) {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Post deleted successfully !'}))
            .catch(error => res.status(400).json({ message: error.message }));
        })
      } else {
        Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'Post deleted successfully !'}))
          .catch(error => res.status(400).json({ message: error.message }));
      }
    })
    .catch(error => res.status(500).json({ message: error.message }));
};
