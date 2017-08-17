'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable('ProductPackets', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
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
        return queryInterface.addConstraint('ProductPackets', ['product_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'Products',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('ProductPackets');
  }
};
