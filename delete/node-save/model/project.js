'use strict'

const { Sequelize, Model, DataTypes } = require("sequelize")

var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})




const Project = sequelize.define("task", {
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
    title: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    dueDate: {
        type: DataTypes.DATE
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    data: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    assignee: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    tags: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    isImportant: {
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
    tableName: 'project'
})



const Task = sequelize.define("task", {
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
    title: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    dueDate: {
        type: DataTypes.DATE
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    data: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    assignee: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    tags: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    isImportant: {
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
    tableName: 'task'
})






module.exports = { Project, Task }