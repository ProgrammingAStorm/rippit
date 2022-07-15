const { Post } = require('../models');

const postData = [
    {
        title: 'Title',
        description: 'Test',
        user_id: 1,
        forum_id: 1
    },
    {
        title: 'Title2',
        description: 'Test2',
        user_id: 2,
        forum_id: 2,
        post_id: 2
    },
    {
        title: 'Title',
        description: 'Test',
        user_id: 3,
        forum_id: 3,
        post_id: 3
    },
    {
        title: 'Title',
        description: 'Test',
        user_id: 4,
        forum_id: 4,
        post_id: 4
    },
    {
        title: 'Title',
        description: 'Test',
        user_id: 5,
        forum_id: 5
    },
    {
        title: 'Title',
        description: 'Test',
        user_id: 6,
        forum_id: 6
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;