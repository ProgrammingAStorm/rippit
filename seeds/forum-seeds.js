const { Forum } = require('../models');

const forumData = [
    {
        id: 1,
        title: 'Forum',
        description: 'this is a description'
    },
    {
        id: 2,
        title: 'asdfasdf',
        description: 'this is a description'
    },
    {
        id: 3,
        title: 'another',
        description: 'this is a description'
    },
    {
        title: 'Forum',
        description: 'this is a description'
    },
    {
        title: 'Forum',
        description: 'this is a description'
    },
    {
        title: 'Forum',
        description: 'this is a description'
    }
];

const seedForums = () => Forum.bulkCreate(forumData);

module.exports = seedForums;