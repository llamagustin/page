const { Router } = require('express')
const router = Router()
const { GptDataVerify } = require("./model/gpt-data-verify.model");
const { Op } = require("sequelize");

const getRecords = async (req, res) => {
  const opts = {
    order: [
      ['createdAt', 'DESC']
    ],
    where: {}
  };
  
  // 👉 PAGINATION
  const { perPage, page } = req.query;
  if (perPage && page) {
    opts.limit = perPage;
    opts.offset = (page - 1) * perPage;
  }
  
  // 👉 FILTERS
  const { title, input, output, isApproved } = req.query;
  
  if(title) {
    opts.where.title = {
      [Op.iLike]: `%${title}%`
    }
  }
  
  if(input) {
    opts.where.input = {
      [Op.iLike]: `%${input}%`
    }
  }
  
  if(output) {
    opts.where.output = {
      [Op.iLike]: `%${output}%`
    }
  }
  
  if(isApproved) {
    opts.where.isApproved = isApproved == 'approved';
  }
  
  try {
    const result = await GptDataVerify.findAndCountAll(opts)
    
    let response = {
      data: result.rows
    };
    
    if(perPage && page) {
      response.countData = result.count;
      response.totalPages = Math.ceil(result.count / perPage);
    }
    
    res.json(response);
  }
  catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await GptDataVerify.findOne({ where: { id } });
    return res.status(200).json(data)
  }
  catch (e) {
    return res.status(404).send('GptData verify Data not found.');
  }
}

const store = async (req, res) => {
  try {
    const payload = req.body;
    let data = await GptDataVerify.create(payload);
    return res.status(200).json(data);
  }
  catch (error) {
    return res.status(500).send('Error when create GPT Data', error);
  }
}

const update = async ({ params, body }, res) => {
  const { id } = params;
  try {
    let handler = await GptDataVerify.update(body, { where: { id }, returning: true });
    let data = await handler[1][0].reload();
    res.status(201).send(data);
  }
  catch (err) {
    res.status(500).send('Error when update for GPT Data');
  }
}

const destroy = async ({ params }, res) => {
  const { id } = params;
  try {
    await GptDataVerify.destroy({ where: { id } });
    return res.status(204).end();
  }
  catch (err) {
    return res.status(500).send('Error when delete a GPT Data', err);
  }
}

router.get("/", getRecords);
router.get("/:id", getRecord);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
