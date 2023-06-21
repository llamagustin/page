"use strict";

const { Sequelize, Model, DataTypes } = require("sequelize");
const { Account } = require('./account')
var config = require("../config.json");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
     port: config.port,
    dialect: config.dialect,
  }
);



const Call = sequelize.define(
  "call",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      // allowNull: false,
    },
    user_id: {
      type: Sequelize.UUID,
      // unique: true,
      // allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: -3,
    },
    phone: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    calls: {
      type: Sequelize.JSONB,
      defaultValue: [],
    },
    type: {
      type: Sequelize.TEXT,
      defaultValue: "twilio",
    },
    members: {
      type: Sequelize.JSONB,
      defaultValue: {},
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    schema: "aythen",
    tableName: "call",
  }
);

Call.belongsTo(Account, { foreignKey: 'user_id' })

module.exports = { Call };
