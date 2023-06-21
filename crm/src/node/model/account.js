'use stric'
const { Sequelize, Model, DataTypes, Op } = require("sequelize")
var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect
})

var { Password } = require('./user.js')

const Account = sequelize.define("account", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    source: {
        type: Sequelize.TEXT,
        defaultValue: 'funnel-reseller'
    },
    email: {
        type: Sequelize.TEXT,
        unique: true
    },
    fullName: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    carddetails:{
        type: Sequelize.JSONB,
        defaultValue:[]
    },
    password_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
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
    zone: {
        type: Sequelize.JSONB,
        defaultValue: []
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
    category: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    role: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    languaje: {
        type: Sequelize.TEXT,
        defaultValue: 'español'
    },
    phone: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    note: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    rating: {
        type: Sequelize.INTEGER,
        defaultValue: -3
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 400
    },
    steps: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    abilities: {
        type: Sequelize.JSONB,
        defaultValue: {
            action: 'block'
        }
    },
    notification: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    info: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    addressbilling: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    devices: {
        type: Sequelize.JSONB,
        defaultValue: [],
    },
    experience: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    academyQuestions: {
        type: Sequelize.JSONB,
        defaultValue: {},
    },
    academyCompletedAt: {
        type: DataTypes.DATE
    },
    infoAt: {
        type: DataTypes.DATE
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
},{
    schema: 'aythen',
    tableName: 'account',
    hooks: {
       async afterCreate(account, options) {
          await Password.create({
            id: account.password_id,
            data: options.password
          });
       },
       
       async afterDestroy(account, options) {
          await Password.destroy({
            id: account.password_id
          });
       }
    }
})

module.exports = { Account }