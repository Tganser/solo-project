var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//need to add my DB stuff to a model (intention DB and for events DB)
var CalendarData = require('../models/calendardatamodel');

router.get('/', function(req, res) {
  CalendarData.find({}, function(err, results) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      console.log('successful get calendarData ->', results);
      res.status(200).send(results);
    }
  });
});


//so currently, this is returning all events in the calendar even though the robomongo only shows 50 events. interesting.
//that is pretty weird

//after lunch i will try the google OAuth + API connection - then work more with logic


module.exports = router;
