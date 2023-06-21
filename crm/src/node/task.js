const { Router } = require('express')
const router = Router()
const { Task } = require("./model/task")
const { Account } = require("./model/account")
const { Op } = require("sequelize")


const index = async (req, res) => {
  const opts = {
    order: [
      ['createdAt', 'DESC']
    ],
    include: {
      model: Account,
      attributes: ['fullName', 'avatar', 'email']
    },
    where: {}
  };
  
  const { perPage, page, title, description, status } = req.query;
  
  // 👉 PAGINATION
  if (perPage && page) {
    opts.limit = perPage;
    opts.offset = (page - 1) * perPage;
  }

  // 👉 TITLE
  if (title) {
    opts.where.title = {
      [Op.iLike]: `%${title.trim()}%`
    }
  }

  // 👉 DESCRIPTION
  if (description) {
    opts.where.description = {
      [Op.iLike]: `%${description.trim()}%`
    }
  }
  
  // 👉 ESTATUS
  if (status) {
    let array = status.split(',');
    for(let i = 0; i < array.length; i++) {
      opts.where[array[i]] = {
        [Op.eq]: true
      }
    }
  }
  
  try {
    const result = await Task.findAndCountAll(opts)
    if(perPage && page) {
      res.json({
        tasks: result.rows,
        count: result.count,
        totalPages: Math.ceil(result.count / perPage)
      });
    } else {
      res.json({
        tasks: result.rows
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const store = async (req, res) => {
  const task = req.body;
  try {
    let data = await Task.create(task)
    res.status(200).json(data);
  }
  catch (error) {
    console.log({ error })
    res.status(500).json({ error: 'Internal server error', error });
  }
}

const update = async ({ params, body }, res) => {
  const { id } = params;
  try {
    let data = await Task.findOne({ where: { offer_id: id } });
    if (!data) return res.status(404).send('Task not found');
    await data.update(body);
    data = await Task.findOne({ where: { offer_id: id } });
    res.status(200).send(data);
  }
  catch (err) {
    res.status(500).send('Error when searching for Task');
  }
}

const destroy = async ({ params }, res) => {
  const { id } = params;
  try {
    await Task.destroy({ where: { offer_id: id } });
    return res.status(204).end();
  }
  catch (err) {
    return res.status(500).send('Error when delete a Task', err);
  }
}

const getUserTask = async (req, res) => {
  try {
    const qr = await new Promise((resolve, reject) => {
      Task.findOne({ where: { user_id: req.params.id } })
        .then(result => resolve(result))
        .catch(err => resolve(err))
    })
    res.status(200).send(qr)
  }
  catch (e) {
    console.log(e)
    return res.status(500).send('Error when get tasks per user', e);
  }
}

const test = async(req,res)=>{
  return res.send({ok:true})
}


router.get('/', index)
router.post("/", store)
router.put("/:id", update)
router.delete("/:id", destroy);

router.get('/:id', getUserTask)
router.get('/test',test)

module.exports = router  