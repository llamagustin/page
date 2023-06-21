"use strict";

const { Sequelize, Model, DataTypes } = require("sequelize");

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


const Alert = sequelize.define("alert", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.UUID,
      // allowNull: false
    },
    seen: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    title: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    description: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    href: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    type: {
      type: Sequelize.TEXT,
      defaultValue: "",
    },
    member: {
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
    tableName: "alert",
  }
);

module.exports = { Alert };
