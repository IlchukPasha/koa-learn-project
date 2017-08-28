'use strict';

let bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);

module.exports = {
  up: function(queryInterface, Sequelize) {
    return [
      queryInterface.bulkInsert('users', [
        {
          id: 1,
          email: 'firstemail@email.com',
          password: bcrypt.hashSync('password', salt),
          first_name: 'some first name',
          last_name: 'some last name',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          email: 'secondemail@email.com',
          password: bcrypt.hashSync('password', salt),
          first_name: 'some first name',
          last_name: 'some last name',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 3,
          email: 'thirdemail@email.com',
          password: bcrypt.hashSync('password', salt),
          first_name: 'some first name',
          last_name: 'some last name',
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    ];
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users');
  }
};
