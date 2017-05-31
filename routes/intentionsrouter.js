var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//need to add my DB stuff to a model (intention DB and for events DB)
var Intentions = require('../models/intentionModel');

router.get('/', function(req, res) {
  Intentions.find({}, function(err, results) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      console.log('successful get intentions ->', results);
      res.status(200).send(results);
    }
  });
});

router.post('/', function(req, res) {
  console.log('inside addIntention post', req.body);

  var newIntention = new Intentions(req.body);
  console.log('newIntention ->', newIntention);

  newIntention.save(function(err) {
    console.log('new intention .save function');
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      console.log('successful intention created');
      res.sendStatus(201);
    }
  });
});

module.exports = router;
