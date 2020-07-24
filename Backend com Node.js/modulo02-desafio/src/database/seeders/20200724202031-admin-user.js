'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('users', [{
      name: "Distribuidora FastFeet",
      email: "admin@fastfeet.com",
      password_hash: bcrypt.hashSync("123456", 8),
      created_at: new Date(),
      updated_at: new Date()
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
