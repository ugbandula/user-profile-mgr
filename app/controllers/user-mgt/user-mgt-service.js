/**
 * Created by Bandula Gamage on 11/06/2019.
 */

///////////////////////////////////////////////////////////////
// Imports
///////////////////////////////////////////////////////////////
let User    = require('../cache/model/user');

///////////////////////////////////////////////////////////////
// Global Variables
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
// Public Methods
///////////////////////////////////////////////////////////////
module.exports = {

    /**
     * Returns the saves user list
     * @param req   Request
     * @param res   Response
     */
    readList: function(req, res) {
        User.find(function(error, response) {
            if (error) {
                console.log(error);
                res.json({ status: "false", error: "Error occurred" });
            } else {
                res.json(response);
            }
        })
    },

    /**
     * Returns the selected user profile
     * @param req   Request
     * @param res   Response
     */
    readDetails: function(req, res) {
        User.find({ email: req.params.email}, function(error, response) {
            if (error) {
                console.log(error);
                res.json({ status: "false", error: "Error occurred" });
            } else {
                res.json(response);
            }
        })
    },

    /**
     * Generates a new user record
     * @param req   Request
     * @param res   Response
     */
    createRecord: function(req, res) {
        insertOrUpdateRecord(req.body, req, res);
    },

    /**
     * Updates an existing user record
     * @param req   Request
     * @param res   Response
     */
    updateRecord: function(req, res) {
        insertOrUpdateRecord(req.body, req, res);
    },

    deleteRecord: function(req, res) {

    }
};

/**
 * Inserts or updates a user profile object
 * @param record    Record
 * @param req       Request
 * @param res       Response
 */
function insertOrUpdateRecord(record, req, res) {
    User.updateOne({email: { $eq: record.email}}, record, {upsert: true}, function(error, raw) {
        // If there's an error throw the error
        if (error) {
            console.log(error);

            res.json({ status: "false", error: "Error occurred" });
        } else {
            // console.log(raw);
            console.log('User successfully generated');

            res.json({ status: "true", message: "User profile created" });
        }
    });
}
