'use stric'


const { Sequelize, Model, DataTypes, Op } = require("sequelize")


var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})



const Faq = sequelize.define("faq_data", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    data: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
},{
    schema: 'aythen',
    tableName: 'faq_data'
})






module.exports = { Faq }