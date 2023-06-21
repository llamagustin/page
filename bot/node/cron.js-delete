const express = require('express')
const routerCron = express.Router()

const Sequelize = require('sequelize')
const { Op } = require("sequelize");

const Bree = require('bree')
const path = require('path');


var sample = (req, res) => {
    const bree = new Bree({
      root: './node/jobs',
      jobs : [
        {
          name: 'worker-1',
          interval: 'on the last day of the month'
        },{
          name: 'worker-7',
          // this example uses `human-interval` parsing
          timeout: '3 days and 4 hours'
        },{
          name: 'worker-8',
          timeout: 'at 12:00 am'
        },{
          name: 'beep',
          path: path.join(__dirname, 'jobs', 'test.js'),
          timeout: '1s',
          interval: '2s'
        }
      ]
    })
    bree.start()
    return res.status(200).send('success')
}

/*

// stop all jobs
bree.stop();

// stop only a specific job:
bree.stop('beep');

// run all jobs (this does not abide by timeout/interval/cron and spawns workers immediately)
bree.run();

//run specific beep name
bree.run('beep');

*/



var executeCron = (req, res) => {
    const bree = new Bree({
      root: './node/jobs',
      jobs : [
        {
          name: 'cron-1',
          path: path.join(__dirname, 'jobs', req.body.path + '.js'),
          timeOut: req.body.date
        }
      ]
    })
    //bree.start()
    //bree.run('cron-1');
    
    return res.status(200).send('success')
}


var executeCronEmail = (req, res) => {
    const {
        email_id,
        sender,
        recipient,
        subject,
        body_text,
        body_html,
        category,
        type
      } = req.body;
      
      
    const bree = new Bree({
      root: './node/jobs',
      jobs : [
        {
          name: 'email-1',
          path: path.join(__dirname, 'jobs', 'sendEmail.js'),
          timeOut: req.body.date
        }
      ]
    })
    bree.start()
    
    return res.status(200).send('success')
}


var executeCronPromoEmail = (req, res) => {
    
    const bree = new Bree({
      root: './node/jobs',
      jobs : [
        {
          name: 'email-1',
          path: path.join(__dirname, 'jobs', 'sendEmail.js'),
          interval: req.body.date
        }
      ]
    })
    bree.start()
    
    return res.status(200).send('success')
}



var executeCronPush = (req, res) => {
    const {
        email_id,
        sender,
        recipient,
        subject,
        body_text,
        body_html,
        category,
        type
      } = req.body;
      
      
    const bree = new Bree({
      root: './node/jobs',
      jobs : [
        {
          name: 'email-1',
          path: path.join(__dirname, 'jobs', 'sendPush.js'),
          timeOut: req.body.date
        }
      ]
    })
    bree.start()
    
    return res.status(200).send('success')
}


var executeCronPromoPush = (req, res) => {
    
    const bree = new Bree({
      root: './node/jobs',
      jobs : [
        {
          name: 'email-1',
          path: path.join(__dirname, 'jobs', 'sendPush.js'),
          interval: req.body.date
        }
      ]
    })
    bree.start()
    
    return res.status(200).send('success')
}



var stopCron = (req, res) => {
    const bree = new Bree()
    bree.stop(req.params.id);
    return res.status(200).send('success')
}




var stopAllCron = (req, res) => {
    const bree = new Bree()
    bree.stop();
    return res.status(200).send('success')
}




routerCron.post('/execute/:id', executeCron)
routerCron.post('/execute/email/send', executeCronEmail)
routerCron.post('/execute/email/promo', executeCronPromoEmail)

routerCron.post('/execute/push/send', executeCronPush)
routerCron.post('/execute/push/promo', executeCronPromoPush)

routerCron.get('/stop/all', stopAllCron)
routerCron.get('/stop/:id', stopCron)


module.exports = routerCron




