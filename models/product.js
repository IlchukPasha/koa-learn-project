'use strict';

module.exports = function(sequelize, DataTypes) {
  let Product = sequelize.define(
    'Product',
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'name can`t be empty' },
          len: { args: [4, 30], msg: 'name length must be in 4-30 symbols' }
        }
      },
      price: {
        type: DataTypes.DECIMAL,
        validate: {
          notEmpty: { msg: 'price can`t be empty' },
          isDecimal: { msg: 'price must be decimal' },
          max: { args: 9999999999, msg: 'max length must be less then 1000000000' }
        }
      },
      category_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: 'category_id can`t be empty' },
          isCategoryExist: async (value, next) => {
            if (value) {
              let Category = sequelize.models.Category;
              let c = await Category.count({
                where: {
                  id: value
                }
              });
              if (c === 0) {
                next('Category not exist');
              } else {
                next();
              }
            } else {
              next('Category is empty');
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
      tableName: 'products'
    }
  );

  Product.associate = models => {
    Product.Category = Product.belongsTo(models.Category, { as: 'category', foreignKey: 'category_id' });
    Product.ProductPacket = Product.hasOne(models.ProductPacket, { as: 'product_packet' });
  };

  return Product;
};
