///////////////////////////////////////////////////////////////
// Module Dependencies
///////////////////////////////////////////////////////////////
let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

///////////////////////////////////////////////////////////////
// 	Schema Definition
///////////////////////////////////////////////////////////////
let userSchema   = new Schema({
    email:  { type: String, index: true, unique: true },    // Email address

    name:           String,     // Name of the user

    dateOfBirth:    String,     // Date of Birth

    location: {
        /**
         * Address information
         */
        address:String,

        /**
         * Latitude
         */
        lat:    String,

        /**
         * Longitude
         */
        long:   String
    }
});

userSchema.index({ email : 'String' });

/**
 * Publish for reference usages
 */
module.exports = mongoose.model('User', userSchema);
