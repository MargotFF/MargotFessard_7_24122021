const express = require('express');

const postController = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();

router.get('/', auth, postController.getAllPosts);
router.get('/:id', auth, postController.getOnePost);
router.post('/', auth, multer, postController.createPost);
router.put('/:id', auth, multer, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;
