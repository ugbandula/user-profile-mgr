#!/usr/bin/env node

/**
 * Module dependencies.
 */
let app     = require('../app');
let debug   = require('debug')('user-profile-mgr:server');
let http    = require('http');

process.title = process.argv[2] || 'user-profile-mgr';

console.log("Starting '" + process.title + "', please wait");

/**
 * Get port from environment and store in Express.
 */
let port = normalizePort(process.env.SERVER_LISTENING_PORT || '8082');
app.set('port', port);

/**
 * Create HTTP server.
 */
let server = http.createServer(app);

/**
 * Start the HTTP Server.
 * It will listen on provided port, on all network interfaces.
 */
server.listen(port, function() {
    console.log((new Date()) + ' Server is listening on port ' + port);
    // console.log((new Date()) + ' Server is listening on port ' + port);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    let port = parseInt(val, 10);

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

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            throw error;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            throw error;
        default:
            console.log(error);
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
