'use strict';

const models = require('./../models');

module.exports = {
  up: function(queryInterface, Sequelize) {
    return models.Category.sync().then(() => {
      models.Category.create({
        id: 1,
        name: 'Start category',
        description: 'Description of start category',
        created_at: new Date(),
        updated_at: new Date()
      });
      models.Category.create({
        id: 2,
        name: 'Start category 2',
        description: 'Description of start category',
        created_at: new Date(),
        updated_at: new Date()
      });
    });
  },

  down: function(queryInterface, Sequelize) {
    return models.Category.sync().then(() => {
      models.Category.destroy({
        where: {
          id: 1
        }
      });
      models.Category.destroy({
        where: {
          id: 2
        }
      });
    });
  }
};
