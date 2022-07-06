const { Forum } = require('../models');

const forumData = [
    {
        title: 'Forum'
    },
    {
        title: 'Forum'
    },
    {
        title: 'Forum'
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