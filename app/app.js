///////////////////////////////////////////////////////////////
// Module Dependencies
///////////////////////////////////////////////////////////////
let express         = require('express');
let debug           = require('debug');
let path            = require('path');
let favicon         = require('serve-favicon');
let cookieParser    = require('cookie-parser');
let bodyParser      = require('body-parser');
let busboyBodyParser= require('busboy-body-parser');
let morgan          = require('morgan');
let fs              = require('fs');
let util            = require('util');
let winston         = require('winston');

// TODO - Dev only include
var errorhandler    = require('errorhandler');
let errorLogger     = debug('error');

let routes          = require('./routes/index');
let dbConns         = require('./controllers/cache/connector/doc-db-connector');

///////////////////////////////////////////////////////////////
// Generate Application
///////////////////////////////////////////////////////////////
let app = express();

/**
 * Introduce service specific configurations
 */
require('dotenv').config({path: __dirname + '/../.env'});
require('dotenv').config({path: __dirname + '/../.version'});

/**
 * Initialize Winston log manager
 */
// logMgr.init();

/**
 * Redirects the output to a debug file
 */
let log_file        = fs.createWriteStream(__dirname + '/../logs/console.log', {flags : 'w'});
let log_stdout      = process.stderr;

console.log = function(d) {
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

console.error = function(d) {
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

/**
 * Dump error details when the process crashes
 */
if ((process.env.ENVIRONMENT === 'DEV') || (process.env.ENVIRONMENT === 'TEST'))
    app.use(errorhandler({ dumpExceptions: true, showStack: true }));

/**
 * Displays the ASCII logo text
 */
var figlet = require("figlet");
figlet.text("User Profile Mgr", function(error, data) {
    if (error)
        console.error(error);
    else
        console.log(data);
});

/**
 * View engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * Set favourite icon
 */
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
//app.use(morgan('dev')); // log requests to the console

/**
 * Body parsers
 */
// app.use(busboyBodyParser());                        // Body parser for multi part documents
app.use(bodyParser.json());                         // Body parser for JSON messages
app.use(busboyBodyParser({ limit: '100mb', multi: true }));  // Body parser for multi part documents

/**
 * The extended option allows to choose between parsing the URL-encoded data with the querystring
 * library (when false) or the qs library (when true). The "extended" syntax allows for rich objects
 * and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
 *
 * Default is true and had been deprecated.
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(formidable.parse());        // Parses upload form data

// Error handling
app.use(logErrors);

function logErrors(err, req, res, next) {
    errorLogger(err.stack);
    next(err);
}

app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(500).send({"status" : 'Error occurred'});

    next();
});

/**
 * Initialize DB connections
 */
dbConns.initialize(function(){
    console.log('Document db connection established');
});

/**
 * Bootstrap routes
 */
require('./routes/index')(app);

module.exports = app;

/**
 * Shut down hook to understand the nature of the error
 */
process.on('unhandledRejection', (reason, p) => {
    console.error(reason);
    console.error(p);

    let log_file = fs.createWriteStream(__dirname + '/../logs/runtime-rejections.log', {flags : 'w'});
    log_file.write('\n');
    log_file.write('This will persists unhandled asynchronous rejections raised during the operation\n');
    log_file.write('PROMISE ERROR:\n');
    log_file.write('|__ time: \t ' + new Date() + '\n');
    log_file.write('|__ type: \t Unhandled rejection\n');
    log_file.write('|__ action: ' + reason + ' \n');
    log_file.write('|__ details:\n');
    log_file.write('\t|__ name: \t ' + util.format(reason.name) + '\n');
    log_file.write('\t|__ message: ' + util.format(reason.message) + '\n');
    log_file.write('\t|__ stack: \t ' + util.format(reason.stack) + '\n');
    log_file.write('\n');

    log_file.write('\n');
    log_file.write('Process Variables:\n');
    log_file.write('|__ \t ' + JSON.stringify(process.env) + '\n');
});
