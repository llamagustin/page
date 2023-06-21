const { Sequelize, DataTypes } = require("sequelize")
const { Freelancer } = require('./freelancer')

var config = require('../config.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect
})

const TABLE_NAME_TEAM_FREELANCERS = 'team_freelancers'

const TeamFreelancer = sequelize.define(TABLE_NAME_TEAM_FREELANCERS, {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  members: {
    type: Sequelize.JSONB,
    field: 'freelancer_ids',
    defaultValue: []
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 200
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  schema: 'aythen',
  tableName: TABLE_NAME_TEAM_FREELANCERS
});

TeamFreelancer.hasMany(Freelancer, { foreignKey: 'id' })
// sequelize.sync()

module.exports = { TeamFreelancer, TABLE_NAME_TEAM_FREELANCERS }
