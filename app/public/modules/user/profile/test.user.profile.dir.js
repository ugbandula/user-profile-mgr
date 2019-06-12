/**
 * Created by Bandula Gamage on 11/06/2019.
 */

'use strict';

/**
 * -------------------------------------------------------------------
 *  Directive Definitions
 * -------------------------------------------------------------------
 */

angular
    .module('test.user')
    .directive('userProfile', userProfile);

userProfile.$inject = ['$templateCache','$http','$compile'];

function userProfile($templateCache,$http,$compile) {
    return {
        restrict: 'E',
        replace: true,

        scope: {
        },

        controller: UserProfileController,

        link: function (scope, element, attributes) {
            let htmlText = $compile($templateCache.get('UserProfileView'))(scope);
            element.html(htmlText);

            // scope.renderDetails();

            scope.$on('$destroy', function () {
                //this.$$nextSibling = null;
                element.remove();
            });
        }
    }
}
