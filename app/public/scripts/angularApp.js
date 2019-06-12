/**
 *  Created by Bandula Gamage
 */

//============================================================================
// MODULE DECLARATION
// - Declare app level modules which depends on filters, and services
//============================================================================
"use strict";

var smartApp = angular.module('testApp', [
    'ui.router',                        // Angular ui-router
    'ui.bootstrap',                     // Angular ui bootstrap
    'ngMaterial',                       // Angular material theme
    'ngAnimate',                        // Angular animations
    'leaflet-directive',                // Angular leaflet
    'test.config',                      // Test configurations and constant declarations
    'test.main.services',               // Main services
    'test.main.controllers',            // Main controllers
    // 'test.main.directives',             // Main directives
    'test.dashboard',                   // Dashboard view
    'test.user'                         // User Management View
]);

// Listens to Route Change events and validates those actions and take
// appropriate actions.

smartApp.run(['$http', '$templateCache',
    function($http, $templateCache) {
        let tpl = "/modules/user/manage/test.user.manage.view.html";
        $http.get(tpl)
            .then(function (response) {
                $templateCache.put('ManageUserView', response.data);
            });

        let tpl2 = "/modules/user/profile/test.user.profile.view.html";
        $http.get(tpl2)
            .then(function (response2) {
                $templateCache.put('UserProfileView', response2.data);
            });
    }
]);
