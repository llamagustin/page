const { Account } = require("../model/account");
const { User } = require("../model/user");
const sequelize = require("./sequelize.js");
const { Op } = require('sequelize')

class AccountServices {
  static async getAccountsById(ids, opts = {}) {
    try {
      // await sequelize.authenticate();
      const params = {
        where: { id: ids }
      };
      if(opts?.attributes?.length) {
        params.attributes = [...opts.attributes]
      }
      const data = await Account.findAll(params);
      if (data.length) {
        const accounts = data
          .map((item) => item.dataValues)
          .map((item) => ({
            ...item,
            taskDone: 0,
            projectDone: 0,
            taxId: "",
            language: "English",
          }));
        return accounts;
      } else {
        throw 404;
      }
    } catch (error) {
      return error;
    }
  }
  
  static async getAccountByPhone(phone) {
    try {
      const query = {
        where: {
          phone: {
            [Op.like]: `%${phone}%`,
          },
        },
      }
      const response = await Account.findOne(query)
      return response?.dataValues || null
    } catch (error) {
      throw error;
    }
  }
  
  static async getAccountByEmail(email) {
    try {
      const query = {
        where: { email },
      }
      const account = await Account.findOne(query)
      
      if(!account) return 404
      return account.dataValues
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AccountServices;
