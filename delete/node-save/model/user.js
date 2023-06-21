'use stric'


const { Sequelize, Model, DataTypes, Op } = require("sequelize")


const { uuid } = require('uuidv4');
var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})



const User = sequelize.define("users", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    password_id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    user_id: {
        type: Sequelize.UUID
    },
    fullName: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    company: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    role: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    category: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    plan: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    
    username: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    
    country: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    zip: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    city: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    address: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    contact: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    social: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    coords: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    web: {
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
    budget: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    nif: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    status: {
        type: Sequelize.TEXT,
        defaultValue: ''
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
           await Password.create({
            id: user.password_id,
            password: options.password
          });
         await UserData.create({
            id: uuid(),
            user_id: user.id
        });
        await UserFriends.create({
            id: uuid(),
            user_id: user.id
        });
       },
    }
})




const Password = sequelize.define("password_data", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
},{
    schema: 'aythen',
    tableName: 'password_data'
})





const UserData = sequelize.define("user_data", {
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
    header: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    userAbout: {
        type: Sequelize.JSONB,
        defaultValue: {}
    },
    suggestedPages: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    twitterFeeds: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    post: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    latestPhotos: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    suggestions: {
        type: Sequelize.JSONB,
        defaultValue: []
    },
    polls: {
        type: Sequelize.JSONB,
        defaultValue: []
    }
},{
    schema: 'aythen',
    tableName: 'user_data'
})





const UserFriends = sequelize.define("user_friends", {
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
    data: {
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
    tableName: 'user_friends'
})







module.exports = { User, UserData, UserFriends, Password }