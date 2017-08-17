'use strict';
module.exports = function(sequelize, DataTypes) {
  let Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'name can`t be empty' },
          len: { args: [4, 30], msg: 'name length must be in 4-30 symbols' }
        }
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          max: { args: 1000, msg: 'description length must be less then 1000 symbols' }
        }
      },
      parent_id: {
        type: DataTypes.INTEGER(11),
        validate: {
          // перевіряти чи є така батьківська категорія
        }
      }
    },
    {
      classMethods: {
        associate: function(models) {
          Category.hasMany(Product, { as: 'Products' });

          Category.belongsTo(Category, { as: 'Category', foreignKey: 'parent_id', targetKey: 'id' });
          Category.hasMany(Category, { as: 'Categories', foreignKey: 'parent_id', sourceKey: 'id' });
        }
      }
    }
  );
  return Category;
};
