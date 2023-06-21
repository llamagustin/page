'use strict'

const config = require('./config')

var stripe = require("stripe")(config.stripe.key)
const https = require('https')


const express = require('express')
const routerStripe = express.Router()





var url2file = (req, res) => {
	getImage(req.body.path, function (err, data) {
		stripe.files.create({
		  purpose: 'identity_document',
		  file: {
		    data: data,
		    name: 'file.jpg',
		    type: 'application/octet-stream'
		  }
		}, function(err, file) {
		  return res.status(200).send(file)
		})
	})
}

var getImage = (url, callback) => {
    https.get(url, res => {
        const bufs = [];
        res.on('data', function (chunk) {
            bufs.push(chunk)
        });

        res.on('end', function () {
            const data = Buffer.concat(bufs);
            callback(null, data);
        });
    })
    .on('error', callback);
}





var data2file = (req, res) => {
		stripe.files.create({
		  purpose: 'identity_document',
		  file: {
		    data: req.body.path,
		    name: 'file.jpg',
		    type: 'application/octet-stream'
		  }
		}, function(err, file) {
		  return res.status(200).send(file)
		})
}


var createAccount = (req, res) => {
		var params = req.body.params

		stripe.accounts.create(params, function(err, account) {
				if(err) return res.status(200).send(err)
				return res.status(200).send(account)
		})
}


var listAccount = (req, res) => {
		stripe.accounts.list({ limit: 3 }, function(err, accounts) {
			if(err) return res.status(200).send(err)
			return res.status(200).send(accounts)
		})
}

var updateAccount = (req, res) => {
	var id = req.body.id
	var data = req.body.data

	stripe.accounts.update( id, data, function(err, account) {
			if(err) return res.status(200).send(err)
			return res.status(200).send(account)
  })
}

var queryAccount = (req, res) => {
	var id = req.body.id
	stripe.accounts.retrieve(id, function(err, account) {
		if(err) return res.status(200).send(err)
		return res.status(200).send(account)
  })
}

var removeAccount = (req, res) => {
	var id = req.body.id

	stripe.accounts.del(id, function(err, confirmation) {
			if(err) return res.status(200).send(err)
			return res.status(200).send(confirmation)
  })
}

var loginAccount = (req, res) => {
	stripe.accounts.createLoginLink(
  req.body.account,
  function(err, loginLink) {
		if(err) return res.status(200).send(err)
		return res.status(200).send(loginLink)
  })
}

var createCustomer = (req, res) => {
		var customer = req.body.params.customer
		var token = req.body.params.token
		var account = req.body.account

		stripe.customers.createSource( customer, { source: token }, {stripe_account: account},
		function(err, card) {
			if(err) return res.status(200).send(err)
			return res.status(200).send(card)
		})
}


var retreiveCustomer = (req, res) => {
		var customer = req.body.params.customer
		var card = req.body.params.card
		var account = req.body.params.account

		stripe.customers.retrieveSource(customer, card, {stripe_account: account},
		  function(err, card) {
				if(err) return res.status(200).send(err)
				return res.status(200).send(card)
		  }
		);
}



var createCharge = (req, res) => {
	stripe.charges.create(req.body.params, {stripe_account: req.body.account},
	function(err, charge) {
		if(err) return res.status(200).send(err)
		return res.status(200).send(charge)
	})
}









var customerCreate = (req, res) => {
	stripe.customers.create(req.body.params, {stripe_account: req.body.account},
  function(err, customer) {
		if(err) return res.status(200).send(err)
		return res.status(200).send(customer)
  })
}










//
var paymentIntent = (req, res) => {
  var account = req.body.account
  var amount = req.body.params.amount
  var currency = req.body.params.currency
  var customer = req.body.params.customer
  var payment = req.body.params.payment


  var statement_descriptor_suffix = req.body.params.statement_descriptor_suffix
  var description = req.body.params.description

  stripe.paymentIntents.create(
  {
    setup_future_usage: 'off_session',
    amount: amount,
    currency: currency,
    customer: customer,
    payment_method: payment,
    payment_method_types: ['card'],
    description: description,
    statement_descriptor_suffix: statement_descriptor_suffix
  },{
    stripe_account: account
  },
  function(err, paymentIntent){
    if(err) return res.status(200).send(err)
    return res.status(200).send(paymentIntent)
  }
  )
}






var paymentConfirm = (req, res) => {
  var account = req.body.account
  var id = req.body.id

  stripe.paymentIntents.confirm(
  id,{
    stripe_account: account
  },
  function(err, paymentIntent) {
    if(err) return res.status(200).send(err)
    return res.status(200).send(paymentIntent)
  }
);
}






var createCard = (req, res) => {
	var card = req.body.card
	stripe.tokens.create({card: card},
  function(err, token) {
    if(err) return res.status(200).send(err)
		return res.status(200).send(token)
  })
}


var createSepa = (req, res) => {
	var bank_account = req.body.bank_account
	stripe.tokens.create({bank_account: bank_account},
	//stripe.tokens.create({bank_account: bank_account},
  function(err, token) {
    if(err) return res.status(200).send(err)
		return res.status(200).send(token)
  })
}


var verifySepa = (req, res) => {
		var customer = req.body.params.customer
		var bank_account = req.body.params.bank_account
		var account = req.body.account

		stripe.customers.verifySource(
		  customer,
		  bank_account,
			{amounts: [32, 45], stripe_account: account},
		  function(err, bankAccount) {
		    if(err) return res.status(200).send(err)
				return res.status(200).send(bankAccount)
		  }
		)
}







//account create business
routerStripe.post('/url2file', url2file)
routerStripe.post('/data2file', data2file)

routerStripe.post('/account', createAccount)
routerStripe.post('/account/login', loginAccount)
routerStripe.post('/account/delete', removeAccount)


//token create
routerStripe.post('/card', createCard)

routerStripe.post('/sepa', createSepa)
routerStripe.post('/sepa/verify', verifySepa)

//customer create cliente
routerStripe.post('/customer', createCustomer)


//intents paymentIntents
routerStripe.post('/payment', paymentIntent)
routerStripe.post('/confirm', paymentConfirm)

/////////////////////////////////////////////
module.exports = routerStripe
