const { User } = require('../model/user')
const { Op } = require('sequelize')

class UserServices {
	static async getUsersById(id, opts = {}) {
    try {
      const params = { where: { id } };
      if(opts?.attributes?.length) {
        params.attributes = [...opts.attributes]
      }
      const data = await User.findAll(params);
      if (data.length) {
        const leads = data.map((item) => ({
        	...item.dataValues,
        	...opts?.addAttributes || {}
        }));
        return leads;
      } else {
        throw 404;
      }
    } catch (error) {
      return error;
    }
  }
  
  static async getUserByPhone(phone) {
  	try {
  		const FILTERS = {
	    	where: {
	    		phone: {
	  				[Op.like]: `%${phone}%`,
	    		}
	    	}
  		}
	    const response = await User.findOne(FILTERS)
	    return response?.dataValues || null;
  	} catch (e) { throw e }
  }
}

module.exports = UserServices;