/**
 *  Created by Bandula Gamage
 */

'use strict';

/**
 * -------------------------------------------------------------------
 *  Directive Definitions
 * -------------------------------------------------------------------
 */

angular
    .module('test.user')
    .factory('userMgtService', userMgtService);

userMgtService.$inject = ['$http', '$q', 'SERVICE_URLS'];

function userMgtService($http, $q, SERVICE_URLS) {

    return {

        /**
         * Submits the collected user profile information
         */
        submitUserProfile: submitUserProfile,

        /**
         * Reads the user profile
         */
        readUserProfile: readUserProfile
    };

    /**
     * Reads user profile information
     * @param userId    User ID
     * @returns {Promise<T>}
     */
    function readUserProfile(userId) {
        return $http.get(SERVICE_URLS.readUserProfile + userId)
            .then(getServiceDataCompleted)
            .catch(getServiceDataFailed);

        function getServiceDataCompleted(response) {
            return response.data;
        }

        function getServiceDataFailed(error) {
            console.log('Read user profile details failed');
            return error;
        }
    }

    /**
     * Submits the captured user profile
     * @param formData  User profile information
     * @returns {Promise<T>}
     */
    function submitUserProfile(formData) {
        return $http.post(SERVICE_URLS.saveUserProfile, formData)
            .then(postServiceDataCompleted)
            .catch(postServiceDataFailed);

        function postServiceDataCompleted(response) {
            return response.data;
        }

        function postServiceDataFailed(error) {
            console.log('Submit User Profile data failed');
            return error;
        }
    }

}
