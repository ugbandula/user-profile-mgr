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
    .directive('manageUser', manageUser);

manageUser.$inject = ['$templateCache','$http','$compile'];

function manageUser($templateCache,$http,$compile) {
    return {
        restrict: 'E',
        replace: true,

        scope: {
        },

        controller: ManageUserController,

        link: function (scope, element, attributes) {
            let htmlText = $compile($templateCache.get('ManageUserView'))(scope);
            element.html(htmlText);

            // scope.renderDetails();

            scope.$on('$destroy', function () {
                //this.$$nextSibling = null;
                element.remove();
            });
        }
    }
}
