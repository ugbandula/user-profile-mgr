/**
 * Created by Bandula Gamage on 12/06/2019.
 */

let chakram     = require('chakram');
let expect      = chakram.expect;
let assert      = require('assert');

let apiUtils    = require('../shared/api-utils');
let userObj     = require('../../mock/objects/user');

let jsonObj         = null;
let testConditionNo = 1;

let currentTime = null;

/**
 * Event data cache management API test definitions
 */
describe('TEST USER MGT SERVICE TESTS', function () {
    this.timeout(10000);

    /**
     * *************************************************************************
     * Faults Event Retrieval API Testing Scenarios
     * *************************************************************************
     */
    before("\tInitialize local variables", function () {
        currentTime = apiUtils.getTodaysDate();
        // testModuleNo = apiUtils.getNextTestModuleNo();

    });

    it('\tTest condition #' + apiUtils.getGlobalTestConditionNo() + ' [ Scenario No: ' + getNextTestConditionNo() + ']: Create a new User Profile', function () {
        /**
         * Creates a new user profile
         */
        return chakram.post(process.env.BASE_URL + process.env.CREATE_USER_PROFILE, userObj)
            .then(function (response) {
                console.log(response.body);
                expect(response).to.have.status(200);       // Check web service status

                expect(response.body).to.not.equal(null);   // Check object validity
                jsonObj = response.body;                    // Assign the received Agreement object
                expect(jsonObj.status).to.equal('true');    // Check the return success status
            });
    });

    it('\tTest condition #' + apiUtils.getGlobalTestConditionNo() + ' [ Scenario No: ' + getNextTestConditionNo() + ']: Read User Profile', function () {
        /**
         * Reads an user profile
         */
        return chakram.get(process.env.BASE_URL + process.env.READ_USER_PROFILE + 'test6@test.com')
            .then(function (response) {
                // console.log(response.body);
                expect(response).to.have.status(200);       // Check web service status

                expect(response.body).to.not.equal(null);   // Check object validity
                jsonObj = response.body;                    // Assign the received object
                expect(jsonObj.name).to.equal('Sample User');

                /**
                 * Alter the user object values
                 */
                userObj.dateOfBirth = '24/03/1984';
            });
    });

    it('\tTest condition #' + apiUtils.getGlobalTestConditionNo() + ' [ Scenario No: ' + getNextTestConditionNo() + ']: Update User Profile', function () {
        /**
         * Updates an user profile
         */
        return chakram.put(process.env.BASE_URL + process.env.UPDATE_USER_PROFILE, userObj)
            .then(function (response) {
                console.log(response.body);
                expect(response).to.have.status(200);       // Check web service status

                expect(response.body).to.not.equal(null);   // Check object validity
                jsonObj = response.body;                    // Assign the received Agreement object
                expect(jsonObj.status).to.equal('true');    // Check the return success status
            });
    });

    it('\tTest condition #' + apiUtils.getGlobalTestConditionNo() + ' [ Scenario No: ' + getNextTestConditionNo() + ']: Read updated User Profile', function () {
        /**
         * Reads an user profile
         */
        return chakram.get(process.env.BASE_URL + process.env.READ_USER_PROFILE + 'test6@test.com')
            .then(function (response) {
                // console.log(response.body);
                expect(response).to.have.status(200);       // Check web service status

                expect(response.body).to.not.equal(null);   // Check object validity
                jsonObj = response.body;                    // Assign the received object
                expect(jsonObj.dateOfBirth).to.equal('24/03/1984'); // Check the accuracy of the updated value
            });
    });

    it('\tTest condition #' + apiUtils.getGlobalTestConditionNo() + ' [ Scenario No: ' + getNextTestConditionNo() + ']: Delete User Profile', function () {
        /**
         * Deletes an user profile
         */
        return chakram.delete(process.env.BASE_URL + process.env.UPDATE_USER_PROFILE + 'test6@test.com')
            .then(function (response) {
                console.log(response.body);
                expect(response).to.have.status(200);       // Check web service status

                expect(response.body).to.not.equal(null);   // Check object validity
                jsonObj = response.body;                    // Assign the received Agreement object
                expect(jsonObj.status).to.equal('true');    // Check the return success status
            });
    });

});

/**
 * Returns the next module level test condition/scenario no
 * @returns {number}
 */
function getNextTestConditionNo() {
    return testConditionNo++;
}
