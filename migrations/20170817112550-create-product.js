'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable('Products', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0.0
        },
        category_id: {
          type: Sequelize.INTEGER,
          allowNull: false
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
        return queryInterface.addConstraint('Products', ['category_id'], {
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
    return queryInterface.dropTable('Products');
  }
};
