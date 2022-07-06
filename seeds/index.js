const sequelize = require('../config/connection');

const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds')

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
  
    await seedUsers();
    console.log('\n----- SEEDED USERS -----\n');
    
    await seedPosts();
    console.log('\n----- SEEDED POSTS -----\n');

    process.exit(0);
};

seedAll()