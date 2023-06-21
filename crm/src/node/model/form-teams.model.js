'use strict'

const { Sequelize, Model, DataTypes } = require("sequelize")

var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect
})

const defaultValueInfo = {
    fullName: '',
    email: '',
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
const defaultPaymentMethod = {
    iban: "",
    country: "",
    bankName: "",
    totalDue: "",
    swiftCode: ""
}

const FormTeams = sequelize.define("form_teams", {
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
    client_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
    ref: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    service: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    total: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 300
    },
    note: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    tools: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    paymentMethod: {
        type: Sequelize.JSONB,
        defaultValue: defaultPaymentMethod,
        get() {
            if (this.getDataValue('paymentMethod') == null) {
                return defaultPaymentMethod
            }
            else {
                return this.getDataValue('paymentMethod')
            }
        }
    },
    info: {
        type: Sequelize.JSONB,
        defaultValue: defaultValueInfo,
        get() {
            if (this.getDataValue('info') == null) {
                return defaultValueInfo
            }
            else {
                return this.getDataValue('info')
            }
        }
    },
    issuedDate: {
        type: DataTypes.DATE
    },
    dueDate: {
        type: DataTypes.DATE
    },
    payDate: {
        type: DataTypes.DATE
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    schema: 'aythen',
    tableName: 'form_teams'
})

// sequelize.sync()

module.exports = { FormTeams }
