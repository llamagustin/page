const { Router } = require('express')
const routerNumeration = Router();
const NumerationServices = require('./services/numeration.services');
const { Numerations } = require("./model/numeration");


function updateCode(code) {
    const newNumeration = code.numeration + 1;
    const changes = {
        ...code,
        numeration: newNumeration,
        code: `${code.prefix}${String(newNumeration).padStart(code.digits, '0')}`
    }
    Numerations.update(changes, {
        where: { id: code.id }
    })
}

const getNumerationByModel = async ({ params }, res) => {
    const { model } = params;
    const where = { model }
    const data = await Numerations.findOne({ where })
    if(!data) return res.sendStatus(404);
    updateCode(data)
    return res.status(200).json(data)
}

const updateNumerationByModel = async (req, res) => {
    
}

routerNumeration.get('/:model', getNumerationByModel)
routerNumeration.put('/:model', updateNumerationByModel)

module.exports = routerNumeration