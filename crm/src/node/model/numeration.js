'use stric'
const { Sequelize, DataTypes } = require("sequelize");
const config = require('../config.json');
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
   port: config.port,
  dialect: config.dialect
})
const NUMERATION_TABLE = 'numerations';

const Numerations = sequelize.define(NUMERATION_TABLE, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    model: {
        type: Sequelize.TEXT
    },
    prefix: {
        type: Sequelize.TEXT
    },
    digits: {
        type: DataTypes.INTEGER
    },
    numeration: {
        type: DataTypes.INTEGER
    },
    code: {
        type: Sequelize.TEXT
    },
},{
    timestamps: false,
    schema: 'aythen'
})

module.exports = { Numerations }