const { Subscription } = require('../models');

const subscriptionData = [
    {
        user_id: 1,
        forum_id: 1
    },
    {
        user_id: 2,
        forum_id: 2
    },
    {
        user_id: 3,
        forum_id: 3
    },
    {
        user_id: 4,
        forum_id: 4
    },
    {
        user_id: 5,
        forum_id: 5
    },
    {
        user_id: 6,
        forum_id: 6
    },
];

const seedSubscriptions = () => Subscription.bulkCreate(subscriptionData);

module.exports = seedSubscriptions;