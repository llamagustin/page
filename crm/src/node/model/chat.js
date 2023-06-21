"use strict";

const { Sequelize, Model, DataTypes } = require("sequelize");
const { User } = require('./user.js')
var config = require("../config.json");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
  }
);

const Chat = sequelize.define("chat",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.UUID,
      unique: true,
      allowNull: false,
    },
    unseenMsgs: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    phone: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    messages: {
      type: Sequelize.JSONB,
      defaultValue: [],
    },
    type: {
      type: Sequelize.TEXT,
      defaultValue: "reseller",
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
  }, {
    schema: "aythen",
    tableName: "chat",
  }
);

Chat.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  as: 'user'
});

module.exports = { Chat };
