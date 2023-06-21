'use strict'

const { Sequelize, Model, DataTypes } = require("sequelize")

var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})


/*
id uuid
url text
title
start
end
allDay
extendedProps {}
*/


const Calendar = sequelize.define("calendar", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    data: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
},{
    schema: 'aythen',
    tableName: 'calendar'
})






module.exports = { Calendar }