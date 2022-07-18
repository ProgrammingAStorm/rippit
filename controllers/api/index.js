const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const forumRoutes = require('./forum-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/forums', forumRoutes);
router.use('/comments', commentRoutes);

module.exports = router;