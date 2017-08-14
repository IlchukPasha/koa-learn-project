'use strict';

let fs        = require('fs');
let path      = require('path');
let Sequelize = require('sequelize');
let basename  = path.basename(module.filename);
let env       = process.env.NODE_ENV || 'development';
let db_config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
let db        = {};

let sequelize = null;

if (db_config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(db_config.database, db_config.username, db_config.password, db_config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
