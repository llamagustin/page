'use stric'


const { Sequelize, Model, DataTypes, Op } = require("sequelize")


var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})




const Business = sequelize.define("business", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
    mcc: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    plan: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    category: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    tags: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    title: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    nif: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    about: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    web: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    email: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    works: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    country: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    language: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    address: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
},{
    schema: 'aythen',
    tableName: 'business'
})






module.exports = { Business }