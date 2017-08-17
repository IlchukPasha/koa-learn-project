'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable('OrderItems', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        order_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        product_packet_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        packet_price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0.0
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
        return queryInterface.addConstraint('OrderItems', ['order_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'Orders',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      })
      .then(() => {
        return queryInterface.addConstraint('OrderItems', ['product_packet_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'ProductPackets',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('OrderItems');
  }
};
