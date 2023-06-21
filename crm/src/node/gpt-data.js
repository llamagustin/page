const { Router } = require('express')
const router = Router()
const { GptData } = require("./model/business");
const { Op } = require("sequelize");

const { sample, completion, edit, insert } = require("./services/gpt.services");


const getListGPTData = async (req, res) => {
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
    const result = await GptData.findAndCountAll(opts)
    res.json({
      gpts: result.rows,
      totalGPTData: result.count,
      totalPages: Math.ceil(result.count / perPage)
    });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getGPTData = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await GptData.findOne({ where: { id } });
    return res.status(200).json(data)
  }
  catch (e) {
    return res.status(404).send('GPT Data not found.');
  }
}

const store = async (req, res) => {
  try {
    const payload = req.body;
    let data = await GptData.create(payload);
    return res.status(200).json(data);
  }
  catch (error) {
    return res.status(500).send('Error when create GPT Data', error);
  }
}

const update = async ({ params, body }, res) => {
  const { id } = params;
  try {
    let handler = await GptData.update(body, { where: { id }, returning: true });
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
    await GptData.destroy({ where: { id } });
    return res.status(204).end();
  }
  catch (err) {
    return res.status(500).send('Error when delete a GPT Data', err);
  }
}



const storeConversation = async ({ body, params }, res) => {
  try {
    const { id } = params
    const { 
      prompt, 
      input,
      save = false
    } = req.body
    
    const gpt = await GptData.findByPk(id)
    if(!gpt) throw 'GPT Data not found!'
    
    gpt.update(gpt.dataValues, { where: { id }})
      
    // }
    var data = await completion({
      input: 'hello prompt',
      max_tokens: 270
    })
    
    console.log('gpt', data)
    
    var data = 'save'
    if(save){
      data = await gpt.update({
        input: 'hello world'
      },{ 
        where: { id }, 
        returning: true 
      });
    }
    
    res.status(200).send({text: data})
  }
  catch(err) {
    res.status(500).send(err);
  }
}

// 👉 Conversation
router.post("/:id", storeConversation);

router.get("/", getListGPTData);
router.get("/:id", getGPTData);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
