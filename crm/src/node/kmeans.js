const kmeans = require('node-kmeans');

const express = require('express')
const routerKmeans = express.Router()

//https://javascript.plainenglish.io/cluster-location-based-data-using-k-means-algorithm-in-node-js-and-react-d92fc425dc55




////
const groupOrders = (req, res) => {
    var data = req.body.orders;
    var size = req.body.size;
    
    //var data = orders;
    //var size = 2;

    let vectors = new Array();
    for (let i = 0 ; i < data.length ; i++) {
        vectors[i] = [ data[i]['longitude_to'] , data[i]['latitude_to']];
    }
    
    kmeans.clusterize(vectors, {k: size}, (err,result) => {
        if (err)
            return res.status(400).json({'status' : 'Error'});
        else {
            var json = result;
            return res.status(200).json(json);
        }
    });
}





const assignDrivers = (req, res) => {
    var data = req.body.orders;
    var drivers = req.body.drivers;
    
    //var data = orders;
    //var drivers = _drivers;
    
    if (data.length==0 || drivers.length==0)
        return res.status(400).json({'message' : 'Error'});
    else {
        let vectors = new Array();
        for (let i = 0 ; i < data.length ; i++) {
            vectors[i] = [ data[i]['longitude_to'] , data[i]['latitude_to']];
        }
        kmeans.clusterize(vectors, {k: drivers.length}, (err,result) => {
            if (err) {
                return res.status(400).json({'message' : 'Error'});
            }else {
                var i = 0;
                var t = 0;
                var driversAssigned = [];
                var ordersAssigned = [];
                for(i=0;i<result.length;i++) {
                    ordersAssigned = [];
                    for(t=0;t<result[i].clusterInd.length;t++) {
                        ordersAssigned.push({
                            order_id : data[result[i].clusterInd[t]].order_id,
                            recipient_name : data[result[i].clusterInd[t]].recipient_name,
                            recipient_full_address : data[result[i].clusterInd[t]].recipient_full_address
                        });
                    }
                    driversAssigned.push({
                        driver_id : drivers[i].driver_id,
                        name : drivers[i].name,
                        ordersAssigned : ordersAssigned
                    });
                }
                return res.status(200).json(driversAssigned);
            }
        });
    }
}
    
    
routerKmeans.post('/grouporders', groupOrders);
routerKmeans.post('/assigndrivers', assignDrivers);

module.exports = routerKmeans




/*
const _drivers = [
  { driver_id : 'D001', name : 'Andrew - ID : D001'},
  { driver_id : 'D002', name : 'Bruce - ID : D002'},
  { driver_id : 'D003', name : 'Charlie - ID : D003'}
]
    
const orders = [{
      "order_id": "001",
      "order_date": "2020/02/01",
      "sender_name": "Albert",
      "sender_full_address": "Los Angeles International Airport",
      "recipient_name": "John",
      "recipient_full_address": "Westwood, Los Angeles",
      "latitude_from": 33.943485, 
      "longitude_from": -118.408208,
      "latitude_to": 34.067763,
      "longitude_to": -118.422318
  },
  {
      "order_id": "002",
      "order_date": "2020/02/01",
      "sender_name": "Ben",
      "sender_full_address": "Los Angeles International Airport",
      "recipient_name": "George",
      "recipient_full_address": "10600 Wilshire Blvd",
      "latitude_from": 33.943485, 
      "longitude_from": -118.408208,
      "latitude_to": 34.061577,
      "longitude_to": -118.433476
  },
  {
      "order_id": "003",
      "order_date": "2020/02/01",
      "sender_name": "Chris",
      "sender_full_address": "Los Angeles International Airport",
      "recipient_name": "Michael",
      "recipient_full_address": "10931-10949 Wilshire Blvd",
      "latitude_from": 33.943485, 
      "longitude_from": -118.408208,
      "latitude_to": 34.058519,
      "longitude_to": -118.444902
  },
  {
      "order_id": "004",
      "order_date": "2020/02/01",
      "sender_name": "Donny",
      "sender_full_address": "Los Angeles International Airport",
      "recipient_name": "Lucas",
      "recipient_full_address": "Hollywood",
      "latitude_from": 33.943485, 
      "longitude_from": -118.408208,
      "latitude_to": 34.0977269,
      "longitude_to": -118.341585
  },
  {
      "order_id": "005",
      "order_date": "2020/02/01",
      "sender_name": "Egon",
      "sender_full_address": "Los Angeles International Airport",
      "recipient_name": "Debbie",
      "recipient_full_address": "4165 Beverly Blvd",
      "latitude_from": 33.943485, 
      "longitude_from": -118.408208,
      "latitude_to": 34.076665,
      "longitude_to": -118.300430
  }
]
*/




