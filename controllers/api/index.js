const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const forumRoutes = require('./forum-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/forums', forumRoutes);

module.exports = router;