const { User } = require('../models');

const userData = [
    {
        id: '1',
        username: 'DakotahU',
        password: 'Dakotah12',
        email: 'dulrath12@gmail.com'
    },
    {
        username: 'Big-Johny',
        password: 'very-secure43',
        email: 'emai@email.com'
    },
    {
        username: 'Big-Johny',
        password: 'very-secure43',
        email: 'emal@email.com'
    },
    {
        username: 'Big-Johny',
        password: 'very-secure43',
        email: 'emil@email.com'
    },
    {
        username: 'Big-Johny',
        password: 'very-secure43',
        email: 'eail@email.com'
    },
    {
        username: 'Big-Johny',
        password: 'very-secure43',
        email: 'mail@email.com'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;