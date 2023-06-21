'use stric'
const { Sequelize, Model, DataTypes, Op } = require("sequelize")
var config = require('../config.json')
const { Account } = require('./account.js');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect
})


const Task = sequelize.define("task", {
    offer_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    description: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    isImportant: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    data: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    user_data: {
        type: Sequelize.JSONB,
        defaultValue: {
            avatar: '',
            fullName: '',
        }
    },
    hourlyrate: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    weeklimit: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    picked: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    selectedcurrency: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    tarifa: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    schema: 'aythen',
    tableName: 'task',
});

Task.belongsTo(Account, { foreignKey: 'user_id' });

module.exports = { Task }