const { Comment } = require('../models');

const commentData = [
    {
        content: "This is a pretty short comment.",
        user_id: 1,
        post_id: 1
    },
    {
        content: "This is a pretty short comment.",
        user_id: 2,
        post_id: 2
    },
    {
        content: "This is a pretty short comment.",
        user_id: 3,
        post_id: 3
    },
    {
        content: "This is a pretty short comment.",
        user_id: 4,
        post_id: 4
    },
    {
        content: "This is a pretty short comment.",
        user_id: 5,
        post_id: 5
    },
    {
        content: "This is a pretty short comment.",
        user_id: 6,
        post_id: 6
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;