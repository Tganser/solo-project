var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

//creating DB
mongoose.connect('localhost:27017/myevents');

//creating schema
var theSchema = mongoose.Schema({
  name: String,
  starttime: Date,
  endtime : Date,
  organizer: String,
  status: String
});

//make collection:
var eventscollection = mongoose.model('eventscollection', theSchema);


//trying to bring in node.js gcal module:
// var events = require('./quickstart.js');

//from quickstart thing:
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

//require routes
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


var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');


// app.get('/events', function(req, res) {
    // Load client secrets from a local file.
    fs.readFile('client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        // Authorize a client with the loaded credentials, then call the
        // Google Calendar API.
        authorize(JSON.parse(content), listEvents);
    });

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     *
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
        var clientSecret = credentials.installed.client_secret;
        var clientId = credentials.installed.client_id;
        var redirectUrl = credentials.installed.redirect_uris[0];
        var auth = new googleAuth();
        var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, function(err, token) {
            if (err) {
                getNewToken(oauth2Client, callback);
            } else {
                oauth2Client.credentials = JSON.parse(token);
                callback(oauth2Client);
            }
        });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     *
     * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback to call with the authorized
     *     client.
     */
    function getNewToken(oauth2Client, callback) {
        var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });
        console.log('Authorize this app by visiting this url: ', authUrl);
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the code from that page here: ', function(code) {
            rl.close();
            oauth2Client.getToken(code, function(err, token) {
                if (err) {
                    console.log('Error while trying to retrieve access token', err);
                    return;
                }
                oauth2Client.credentials = token;
                storeToken(token);
                callback(oauth2Client);
            });
        });
    }

    /**
     * Store token to disk be used in later program executions.
     *
     * @param {Object} token The token to store to disk.
     */
    function storeToken(token) {
        try {
            fs.mkdirSync(TOKEN_DIR);
        } catch (err) {
            if (err.code != 'EEXIST') {
                throw err;
            }
        }
        fs.writeFile(TOKEN_PATH, JSON.stringify(token));
        console.log('Token stored to ' + TOKEN_PATH);
    }

    /**
     * Lists the next 10 events on the user 's primary calendar. *
     *
     @param {
         google.auth.OAuth2
     }
 auth An authorized OAuth2 client.*/

 Date.prototype.getWeek = function(start) {
     //Calcing the starting point
     start = start || 0;
     var today = new Date(this.setHours(0, 0, 0, 0));
     var day = today.getDay() - start;
     var date = today.getDate() - day;

     // Grabbing Start/End Dates
     var StartDate = new Date(today.setDate(date));
     var EndDate = new Date(today.setDate(date + 6));
     return [StartDate, EndDate];
 };

 // test code
 // var Dates = new Date().getWeek();
 // console.log(Dates);
 // console.log(Dates[0].toLocaleDateString() + ' to ' + Dates[1].toLocaleDateString());



    function listEvents(auth) {
        var calendar = google.calendar('v3');
        var Dates = new Date().getWeek();

        calendar.events.list({
            auth: auth,
            calendarId: 'primary',
            timeMin: Dates[0].toISOString(),
            timeMax: Dates[1].toISOString(),
            maxResults: 50,
            singleEvents: true,
            orderBy: 'startTime'
        }, function(err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            }
            var events = response.items;
            // console.log(events);
            if (events.length == 0) {
                console.log('No upcoming events found.');
                // res.sendStatus(500);
            } else {
                console.log('Events this week:');
                // myEvents = [];
                for (var i = 0; i < events.length; i++) {
                    var event = events[i];
                    var start = event.start.dateTime;
                    var end = event.end.dateTime;
                    var eventorganizer = event.organizer.email;
                    var eventStatus = event.status;
                    // console.log('%s - %s', start, event.summary); || event.start.date;;
                    var eventSum = event.summary;

                    var eventObject = {
                      name: eventSum,
                      starttime: start,
                      endtime: end,
                      organizer: eventorganizer,
                      status: eventStatus
                    };

                    var newEvent = eventscollection(eventObject);
                    newEvent.save().then( function(){
                      console.log("done")
                    });
                    console.log(eventObject);
                    // myEvents.push(eventAll);
                }
                // res.send(events);
            }
        });
    }
