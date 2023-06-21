var config = require('../config.json')
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect
})

const FreelancerCrm = sequelize.define('freelancer', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  avatar: {
    type: Sequelize.BLOB,
    get() {
      if (this.getDataValue('avatar') == null) {
        return null
      }
      else {
        return this.getDataValue('avatar').toString('utf8')
      }
    }
  },
  about: {
    type: DataTypes.TEXT,
  },
  profile: {
    type: DataTypes.TEXT,
  },
  skills: {
    type: DataTypes.JSONB,
  },
  dni: {
    type: DataTypes.JSONB,
  },
  experiences: {
    type: DataTypes.JSONB,
  },
  academies: {
    type: DataTypes.JSONB,
  },
  address: {
    type: DataTypes.JSONB,
  },
  rangosalarial: {
    type: DataTypes.JSONB,
  },
  rate: {
    type: DataTypes.INTEGER,
  },
  language: {
    type: DataTypes.TEXT,
  },
  timezone: {
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.TEXT,
  },
  subcategory: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  schema: 'aythen',
  tableName: 'freelancercrm',
});

module.exports = { FreelancerCrm };
