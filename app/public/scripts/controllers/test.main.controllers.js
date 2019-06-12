/**
 *  Created by Bandula Gamage
 */

'use strict';

/**
 * -------------------------------------------------------------------
 *  Controller Definitions
 * -------------------------------------------------------------------
 */

angular
    .module('test.main.controllers', ['test.main.services'])
    .controller('MainController', MainController);

MainController.$inject = [];

function MainController() {

    /**
     * Initializes the home scope and its variables.
     */
    function init() {
        console.log('<MainController> Application Initialized');
    }
    init();
}

/**
 * Error controler definition
 */
angular
    .module('test.main.controllers')
    .controller('ErrorController', ErrorController);

ErrorController.$inject = [];

function ErrorController() {
}
