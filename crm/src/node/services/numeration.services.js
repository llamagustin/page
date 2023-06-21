const { Numerations } = require("../model/numeration");

class NumerationServices {
    
    static async findByModel(model) {
        if(!model) return "Not found";
        const data = await Numerations.findOne({
            where: { model }
        })
        // console.log({ model })
        // const data = await Numerations.findByPk(3)
        console.log({ data })
        if(data === null) {
            return 'No records';
        } else {
            return data;
        }
    }
    
    static async updateByModel(model = null) {
        const numeration = await this.findByModel(model);
        if(numeration === "Not found") return;
        console.log({ method: 'update', numeration})
    }
    
    static async update(model = null, changes) {
        const updateNumeration = Numerations.update(changes,{
            where: { model }
        })
        return updateNumeration;
    }
}

module.exports = NumerationServices;