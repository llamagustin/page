'use strict'

const { Sequelize, Model, DataTypes } = require("sequelize")

var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})

const Email = sequelize.define("email", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    google_id: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    user_id: {
        type: Sequelize.UUID
    },
    from: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    to: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    subject: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    cc: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    bcc: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    message: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    attachments: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    isStarred: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    labels: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    time: {
        type: DataTypes.DATE
    },
    replies: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    folder: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    isRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
},{
    schema: 'aythen',
    tableName: 'email'
})






module.exports = { Email }