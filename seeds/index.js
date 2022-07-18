const sequelize = require('../config/connection');

const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedForums = require('./forum-seeds');
const seedSubscriptions = require('./subscription-seeds');
const seedComments = require('./comment-seeds');
const seedVotes = require('./vote-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
  
    await seedUsers();
    console.log('\n----- SEEDED USERS -----\n');
    
    await seedForums();
    console.log('\n----- SEEDED FORUMS -----\n');

    await seedPosts();
    console.log('\n----- SEEDED POSTS -----\n');

    await seedVotes();
    console.log('\n----- SEEDED VOTES -----\n');

    await seedComments();
    console.log('\n----- SEEDED COMMENTS -----\n');
    
    await seedSubscriptions();
    console.log('\n----- SEEDED SUBSCRIPTIONS -----\n');

    process.exit(0);
};

seedAll()