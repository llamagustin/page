'use stric'
const { Sequelize, Model, DataTypes, Op } = require("sequelize")
var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect
})


const Api = sequelize.define('api', {
  id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false
  },
  service_id: {
    type: DataTypes.UUID
  },
  slug: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  title: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  subtitle: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  about: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  brand: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  pegi: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  price: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  // image: {
  //   type: DataTypes.bytea
  // },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  downloads: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  reviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  safety: {
    type: DataTypes.JSONB,
    defaultValue: {
      share: true,
      ubication: true,
      encriptation: true,
      deleted: true
    }
  },
  category: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
   schema: 'aythen',
   tableName: 'api'
});

module.exports = { Api }