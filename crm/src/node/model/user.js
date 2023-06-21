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




const publicUser = [
'id',
'avatar',
'name',
'company',
'category',
'email',
'phone',
'nif',
'status',
'address',
'language',
'timezone',
'currency',
'status',
'reseller',
'contact',
'createdAt',
'updatedAt'
]
              

const User = sequelize.define("users", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    sign_id:{
        type: Sequelize.UUID,
        // defaultValue: Sequelize.UUIDV4
    },
    source: {
        type: Sequelize.TEXT,
        defaultValue: 'funnel-lead'
    },
    google_id:{
        type: Sequelize.TEXT,
        defaultValue: Sequelize.UUIDV4,
        unique: true
    },
    password_id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    user_id: {
        type: Sequelize.UUID
    },
    email: {
        type: Sequelize.TEXT,
        unique: true
    },
    name: {
        type: Sequelize.JSONB,
        defaultValue: {
            name: '',
            firstSurname: '',
            secondSurname: ''
        }
    },
    company: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    category: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    budget: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    plan: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    question: {
        type: Sequelize.JSONB,
        defaultValue: {}
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
    contact: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    billingaddress: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    carddetails: {
        type: Sequelize.JSONB,
        defaultValue: []
    }, 
    reseller: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    ad: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    notification: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    oauth: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    web: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    phone: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    works: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    nif: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    zone: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 400
    },
    bot: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    timezone: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    currency: {
        type: Sequelize.TEXT,
        defaultValue: 'USD'
    },
    language: {
        type: Sequelize.TEXT,
        defaultValue: 'Español'
    },
    emails_sent: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    reservation_date: {
        type: DataTypes.DATE,
        defaultValue: new Date()
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
    }
},{
    schema: 'aythen',
    tableName: 'users',
    hooks: {
       async afterCreate(user, options) {
          await PasswordUser.create({
            id: user.password_id,
            data: options.password
          });
          /*
          await UserData.create({
              id: uuid(),
              user_id: user.id
          });
          await UserFriends.create({
              id: uuid(),
              user_id: user.id
          });
          */
       },
    }
})



const Password = sequelize.define("password_data", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false
    }
},{
    schema: 'aythen',
    tableName: 'password_data'
})

const PasswordUser = sequelize.define("password_user", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false
    }
},{
    schema: 'aythen',
    tableName: 'password_user'
})


module.exports = { User, publicUser, Password,PasswordUser}
