///////////////////////////////////////////////////////////////
// Module Dependencies
///////////////////////////////////////////////////////////////
let mongoose    = require('mongoose');
let dbConn      = null;  // Document db connection

///////////////////////////////////////////////////////////////
// 	Expose Methods
///////////////////////////////////////////////////////////////
module.exports = {
    /**
     * Initializes the document db connection
     */
    initialize: function (callback) {
        console.log('Establishing MongoDB connection...');

        initDBConnection(callback);
    }
};

/**
 * Establishes the MongoDB connection to the defined host & database
 * @param callback
 */
function initDBConnection(callback) {
    dbConn = mongoose.connect(
        // Mongo DB URL
        'mongodb://' +
        process.env.MONGO_DB_SERVER + ':' +
        process.env.MONGO_DB_PORT + '/' +
        process.env.MONGO_DB_DATABASE,

        // Prompt to use the new URL parser
        { useNewUrlParser: true },

        // Callback
        function(error, res) {
            if (error) {
                console.log('MongoDB connection failed!');
                logMgr.logger().log('info', 'MongoDB connection failed!');
                process.exit(0);
                return;
            }

            callback(null, res);
        });    // connect to our database
}

