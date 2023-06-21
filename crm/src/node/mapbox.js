const request = require('request')

const express = require('express')
const routerMap = express.Router()

//sequelize 

/*
const { uuid } = require('uuidv4');


const Sequelize = require('sequelize')
const { Op } = require("sequelize");

var config = require('./config.json')
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})
*/

/*
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
var map = new mapboxgl.Map({
  container: 'YOUR_CONTAINER_ELEMENT_ID',
  style: 'mapbox://styles/mapbox/streets-v11'
});
*/

var createToken = async (req, res) => {
    const { address } = req.body
    
    var ACCESS_TOKEN = 'pk.eyJ1IjoiYXl0aGVuIiwiYSI6ImNrcnh1OHdqeDB0eHUyb244MWI0YjIwbzkifQ.3cO0p2I6JzTucf-NEWbgbw'
    //var address = 'Santa Perpetua de Mogoda, 08130, Pstg. Pere Calders numero 4'
    
    
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
            + encodeURIComponent(address) + '.json?access_token='
            + ACCESS_TOKEN + '&limit=1';
 
    request({ url: url, json: true }, function (error, response) {
        if (error) {
            callback('Unable to connect to Geocode API');
        } else if (response.body.features.length == 0) {
            callback('Unable to find location. Try to search another location.');
        } else {
            const coords = {
              longitude: response.body.features[0].center[0],
              latitude: response.body.features[0].center[1],
              location: response.body.features[0].place_name
            }
 
            return res.send(coords)
        }
    })
}





routerMap.post('/token', createToken);


module.exports = routerMap


