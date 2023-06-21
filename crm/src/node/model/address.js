'use stric'


const { Sequelize, Model, DataTypes, Op } = require("sequelize")



var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
   port: config.port,
  dialect: config.dialect
})


const Province = sequelize.define("data_provinces", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false 
    },
    value:{
        type: Sequelize.TEXT,
        allowNull: false 
    }
},{
    schema: 'aythen',
    tableName: 'data_provinces',
    timestamps: false,
})


const City = sequelize.define("data_cities", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false 
    },
    value:{
        type: Sequelize.TEXT,
        allowNull: false 
    }
},{
    schema: 'aythen',
    tableName: 'data_cities',
    timestamps: false
})


const Code = sequelize.define("data_codes", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    codigo_postal: {
        type: Sequelize.TEXT
    },
    municipio_id: {
        type: Sequelize.TEXT
    },
    municipio_nombre:{
        type: Sequelize.TEXT
    }
},{
    schema: 'aythen',
    tableName: 'data_codes',
    timestamps: false
})



module.exports = { Province, City, Code }