'use stric'


const { Sequelize, Model, DataTypes, Op } = require("sequelize")



var config = require('../config.json')

  const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
   port: config.port,
  dialect: config.dialect
})

  const tokenk = sequelize.define(`tokenk`, {
    // Aquí defines los campos del modelo
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    tkey: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  },{
    schema: 'aythen',
    tableName: 'tokenk',
    hooks: {
       async afterCreate(tokenk, options) {
    //       await Password.create({
    //         id: account.password_id,
    //         password: options.password
    //       });
    //   },
       
    //   async afterDestroy(account, options) {
    //       await Password.destroy({
    //         id: account.password_id
    //       });
      }
    }
});
  
  
  
  
  module.exports = { tokenk }