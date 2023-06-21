'use stric'

const { Sequelize, Model, DataTypes } = require("sequelize")

const { uuid } = require('uuidv4');
var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect
})

const GptDataVerify = sequelize.define('gpt_data_verify', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  isApproved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  category: {
    type: Sequelize.JSONB,
    defaultValue: []
  },
  subCategories: {
    type: Sequelize.JSON,
    field: 'sub_categories',
    defaultValue: []
  },
  services: {
    type: Sequelize.JSON,
    defaultValue: []
  },
  title: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  used: {
    type: Sequelize.INTEGER,
  },
  businessId: {
    type: Sequelize.UUID,
    field: 'business_id'
  },
  input: {
    type: Sequelize.TEXT,
  },
  output: {
    type: Sequelize.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  },
}, {
  schema: 'aythen',
  tableName: 'gpt_data_verify'
});

sequelize.sync();

module.exports = { GptDataVerify };
