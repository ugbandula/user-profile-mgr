/**
 * Created by Bandula Gamage on 11/06/2019.
 */
'use strict';

angular
    .module('test.dashboard')
    .controller('DashboardController', DashboardController);

DashboardController.$inject = ['$scope', 'KEYS'];

function DashboardController($scope, KEYS) {

    /**
     * Initializes the controller
     */
    $scope.init = function () {
        console.log('<DashboardController> Controller initializing');

        /**
         * Loads the cached information from localStorage if the entry exists
         */
        try {
            $scope.userProfile = JSON.parse(localStorage.getItem(KEYS.localStorageKey));
        } catch (e) {
            $scope.userProfile = null;
        }
        // console.log('<DashboardController> Cached user profile: ' + JSON.stringify($scope.userProfile));

        /**
         * If theres no entry initialize the object
         */
        if (!$scope.userProfile) {
            $scope.userProfile = {
                name: null,
                email: null,
                dataOfBirth: null,
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
     * Checks whether a profile exists
     * @returns {boolean}
     */
    $scope.isEmptyProfile = function() {
        return angular.equals($scope.userProfile.name, null);
    }
}
