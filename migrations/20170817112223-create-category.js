'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable('Categories', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
        },
        parent_id: {
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        return queryInterface.addIndex('Categories', ['parent_id']);
      })
      .then(() => {
        return queryInterface.addConstraint('Categories', ['parent_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'Categories',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Categories');
  }
};
