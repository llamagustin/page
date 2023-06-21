const express = require('express')
const router = express.Router();
const { Op } = require("sequelize");
const { Alert } = require("./model/alert");

const getList = async (req, res) => {
  const opts = {
    order: [
      ['createdAt', 'DESC']
    ],
    where: {}
  };
  
  // 👉 PAGINATION
  const { perPage, currentPage } = req.query;
  if (perPage && currentPage) {
    opts.limit = perPage;
    opts.offset = (currentPage - 1) * perPage;
  }
  
  // 👉 BY USER ID
  const { user_id } = req.query;
  if(user_id) {
    opts.where.user_id = user_id;
  }
  
  try {
    const result = await Alert.findAndCountAll(opts)
    if(perPage && currentPage) {
      res.json({
        data: result.rows,
        count: result.count,
        countPages: Math.ceil(result.count / perPage)
      });
    } else {
      res.json(result.rows);
    }
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const store = async (req, res) => {
  const payload = req.body
  try {
    const data = await Alert.create(payload);
    res.status(201).send(data)
  }
  catch(err) {
    res.send("404")
  }
}

const update = async ({ params, body }, res) => {
  const { id } = params;
  try {
    let data = await Alert.findOne({ where: { id } });
    if (!data) return res.status(404).send('Alert not found');
    await data.update(body);
    data = await Alert.findOne({ where: { id } });
    res.status(200).send(data);
  }
  catch (err) {
    res.status(500).send('Error when searching for Alert');
  }
}

const markAsReadMassive = async (req, res) => {
  
}

const destroy = async ({ params }, res) => {
  const { id } = params;
  try {
    await Alert.destroy({ where: { id } });
    return res.status(204).end();
  }
  catch (err) {
    return res.status(500).send('Error when delete a Alert', err);
  }
}

router.get("/", getList);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;