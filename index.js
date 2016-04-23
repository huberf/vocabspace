//Getting all dependencies
var express = require('express.io');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.http().io()

//Eventbrite ALL THE THINGS!
var Eventbrite = require('eventbrite-node');
var client = new Eventbrite('GGNFHDHYZYIPWBQV52', 'VYJYQSPUVMDZNC4RVDSOLR25UWTMDKQBEBDWCWRIHAMTZZLUCK');

client.setAccessToken('VXEBM3XN6P3QY5HAYW7Z');

var eventList =  []; //[['Hello World', 'Want to learn to code?', '#', 'images/pic04.jpg']];

//Setting up email
var smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Yahoo",
        auth: {
                user: "racond11@yahoo.com",
                pass: "racoon11"
        }
});

//Setting up the port to listen to
app.set('port', (process.env.PORT || 5000));

//Setting up the resource directory
app.use(express.static(__dirname + '/public'));

app.use( bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json());

//Setting up cookie use
app.use(cookieParser());

//Setting up session handling
app.use(session({secret: 't4gd0m1n4t10n'}));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
	res.render('index');
});

app.get('/about', function(req, res) {
	res.render('about');
});

app.get('/events', function(req, res) {
	res.render('events', {events: eventList});
});

app.get('/sponsors', function(req, res) {
	res.render('sponsors');
});

app.get('/info', function(req, res) {
  res.render('info');
});

app.get('/lineup', function(req, res) {
  res.render('lineup');
});

app.get('/elements', function(req, res) {
	res.render('elements');
});

app.post('/contact', function( req, res) {
	var mailOptions = {
		from: "TimeOut Contact <racond11@yahoo.com>",
		to: "bamakick@gmail.com",
		subject: "New Message from Website",
		text: "Name: " + req.body.name + "\n" + "Email: " + req.body.email + "\n" + "Message: " + req.body.message
	}
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if( error ) {
			console.log(error);
		} else {
			console.log('Message sent: ' + response.message);
		}
		smtpTransport.close();
	});
	res.redirect('/');
});

app.get('/eve', function(req, res) {
    console.log("GETTING EVE DATA");
    console.log("GETTING EVE DATA");
    console.log("GETTING EVE DATA");
    console.log("GETTING EVE DATA");
    console.log("GETTING EVE DATA");
    console.log("GETTING EVE DATA");
    console.log("GETTING EVE DATA");
    console.log(client.get);
    console.log("GETTING EVE DATA");
    console.log("GETTING EVE DATA");
    console.log("GETTING EVE DATA");
    console.log("GETTING EVE DATA");
    console.log("GETTING EVE DATA");
    console.log("GETTING EVE DATA");
    console.log("GETTING EVE DATA");
    client.get('/users/me', function(err, response) {
    console.log("HELLO WORLD YOU FOOL!");
    if(err) {
      console.error(err);
      return;
    }
    console.log(response);
  });
  res.send("WAT?");
});

http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

