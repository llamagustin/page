
const config = require('./config')

const express = require('express')
const request = require('request')
const paypal = express.Router()

// Add your credentials:
// Add your client ID and secret
var CLIENT = config.paypal.client;
var SECRET = config.paypal.secret;
var PAYPAL_API = 'https://api.sandbox.paypal.com';



function createPayment(req, res){

    // 2. Call /v1/payments/payment to set up the payment
    request.post(PAYPAL_API + '/v1/payments/payment',
    {
      auth:
      {
        user: CLIENT,
        pass: SECRET
      },
      body:
      {
        intent: 'sale',
        payer:
        {
          payment_method: 'paypal'
        },
        transactions: [
        {
          amount:
          {
            total: '5.99',
            currency: 'USD'
          }
        }],
        redirect_urls:
        {
          return_url: 'https://example.com',
          cancel_url: 'https://example.com'
        }
      },
      json: true
    }, function(err, response)
    {
      if (err)
      {
        console.error(err);
        return res.sendStatus(500);
      }
      // 3. Return the payment ID to the client
      res.json(
      {
        id: response.body.id
      });
    });
}



function executePayment(req, res){
    // 2. Get the payment ID and the payer ID from the request body.
    var paymentID = req.body.paymentID;
    var payerID = req.body.payerID;
    // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
    request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID +
      '/execute',
      {
        auth:
        {
          user: CLIENT,
          pass: SECRET
        },
        body:
        {
          payer_id: payerID,
          transactions: [
          {
            amount:
            {
              total: '10.99',
              currency: 'USD'
            }
          }]
        },
        json: true
      },
      function(err, response)
      {
        if (err)
        {
          console.error(err);
          return res.sendStatus(500);
        }
        // 4. Return a success response to the client
        res.json(
        {
          status: 'success'
        });
      });
  }
  
  
  
  
  
function createProduct(req, res){
    // 2. Get the payment ID and the payer ID from the request body.
    var productName = req.body.productName;
    var productDescription = req.body.productDescription;
    var productType = req.body.productType;
    var productCategory = req.body.productCategory;
    var productImage = req.body.productImage;
    var productHome = req.body.productHome;
    // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
    request.post(PAYPAL_API + '/v1/catalogs/products',
      {
        auth:
        {
          user: CLIENT,
          pass: SECRET
        },
        body:
        {
            "name": productName,
            "description": productDescription,
            "type": productType,
            "category": productCategory,
            "image_url": productImage,
            "home_url": productHome
        },
        json: true
      },
      function(err, response)
      {
        if (err)
        {
          console.error(err);
          return res.sendStatus(500);
        }
        // 4. Return a success response to the client
        return res.status(200).send(response.body)
      });
  }
  
  
  
  
  
  function addPlan(req, res){
    // 2. Get the payment ID and the payer ID from the request body.
    var productID = req.body.productID;
    var planName = req.body.planName;
    var planDescription = req.body.planDescription;
    var planValue = req.body.planValue;
    var planCurrency = req.body.planCurrency;
    var planTaxe = req.body.planTaxe;
    

     
    // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
    request.post(PAYPAL_API + '/v1/billing/plans',
      {
        auth:
        {
          user: CLIENT,
          pass: SECRET
        },
        body:
        {
          "product_id": productID,
          "name": planName,
          "description": planDescription,
          "billing_cycles": [
            {
              "frequency": {
                "interval_unit": "MONTH",
                "interval_count": 1
              },
              "tenure_type": "TRIAL",
              "sequence": 1,
              "total_cycles": 1
            },
            {
              "frequency": {
                "interval_unit": "MONTH",
                "interval_count": 1
              },
              "tenure_type": "REGULAR",
              "sequence": 2,
              "total_cycles": 12,
              "pricing_scheme": {
                "fixed_price": {
                  "value": "10",
                  "currency_code": "USD"
                }
              }
            }
          ],
          "payment_preferences": {
            "auto_bill_outstanding": true,
            "setup_fee": {
              "value":  planValue,
              "currency_code": planCurrency
            },
            "setup_fee_failure_action": "CONTINUE",
            "payment_failure_threshold": 3
          },
          "taxes": {
            "percentage": planTaxe,
            "inclusive": false
          }
        },
        json: true
      },
      function(err, response)
      {
        if (err)
        {
          console.error(err);
          return res.sendStatus(500);
        }
        
        return res.status(200).send(response.body)
        // 4. Return a success response to the client
        /*
        res.json(
        {
          status: 'success'
        });
        */
      });
  }
  
  
  
 
  
    
function paySuscription(req, res){
    // 2. Get the payment ID and the payer ID from the request body.
    var planID = req.body.planID;
    var startTime = req.body.startTime;
    var name = req.body.name;
    var surname = req.body.surname;
    var returnURL = req.body.returnURL;
    var cancelURL = req.body.returnURL;
    // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
    

    request.post(PAYPAL_API + '/v1/billing/subscriptions',
      {
        auth:
        {
          user: CLIENT,
          pass: SECRET
        },
        body:
        {
          "plan_id": planID,
          "start_time": startTime,
          "subscriber": {
            "name": {
              "given_name": name,
              "surname": surname
            },
            "email_address": "customer@example.com"
          },
          "application_context": {
            "brand_name": "example",
            "locale": "en-US",
            "shipping_preference": "SET_PROVIDED_ADDRESS",
            "user_action": "SUBSCRIBE_NOW",
            "payment_method": {
              "payer_selected": "PAYPAL",
              "payee_preferred": "IMMEDIATE_PAYMENT_REQUIRED"
            },
            "return_url": returnURL,
            "cancel_url": cancelURL
          }
        },
        json: true
      },
      function(err, response)
      {
        if (err)
        {
          console.error(err);
          return res.sendStatus(500);
        }
        // 4. Return a success response to the client
        return res.status(200).send(response.body)
      });
  }
  
  
  
  







paypal.post('/create-payment', createPayment)
paypal.post('/execute-payment', executePayment)


paypal.post('/create-product', createProduct)
paypal.post('/add-plan', addPlan)
paypal.post('/subscriptions', paySuscription)
  
  
module.exports = paypal
