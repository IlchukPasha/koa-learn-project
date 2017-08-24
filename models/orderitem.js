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
          notEmpty: { msg: 'order_id can`t be empty' },
          isOrderExist: async value => {
            let Order = sequelize.models.Order;
            let c = await Order.count({
              where: {
                id: value
              }
            });
            if (c === 0) {
              throw new Error('Order not exist');
            }
          }
        }
      },
      product_packet_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: 'product_packet_id can`t be empty' },
          isPacketExist: async value => {
            let ProductPacket = sequelize.models.ProductPacket;
            let c = await ProductPacket.count({
              where: {
                id: value
              }
            });
            if (c === 0) {
              throw new Error('ProductPacket not exist');
            }
          }
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
