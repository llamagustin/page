'use stric'

const { Sequelize, Model, DataTypes, Op } = require("sequelize")
// const { Calendar } = require('./calendar')

const { uuid } = require('uuidv4');
var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect
})





              

const Ad = sequelize.define("ads", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    auditor: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    propietary: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    company: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    path: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    web: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    cif: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    phone: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    email: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    otorgate: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    tools: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    name: {
        type: Sequelize.JSONB,
        defaultValue: {
            name: '',
            firstSurname: '',
            secondSurname: ''
        }
    },
    address: {
        type: Sequelize.JSONB,
        defaultValue: {
            country: '',
            province: '',
            city: '',
            line: '',
            latitude: '',
            longitude: ''
        }
    },
    entity: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    cnae: {
        type: Sequelize.INTEGER,
        defaultValue: null
    },
    social: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    budget: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    google: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    note: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 400
    },
    emails_sent: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    avatar: {
        type: Sequelize.BLOB,
        get() {
            if(this.getDataValue('avatar') == null){
                return null
            }else{
                return this.getDataValue('avatar').toString('utf8')
            }
            
        }
    },
    abilities: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    constitutionAt: {
      type: DataTypes.DATE,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
},{
    schema: 'aythen',
    tableName: 'ads'
})


// sequelize.sync()
//   .then(() => console.log('Tabla creada con éxito'))
//   .catch(error => console.error('Error al crear la tabla:', error));


module.exports = { Ad}
