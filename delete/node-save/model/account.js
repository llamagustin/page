'use stric'


const { Sequelize, Model, DataTypes, Op } = require("sequelize")



var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})


var {Password} = require('./user.js')


const Account = sequelize.define("account", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    fullName: {
        type: Sequelize.TEXT,
        defaultValue: ''
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
    username: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    country: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    email: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    phone: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    status: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    role: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    bio: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    social: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    notification: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    birthDate: {
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
            password: options.password
          });
       }
    }
})






module.exports = { Account }