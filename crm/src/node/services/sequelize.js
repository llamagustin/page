const Sequelize = require("sequelize");
var config = require("../config.json");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

module.exports = sequelize;
