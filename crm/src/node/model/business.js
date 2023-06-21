'use stric'

const { Sequelize, Model, DataTypes } = require("sequelize")
// const { Calendar } = require('./calendar')

const { uuid } = require('uuidv4');
var config = require('../config.json')
const { User } = require('./user');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect
})

const Business = sequelize.define('business', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  image: {
    type: Sequelize.STRING,
  },
  user_id: {
    type: Sequelize.UUID,
  },
  phone: {
    type: Sequelize.STRING(20),
  },
  title: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  category: {
    type: Sequelize.JSONB,
    defaultValue: []
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 400,
  },
  description: {
    type: Sequelize.TEXT,
  },
  address: {
    type: Sequelize.JSONB,
    defaultValue: {
      country: '',
      province: '',
      zip: '',
      city: '',
      line: ''
    }
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  },
  // 🖐️ Implementation for interactivity
  email: {
    type: Sequelize.TEXT,
  },
  password: {
    type: Sequelize.TEXT,
  },
  facebook_id: {
    type: Sequelize.TEXT,
  },
  google_id: {
    type: Sequelize.TEXT,
  }
}, {
  schema: 'aythen',
  tableName: 'business'
});

Business.belongsTo(User, { foreignKey: 'user_id' });

const GptData = sequelize.define('gpt_data', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  category: {
    type: Sequelize.JSONB,
    defaultValue: []
  },
  title: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  used: {
    type: Sequelize.INTEGER,
  },
  author: {
    type: Sequelize.JSON,
    defaultValue: {
      name: '',
      avatar: '',
      followers: ''
    }
  },
  input: {
    type: Sequelize.TEXT,
  },
  output: {
    type: Sequelize.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  },
  
  // 🖐️ Implementation for interactivity
  
  isApproved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  conversationHistory: {
    type: Sequelize.JSON,
    defaultValue: [
      {
        userId: '',
        messages: [
          {
            date: '',
            data: []
          }
        ]
      }
    ]
  },
  subCategories: {
    type: Sequelize.JSON,
    defaultValue: []
  },
  services: {
    type: Sequelize.JSON,
    defaultValue: []
  }
}, {
  schema: 'aythen',
  tableName: 'gpt_data'
});

// sequelize.sync()

module.exports = { Business, GptData };
