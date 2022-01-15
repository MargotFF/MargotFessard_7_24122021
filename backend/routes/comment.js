const express = require('express');

const commentController = require('../controllers/comment');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:postId', auth, commentController.getAllComments);
router.post('/', auth, commentController.createComment);
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;