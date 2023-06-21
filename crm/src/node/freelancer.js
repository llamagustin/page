const express = require('express')
const routerFreelancer = express.Router();
const { Op } = require("sequelize");
const { Freelancer } = require("./model/freelancer");
const { FreelancerCrm } = require("./model/freelancerCrm");

const { v4: uuid, validate: valid_uuid } = require('uuid');


const getAllFreelancer = async (req, res) => {
    const {
        q = '',
            category = '',
            subCategory = ''
    } = req.query;

    const whereOptions = {
        [Op.and]: [{
                fullname: {
                    [Op.iLike]: `%${q}%`
                }
            },
            {
                category: {
                    [Op.iLike]: `%${category}%`
                }
            },
            {
                subcategory: {
                    [Op.iLike]: `%${subCategory}%`
                }
            }
        ]
    };

    const qr = await new Promise((resolve, reject) => {
        Freelancer.findAll({
                limit: 20,
                where: whereOptions,
                order: [
                    ['fullname', 'ASC']
                ]
            })
            .then(result => resolve(result))
            .catch(err => resolve(err))
    })

    if (qr.length < 0) return res.send("404")
    return res.send(qr)
}

const getFreelancer = async (req, res) => {
    const { id } = req.params;

    if (!valid_uuid(id)) return res.send('404')


    const qr = await new Promise((resolve, reject) => {
        Freelancer
            .findOne({ where: { id: id } })
            .then(result => resolve(result))
            .catch(err => resolve(404))
    })

    if (qr == 404) return res.send("404")

    return res.send(qr)
}

const updateFreelancer = async (req, res) => {
    const data = req.body.params

    let qr = await Freelancer.upsert(data, { where: { id: data.id } })
    console.log('eidjuwehdui', qr)
    return res.send({ ok: true });
}

const addFreelancer = async (req, res) => {
    const { freelancer } = req.body

    const qr = await new Promise((resolve, reject) => {
        Freelancer.create(freelancer)
            .then(result => resolve(result))
            .catch(err => resolve(err))
    })

    if (qr == 404) {
        // console.log('error save freelancer!', freelancer)
        return res.send("404")
    }

    return res.send(qr)
}



const listWithPagination = async (req, res) => {
    const opts = {
        order: [['createdAt', 'DESC']],
        where: {}
    };
    
    // 👉 PAGINATION
    const { perPage, currentPage } = req.query;
    if(perPage && currentPage) {
       opts.limit = perPage;
       opts.offset = (currentPage - 1) * perPage;
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
    
    // 👉 FULLNAME
    const { fullname } = req.query;
    if(fullname) {
        opts.where.fullname = {
            [Op.iLike]: `%${fullname.trim()}%`
        }
    }
    
    // 👉 RATE
    const { rate } = req.query;
    if(rate) {
        opts.where.rate = {
            [Op.eq]: rate
        }
    }
    
    try {
        const result = await Freelancer.findAndCountAll(opts)
        res.json({
            freelancers: result.rows,
            count: result.count,
            totalPages: Math.ceil(result.count / perPage)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const update = async ({ params, body }, res) => {
    const { id } = params;
    try {
        let freelancer = await Freelancer.findOne({ where: { id }});
        if(!freelancer) return res.status(404).send('Freelancer not found');
        await freelancer.update(body);
        freelancer = await Freelancer.findOne({ where: { id }});
        res.status(201).send(freelancer);
    } catch(err) {
        res.status(500).send('Error when searching for Freelancer');
    }
}

const destroy = async({ params }, res) => {
    const { id } = params;
    try {
        await Freelancer.destroy({ where: { id }});
        return res.status(204).end();
    } catch(err) {
        return res.status(500).send('Error when delete a Freelancer', err);
    }
}

const addFreelancerCrm = async (req, res) => {
    const { freelancer } = req.body

    console.log('frelancer crm',freelancer)

    const qr = await new Promise((resolve, reject) => {
        FreelancerCrm.create(freelancer)
            .then(result => resolve(result))
            .catch(err => resolve(err))
    })

    if (qr == 404) {
        // console.log('error save freelancer!', freelancer)
        return res.send("404")
    }

    return res.send(qr) 
}

const getAllFreelancerCrm = async (req, res) => {
    /*const {
        q = '',
        category = '',
        subCategory = ''
    } = req.query;

    const whereOptions = {
        [Op.and]: [
            {category: {[Op.iLike]: `%${category}%`}},
            {subcategory: {[Op.iLike]: `%${subCategory}%`}}
        ]
    };*/

    const qr = await new Promise((resolve, reject) => {
        FreelancerCrm.findAll({})
        .then(result => resolve(result))
        .catch(err => resolve(err))
    })

    if (qr.length < 0) return res.send("404")
    return res.send(qr)
}

const updateFreelancerCrm = async (req, res) => {
    const data = req.body.params

    let qr = await FreelancerCrm.upsert(data, { where: { id: data.id } })
    
    return res.send({ updated: true });
}


routerFreelancer.get("/list", listWithPagination);
routerFreelancer.post("/", addFreelancer)
routerFreelancer.put("/:id", update);
routerFreelancer.delete("/:id", destroy);

routerFreelancer.get("/", getAllFreelancer)
routerFreelancer.get("/:id", getFreelancer)
routerFreelancer.post("/add", addFreelancer)
routerFreelancer.patch("/update", updateFreelancer)

// frelancer ingresados del CRM

routerFreelancer.post("/crm/", addFreelancerCrm)
routerFreelancer.get("/crm/list", getAllFreelancerCrm)
routerFreelancer.post("/crm/update",updateFreelancerCrm)


module.exports = routerFreelancer;