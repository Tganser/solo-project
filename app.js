var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// var indexRouter = require('./routes/index');
// var heroRouter = require('./routes/hero');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// routers
// app.use('/', indexRouter);
// app.use('/hero', heroRouter);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

// server port set and listen
var serverPort = process.env.PORT || 3000;
app.set('port', serverPort);

var server = app.listen(serverPort, function() {
  console.log('up and listening on', server.address().port);
});
