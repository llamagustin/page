const kmeans = require('node-kmeans');
// const { uuid } = require('uuidv4');
const express = require('express')
const routerCalendar = express.Router()

const { v4: uuid, validate: valid_uuid } = require('uuid');

// const fn = require('../token/fn.js')
const Sequelize = require('sequelize')
const { Op } = require("sequelize");
var config = require('./config.json')

const CalendarServices = require('./services/app/calendar.services')

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect
})

const { Calendar } = require('./model/calendar')
const { User } = require('./model/user')

const fetchEvents = async (req, res) => {
    // let validation = await fn.validate(req.body)
    // if (validation.status == "ok") {
    const { priority } = req.query;
    const { id, start } = req.params
    
    if(!valid_uuid(id)) return res.send('404')
    
    const where = {
        user_id: id,
    }
    if(priority != 'todos') {
        where.priority = priority;
    }
    if (true) { 
        
        var result = await Calendar.findAll({
            where: where,
            order: [
                ['createdAt', 'DESC']
            ]
        })
        
        const events = result.map(event => event.dataValues);
        return res.status(200).send(result)
    }else {
        return res.status(400).send("no validate token")
    }

}

const addEvent = async (req, res) => {
    const { start, end } = req.body

    try{
        const errors = {}
        const startDate = new Date(start)

        const nowDate = new Date()
        if (startDate > nowDate) {
            const data = await new Promise(async (resolve) => {
                var data = await Calendar.create(req.body)
                resolve(data)
            })
            
            if (data == 404) return res.send(errors);
            
            return res.send(data);
        } else {
            return res.send({
                status: 'Invalid',
                title: 'Invalid date',
                message: 'Fecha final menor o igual a la fecha de inicio',
            })
        }

    } catch (error) {
        return res.send(error)
    }
}



const _updateEvent = async (event) => {
    const {id, start, end, ...changes} = event;
    
    if(!valid_uuid(id)) throw new Error('Invalid UUID')
    
    const errors = {}
    
    const startDate = new Date(start)
    const endDate = new Date(end)
    
    if (startDate < endDate) {
        const status = await new Promise((resolve) => {
            sequelize.authenticate().then(async () => {
                var data = await Calendar.update(changes, {
                    where: { id }
                })
                resolve(data)
            }).catch((error) => {
                errors.error = error
                resolve(404)
            })
        })
        
        if (status == 404) throw new Error(errors);
        return status;
    } else {
        
        throw new Error({
            status: 'Invalid',
            title: 'Invalid date',
            message: 'Fecha final menor o igual a la fecha de inicio',
        })
    }
}
    
    
const updateEvent = async ({ body }, res) => {
    const {
        id,
        start,
        end,
        typeUpdate, 
        data
    } = body;
    
    // const { lead_id, ...data } = body;
    try{
        if(['drop', 'resize', 'formOnline'].includes(typeUpdate) ) {
            if(typeUpdate !== 'formOnline') {
                delete data.priority;
            }
            var event = await _updateEvent(data);
        } else {
            
            var event = await _updateEvent(body);
        }
        res.status(200).send(event);
    } catch (error) {
        return res.status(400).send("Error")
    }
    // var errors = {};
    // const { id } = req.body;
    // var errors = {};
    // let validation = await fn.validate(req.body)

    // if (validation.status == "ok") {
    //     var startDate = new Date(req.body.start)
    //     var endDate = new Date(req.body.end)
    //     if (startDate < endDate) {
    //         var data = await new Promise((resolve, reject) => {
    //             sequelize.authenticate()
    //                 .then(async () => {

    //                     var data = await Calendar.update(req.body, { where: { id: id } })

    //                     resolve(data)
    //                 })
    //                 .catch(err => {
    //                     errors = {
    //                         error: err
    //                     }

    //                     resolve(404)
    //                 })
    //         })

    //         if (data == 404) {
    //             console.log(errors);
    //             return res.status(404).send(errors)
    //         }

    //         return res.status(200).send(data)
    //     }
    //     else {
    //         return res.status(400).send({ status: "invalid", title: "invalid date", message: "fecha final menor o igual a la fecha de inicio" })
    //     }
    // }
    // else {
    //     return res.status(400).send(validation)
    // }
}

const removeEvent = async (req, res) => {
    const { id } = req.params;
    
    if(!valid_uuid(id)) return res.send('404')
    
    Calendar.destroy({ where: { id: id } })
    res.sendStatus(200);
    // let validation = await fn.validate(req.body)
    // if (validation.status == "ok") {
    //     Calendar.destroy({ where: { id: ID } })
    //     return res.send('200')
    // } else {
    //     return res.status(400).send({ message: "invalid token or ID" })
    // }
}

const testEvent = (req, res) => {
    return res.send('200')
}

async function getEvents(request, response) {
    const { id } = request.params;
    
    if(!valid_uuid(id)) return res.send('404')
    
    const now = Date.now() - (Date.now() % (24 * 60 * 60 * 1000));
    const result = await Calendar.findAll({
        include: {
            model: User,
            attributes: ['id', 'name', 'avatar']
        },
        where: {
            user_id: id,
            start: {
                [Op.gte]: now
            }
        },
        order: [['start', 'ASC']]
    })
    return response.status(200).send(result)
}

async function getTodaysEvents(request, response) {
    const { id } = request.params;
    
    if(!valid_uuid(id)) return res.send('404')
    
    const now = Date.now() - (Date.now() % (24 * 60 * 60 * 1000));
    const today = new Date();
    let endOfDayTimestamp = Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23, 59, 59
    );
    
    const result = await Calendar.findAll({
        include: {
            model: User,
            attributes: ['id', 'name', 'avatar']
        },
        where: {
            lead_id: id,
            // user_id: id,
            start: { [Op.gte]: now },
            end:  { [Op.lte]: endOfDayTimestamp }
        },
        order: [['start', 'ASC']]
    })
    return response.status(200).send(result)
}




routerCalendar.get('/test', testEvent);
routerCalendar.get('/events/:id', fetchEvents);
routerCalendar.post('/events', addEvent);

routerCalendar.post('/events/:id', updateEvent);
routerCalendar.delete('/events/:id', removeEvent);

routerCalendar.get('/get-all-events/:id', getEvents);
routerCalendar.get('/get-events-today/:id', getTodaysEvents);

module.exports = routerCalendar