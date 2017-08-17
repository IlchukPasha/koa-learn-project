'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable('Orders', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        total_price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0.0
        },
        user_id: {
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
        return queryInterface.addConstraint('Orders', ['user_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'Users',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Orders');
  }
};
