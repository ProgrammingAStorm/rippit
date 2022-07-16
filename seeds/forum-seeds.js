const { Forum } = require('../models');

const forumData = [
    {
        title: 'Forum',
        description: 'description'
    },
    {
        title: 'asdfasdf',
        description: 'description'
    },
    {
        title: 'another',
        description: 'description'
    },
    {
        title: 'Forum',
        description: 'description'
    },
    {
        title: 'Forum',
        description: 'description'
    },
    {
        title: 'Forum',
        description: 'description'
    }
];

const seedForums = () => Forum.bulkCreate(forumData);

module.exports = seedForums;