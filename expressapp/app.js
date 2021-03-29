var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');


//const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var indexRouter = require('./routes/index');

let expressApp;


console.log("in ready");
expressApp = express();

var handlebars = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    defaultLayout: 'layout',
    extname: 'hbs',
    helpers: {
        // put all of your helpers inside this object
    }
});

expressApp.engine('hbs', handlebars.engine);
expressApp.set('view engine', 'hbs');
expressApp.set('views', path.join(__dirname, "views"));

expressApp.use(logger('dev'));
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));
expressApp.use(cookieParser());
expressApp.use(express.static(path.join(__dirname, 'public')));
expressApp.use('/jquery', express.static(__dirname + '/../node_modules/jquery/dist/'));

expressApp.use('/', indexRouter);

// catch 404 and forward to error handler
expressApp.use(function(req, res, next) {
    next(createError(404));
});

// error handler
expressApp.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('layouts/error');
});

/*// Connection URL
// process.argv[2] is the first arg, the shared directory
const mongoKeys = JSON.parse(fs.readFileSync(path.join(process.argv[2], 'atlas.keys.json'), 'utf8'));
const mongoUsername = mongoKeys.username;
const mongoPassword = mongoKeys.password;
const url = "mongodb+srv://" + mongoUsername + ":" + mongoPassword + "<cluster-name>";

// Database Name
const dbName = 'annotationData';

let db;
let annotationsCollection;

console.log("before MongoClient");
const client = new MongoClient(url, { useNewUrlParser: true });
console.log("after MongoClient");
// Use connect method to connect to the Server
client.connect(function(err) {
console.log("after MongoClient connect");
console.log("err");
console.log(err);
assert.equal(null, err);
console.log("Connected successfully to server");

db = client.db(dbName);

annotationsCollection = db.collection('annotations');
commandsCollection = db.collection('commands');
annotationLevelComments = db.collection('annotationComments');
// Set this locals property so that we can access the collections
    // from other parts of the app (e.g., within the req object in
    // in request callbacks)
expressApp.locals.annotationsCollection = annotationsCollection;
expressApp.locals.commandsCollection = commandsCollection;
expressApp.locals.annotationLevelComments = annotationLevelComments;*/
    
// ------------------------------
var debug = require('debug')('expressapp:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
expressApp.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(expressApp);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
    // named pipe
    return val;
    }

    if (port >= 0) {
    // port number
    return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
    throw error;
    }

    var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
    default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

// ------------------------------

// Capturing the window ID, so that later in router files we can send messages to a particular window
expressApp.locals.browserWinIDs = {};

//});
  
module.exports = expressApp;