const { Calendar } = require("../../model/calendar");
const sequelize = require("../sequelize");

// type Event {
// 	user_id: string,
// 	start: date,
// 	end: date,
// 	allDay: boolean,
// 	lead_id: string,
// 	title: string
// }

class CalendarServices {
    static async storeEvent(event) {
        const errors = {}
        const startDate = new Date(event.start)
        const endDate = new Date(event.end)
        if (startDate < endDate) {
            const data = await new Promise((resolve) => {
                sequelize
                    .authenticate()
                    .then(async () => {
                        var data = await Calendar.create(event)
                        resolve(data)
                    })
                    .catch((error) => {
                        errors.error = error
                        resolve(404)
                    })
            })
            if (data == 404) throw errors;
            return data;
        } else {
            throw {
                status: 'Invalid',
                title: 'Invalid date',
                message: 'Fecha final menor o igual a la fecha de inicio',
            }
        }
    }
    
    static async updateEvent(event) {
        const {id, start, end, ...changes} = event;
        
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
            
            if (status == 404) throw errors;
            return status;
        } else {
            throw {
                status: 'Invalid',
                title: 'Invalid date',
                message: 'Fecha final menor o igual a la fecha de inicio',
            }
        }
        
        // const errors = {}
        // const { id } = req.body
        // var startDate = new Date(req.body.start)
        // var endDate = new Date(req.body.end)
        // if (startDate < endDate) {
        //     const data = await new Promise((resolve) => {
        //         sequelize
        //             .authenticate()
        //             .then(async () => {
        //                 var data = await Calendar.update(req.body, {
        //                     where: { id: id },
        //                 })
        //                 resolve(data)
        //             })
        //             .catch((error) => {
        //                 errors = { error }
        //                 resolve(404)
        //             })
        //     })
        //     if (data == 404) {
        //         console.log(errors)
        //         return res.status(404).send(errors)
        //     }
        //     return res.status(200).send(data)
        // } else {
        //     return res.status(400).send({
        //         status: 'invalid',
        //         title: 'invalid date',
        //         message: 'fecha final menor o igual a la fecha de inicio',
        //     })
        // }
    }

    // static async destroyEvent() {
    //     const id = req.params.id
    //     Calendar.destroy({ where: { id } })
    //     return res.send('200')
    // }
}

module.exports = CalendarServices