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
      }
    },
    {
      classMethods: {
        associate: function(models) {
          OrderItem.belongsTo(Order, { as: 'Order' });

          OrderItem.belongsTo(ProductPacket, { as: 'ProductPacket' });
        }
      }
    }
  );
  return OrderItem;
};
