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


var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds029793.mlab.com:29793/vocab');

var userSchema = mongoose.Schema({
  username: String,
  pass: String
});
var User = mongoose.model('User', userSchema);

var wordsSchema = mongoose.Schema({
  level: Number,
  words: Array
});
var Words = mongoose.model('Words', wordsSchema);

var generalSchema = mongoose.Schema({
  latestLevel: Number,
  masterPass: String
});
var General = mongoose.model('General', generalSchema);

//Setting up email
var smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Yahoo",
        auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
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
app.use(session({secret: process.env.SESSION_PASS}));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
	res.render('index');
});

app.get('/login', function(req, res) {
  res.render('login', {'reason': 'none'});
});


app.get('/word', function(req, res) {
  res.render('word', {'root': 'bell', 'rootdef': 'war', 'word': 'bellicose', 'worddef': 'demonstrating aggression and willingness to fight', 'level': 3});
});

app.get('/test', function(req, res) {
  res.render('test', {'root': 'bell', 'word': 'bellicose'});
});

app.post('/contact', function( req, res) {
	var mailOptions = {
		from: "Vocab Space Emailer <racond11@yahoo.com>",
		to: "nhuberfeely@gmail.com",
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

http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

