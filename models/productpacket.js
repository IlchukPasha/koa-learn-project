'use strict';
module.exports = function(sequelize, DataTypes) {
  let ProductPacket = sequelize.define(
    'ProductPacket',
    {
      product_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: 'product_id can`t be empty' }
          // перевіряти чи є такий продукт
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: 'quantity can`t be empty' }
        }
      }
    },
    {
      classMethods: {
        associate: function(models) {
          ProductPacket.hasOne(OrderItem, { as: 'OrderItem' });

          ProductPacket.belongsTo(Product, { as: 'Product' });
        }
      }
    }
  );
  return ProductPacket;
};
