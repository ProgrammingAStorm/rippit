const sequelize = require('../config/connection');
const seedUsers = require('./user-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
  
    await seedUsers();
    console.log('\n----- SEEDED USERS -----\n');

    process.exit(0);
};

seedAll()