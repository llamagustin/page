'use strict'

const { Sequelize, Model, DataTypes } = require("sequelize")



var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})


const API = sequelize.define("api", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    title: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    subtitle: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    brand: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    price: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
    },
    image: {
        type: Sequelize.BLOB
    },
    rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
},{
    schema: 'aythen',
    tableName: 'api'
})






module.exports = { API }