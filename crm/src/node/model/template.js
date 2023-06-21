'use stric'

const { Sequelize, Model, DataTypes, Op } = require("sequelize")

const { uuid } = require('uuidv4');
var config = require('../config.json')
 
 const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect
})

//createdAt updatedAt

 const Template = sequelize.define("template", 
{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    urltemplate: {
        type: Sequelize.TEXT,
        defaultValue:''
    },
    templatename: {
        type: Sequelize.TEXT,
        defaultValue:''
    },
    category: {
        type: Sequelize.TEXT,
        defaultValue:''
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue:''
    },
    isnew: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
    },
    islink: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
    },
    route: {
        type: Sequelize.TEXT,
        defaultValue:''
    },
    utilities: {
        type: Sequelize.JSONB,
        defaultValue:{}
    },
    displayorder: {
        type: Sequelize.INTEGER,
        defaultValue:1
    },
     screenshotlight:{
        type: Sequelize.BLOB,
        get() {
            if(this.getDataValue('screenshotlight') == null){
                return null
            }else{
                return this.getDataValue('screenshotlight').toString('utf8')
            }
        }       
        }, 
     screenshotdark:{
         type: Sequelize.BLOB,
        get() {
            if(this.getDataValue('screenshotdark') == null){
                return null
            }else{
                return this.getDataValue('screenshotdark').toString('utf8')
            }
        }   
     },
    createdAt: {
        type: DataTypes.DATE
        
    },
    updatedAt: {
        type: DataTypes.DATE
    },
},{
    schema: 'aythen',
    tableName: 'template',
 })
 

module.exports = { Template }