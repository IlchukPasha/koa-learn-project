'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable(
        'order_items',
        {
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
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
          }
        },
        { charset: 'utf8', timestamps: true, underscored: true }
      )
      .then(() => {
        return queryInterface.addConstraint('order_items', ['order_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'orders',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      })
      .then(() => {
        return queryInterface.addConstraint('order_items', ['product_packet_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'product_packets',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('order_items');
  }
};
