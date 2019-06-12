///////////////////////////////////////////////////////////////
// Module Dependencies
///////////////////////////////////////////////////////////////
let userMgtSvc  = require('../controllers/user-mgt/user-mgt-service');

let showWelcomeMessage  = function(req, res) {
    res.json({ message: 'Welcome to User Profile Mgt API service' });
};

///////////////////////////////////////////////////////////////
// 	Expose Methods
///////////////////////////////////////////////////////////////
module.exports = function (app) {

    /**
     * -------------------------------------------------------------------------------
     * Base API welcome message
     * -------------------------------------------------------------------------------
     */
    app.get('/api', showWelcomeMessage);

    /**
     * -------------------------------------------------------------------------------
     * User Mgt Services
     * -------------------------------------------------------------------------------
     */
    app.get('/api/users/list',      userMgtSvc.readList);
    app.get('/api/users/:email',    userMgtSvc.readDetails);
    app.post('/api/users/',         userMgtSvc.createRecord);
    app.put('/api/users/',          userMgtSvc.updateRecord);
    app.delete('/api/users/',       userMgtSvc.deleteRecord);

};

