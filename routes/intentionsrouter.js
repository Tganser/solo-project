var express = require('express');
var router = express.Router();
//need to add my DB stuff to a model (intention DB and for events DB)
var Intentions = require('../models/intentionModel');

router.get('/allIntentions', function(req, res) {
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

router.post('/addIntention', function(req, res) {
  console.log('inside addIntention post', req.body);

  var newHero = new Hero(req.body);
  console.log('newHero ->', newHero);

  newHero.save(function(err) {
    console.log('here');
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      console.log('successful hero created');
      res.sendStatus(201);
    }
  });
});

module.exports = router;
