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
    },
    {
        title: 'THree',
        description: '{"objects":[{"name":"physical cone 123","color":{"red":"123","green":"123","blue":"123"},"geo":"cone","mat":"physical","pos":{"x":"1","y":"1","z":"1"},"rot":{"x":"-1","y":"0.5","z":"-1"},"height":"1","radius":"3"}],"lights":[{"name":"Light 123","color":{"red":"255","green":"76","blue":"123"},"position":{"x":0,"y":0,"z":0}}]}',
        user_id: 6,
        forum_id: 6
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;