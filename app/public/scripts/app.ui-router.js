/**
 * Created by Bandula Gamage on 11/06/2019.
 */
'use strict';

angular
    .module('testApp')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                ////////////////////
                // Home Page view //
                ////////////////////
                .state("/", {
                    url: "/",
                    templateUrl: "modules/dashboard/test.dashboard.view.html",
                    controller: DashboardController
                })
                .state("dashboard", {
                    url: "/dashboard",
                    templateUrl: "modules/dashboard/test.dashboard.view.html",
                    controller: DashboardController
                })
                .state("manage-user", {
                    url: "/manage-user",
                    templateUrl: "modules/user/manage/test.user.manage.view.html",
                    controller: ManageUserController
                })
                .state("user-profile", {
                    url: "/user-profile",
                    templateUrl: "modules/user/profile/test.user.profile.view.html",
                    controller: UserProfileController
                })

                ////////////////////
                // 404 Error Page //
                ////////////////////
                .state("404", {
                    url: "/404",
                    templateUrl: "views/404.html",
                    controller: "ErrorController"
                });

            // Send to login if the URL was not found
            $urlRouterProvider.otherwise("/");
        }
    ]);
