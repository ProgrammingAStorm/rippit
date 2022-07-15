const { Forum } = require('../models');

const forumData = [
    {
        id: 1,
        title: 'Forum'
    },
    {
        id: 2,
        title: 'asdfasdf'
    },
    {
        id: 3,
        title: 'another'
    },
    {
        title: 'Forum'
    },
    {
        title: 'Forum'
    },
    {
        title: 'Forum'
    }
];

const seedForums = () => Forum.bulkCreate(forumData);

module.exports = seedForums;