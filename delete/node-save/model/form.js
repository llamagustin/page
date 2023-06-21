'use strict'

const { Sequelize, Model, DataTypes } = require("sequelize")



var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})



const defaultValueAddress = {
    city: '',
    line: ''
}



const defaultValueStatus = {
    firstContact: {
        value: false,
        date: new Date()
    },
    paymentMethod: {
        value: false,
        date: new Date()
    },
    createAccount: {
        value: false,
        date: new Date()
    },
    paymentStatus: {
        value: false,
        date: new Date()
    },
}



const Form = sequelize.define("form", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    user_id:{
        type: Sequelize.UUID,
        allowNull: false
    },
    ref: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    issuedDate: {
        type: DataTypes.DATE
    },
    client: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    service: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    total: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
    },
    logo: {
        type: Sequelize.BLOB,
        get() {
            if(this.getDataValue('logo') == null){
                return 'data:image/png;base64,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'
            }else{
                return this.getDataValue('logo').toString('utf8')
            }
            
        }
    },
    balance: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    invoiceStatus: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    address: {
        type: Sequelize.JSONB,
        defaultValue: defaultValueAddress,
        get() {
            if(this.getDataValue('address') == null){
                return defaultValueAddress
            }else{
                return this.getDataValue('address')
            }
        }
    },
    status: {
        type: Sequelize.JSONB,
        defaultValue: defaultValueStatus,
        get() {
            if(this.getDataValue('status') == null){
                return defaultValueStatus
            }else{
                return this.getDataValue('status')
            }
        }
    },
    salesPerson: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    note: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    paymentMethod: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    balance: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
    },
    items: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    paymentDetails: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    dueDate: {
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
    tableName: 'form'
})






module.exports = { Form }