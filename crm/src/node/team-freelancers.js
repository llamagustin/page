const { Router } = require('express')
const router = Router();
const { Op, Sequelize } = require("sequelize");
const { TeamFreelancer, TABLE_NAME_TEAM_FREELANCERS } = require("./model/team-freelancers.model");
const { Freelancer } = require('./model/freelancer')


const getList = async (req, res) => {
  const opts = {
    order: [
      ['createdAt', 'DESC']
    ],
    where: {},
    // include: {
      // model: Freelancer,
      // attributes: ['id', 'fullname', 'avatar'],
      // where: {
        // id: {
          // [Op.in]: Sequelize.literal(`(SELECT json_array_elements_text("${TABLE_NAME_TEAM_FREELANCERS}"."freelancer_ids")::uuid)`),
        // },
      // },
    // },
  };

  // 👉 PAGINATION
  const { perPage, currentPage } = req.query;
  if (perPage && currentPage) {
    opts.limit = perPage;
    opts.offset = (currentPage - 1) * perPage;
  }

  try {
    const result = await TeamFreelancer.findAndCountAll(opts)
    if (!perPage || !currentPage) return res.json(result.rows);
    res.json({
      data: result.rows,
      count: result.count,
      countPages: Math.ceil(result.count / perPage)
    });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const store = async (req, res) => {
  const payload = req.body
  try {
    const data = await TeamFreelancer.create(payload);
    res.status(201).send(data)
  }
  catch (err) {
    res.send("404")
  }
}

const update = async ({ params, body }, res) => {
  const { id } = params;
  try {
    let data = await TeamFreelancer.findOne({ where: { id } });
    if (!data) return res.status(404).send('TeamFreelancers not found');
    await data.update(body);
    data = await TeamFreelancer.findOne({ where: { id } });
    res.status(200).send(data);
  }
  catch (err) {
    res.status(500).send('Error when searching for TeamFreelancers');
  }
}

const destroy = async ({ params }, res) => {
  const { id } = params;
  try {
    await TeamFreelancer.destroy({ where: { id } });
    return res.status(204).end();
  }
  catch (err) {
    return res.status(500).send('Error when delete a TeamFreelancers', err);
  }
}

router.get("/", getList);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;