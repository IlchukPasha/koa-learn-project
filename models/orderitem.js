'use strict';
module.exports = function(sequelize, DataTypes) {
  let OrderItem = sequelize.define(
    'OrderItem',
    {
      packet_price: {
        type: DataTypes.DECIMAL,
        validate: {
          notEmpty: { msg: 'packet_price can`t be empty' },
          max: { args: 9999999999, msg: 'max length must be less then 1000000000' }
        }
      },
      order_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: 'order_id can`t be empty' }
          // перевірить чи є
        }
      },
      product_packet_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: 'product_packet_id can`t be empty' }
          // перевірить чи є
        }
      },
      created_at: {
        type: DataTypes.DATE
      },
      updated_at: {
        type: DataTypes.DATE
      }
    },
    {
      underscored: true,
      tableName: 'order_items'
    }
  );

  OrderItem.associate = models => {
    OrderItem.belongsTo(models.ProductPacket, { as: 'product_packet', foreignKey: 'product_packet_id' });
    OrderItem.belongsTo(models.Order, { as: 'order', foreignKey: 'order_id' });
  };

  return OrderItem;
};
