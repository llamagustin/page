'use stric'
const { Sequelize, DataTypes } = require("sequelize");
const config = require('../config.json');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
    port: config.port,
  dialect: config.dialect
})



 
const Tool = sequelize.define("tool", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    to: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    toPDF: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    icon: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    iconColor: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    tag: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    title: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    subtitle: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    image: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    resume: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    cost: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    features: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    allBenefits: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    relationBenefits: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    boe: {
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
    timestamps: false,
    schema: 'aythen',
    tableName: 'tool',
    // freezeTableName: true
})

module.exports = { Tool }