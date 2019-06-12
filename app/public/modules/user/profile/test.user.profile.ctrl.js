/**
 * Created by Bandula Gamage on 11/06/2019.
 */
'use strict';

angular
    .module('test.user')
    .controller('UserProfileController', UserProfileController);

UserProfileController.$inject = ['$scope', '$state', '$interval', '$mdDialog', 'mainDataService', 'KEYS'];

function UserProfileController($scope, $state, $interval, $mdDialog, mainDataService, KEYS) {

    /**
     * Initializes the controller
     */
    $scope.init = function () {
        console.log('<UserProfileController> Controller initializing');

        /**
         * Loads the cached information from localStorage if the entry exists
         */
        try {
            $scope.userProfile = JSON.parse(localStorage.getItem(KEYS.localStorageKey));
        } catch (e) {
            $scope.userProfile = null;
        }
        // console.log('<UserProfileController> Cached user profile: ' + JSON.stringify($scope.userProfile));

        /**
         * If theres no entry initialize the object
         */
        if (!$scope.userProfile) {
            $scope.userProfile = {
                name: null,
                email: null,
                dateOfBirth: null,
                location: {
                    address: null,
                    lat: null,
                    long: null
                }
            };
        }
    };
    $scope.init();

    /**
     * Checks whether the user profile record exists
     * @returns {boolean}   Boolean
     */
    $scope.isEmptyProfile = function() {
        return angular.equals($scope.userProfile.name, null);
    }

}
