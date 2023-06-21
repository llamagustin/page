'use stric'


const { Sequelize, Model, DataTypes, Op } = require("sequelize")



var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
   port: config.port,
  dialect: config.dialect
})


const Doc = sequelize.define("docs", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    version: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    data: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    logs: {
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
    schema: 'aythen',
    tableName: 'docs',
    hooks: {
        /*
       async afterCreate(account, options) {
          await Password.create({
            id: account.password_id,
            password: options.password
          });
       },
       */
    }
})






module.exports = { Doc }