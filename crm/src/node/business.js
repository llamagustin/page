const { Router } = require('express')
const router = Router()
const { Business } = require("./model/business");
const { User } = require('./model/user');
const { Op, Sequelize } = require("sequelize");

const { v4: uuid, validate: valid_uuid } = require('uuid');

const getListBussiness = async (req, res) => {
    const opts = {
        include: [
            {
                model: User,
                attributes: ['id', 'name', 'email'],
            }
        ],
        order: [['createdAt', 'DESC']],
        where: {}
    };
    
    // 👉 PAGINATION
    const { perPage, page } = req.query;
    if(perPage, page) {
       opts.limit = perPage;
       opts.offset = (page - 1) * perPage;
    }
    
    // 👉 ADDRESS
    const { province, city } = req.query;
    if(city && province) {
        opts.where.address = {
            [Op.and]: [
                {
                    province: {
                        [Op.iLike]: `%${province}%`
                    }
                },
                {
                    city: {
                        [Op.iLike]: `%${city}%`
                    }
                }
            ]
        }
    } else if(province) {
        opts.where.address = {
            province: {
                [Op.iLike]: `%${province}%`
            }
        }
    }
    
    // const { category } = req.query;
    // if(category) {}
    
    try {
        const result = await Business.findAndCountAll(opts)
        res.json({
            business: result.rows,
            totalBusiness: result.count,
            totalPages: Math.ceil(result.count / perPage)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getBusiness = async (req, res) => {
    const { id } = req.params;
    
    if (!valid_uuid(id)) return res.send('404')
    
    const qr = await new Promise((resolve, reject) => {
        Business.findOne({ where: { id } })
            .then(result => resolve(result))
            .catch(err => resolve(404))
    });
    
    if (qr == 404) return res.send("404")
    return res.send(qr)
}

const store = async (req, res) => {
    try {
        const data = req.body;
        let business = await Business.create(data);
        await business.reload({
            include: {
                model: User,
                attributes: ['name', 'email']
            }
        })
        return res.status(200).json(business);
    } catch(error) {
        return res.status(500).send('Error when create Business', error);
    }
}

const update = async ({ params, body }, res) => {
    const { id } = params;
    try {
        let handler = await Business.update(body, { where: { id }, returning: true});
        let business = await handler[1][0].reload({
            include: {  
                model: User,
                attributes: ['name', 'email']
            }
        });
        res.status(201).send(business);
    } catch(err) {
        res.status(500).send('Error when update for Business');
    }
}

const destroy = async({ params }, res) => {
    const { id } = params;
    try {
        await Business.destroy({ where: { id }});
        return res.status(204).end();
    } catch(err) {
        return res.status(500).send('Error when delete a Business', err);
    }
}

router.get("/", getListBussiness);
router.get("/:id", getBusiness);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;