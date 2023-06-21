'use strict'
const { Sequelize, Model, DataTypes } = require("sequelize")
const { User } = require('./user')

var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
   port: config.port,
  dialect: config.dialect
})


const Calendar = sequelize.define("calendar", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
    },
    lead_id: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
    },
    start: {
        type: DataTypes.DATE
    },
    end: {
         type: DataTypes.DATE
    },
    allDay: {
         type: DataTypes.BOOLEAN,
         defaultValue: false
    },
    extendedProps: {
         type: DataTypes.JSONB,
         defaultValue: {
             calendar: 'Holiday',
         }
    },
    priority: {
        type: DataTypes.TEXT,
        defaultValue: 'medium'
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

Calendar.belongsTo(User, {
  foreignKey: {
    name: 'lead_id'
  },
})

User.belongsTo(Calendar, {
    foreignKey: {
    name: 'id'
  }
});


module.exports = { Calendar }