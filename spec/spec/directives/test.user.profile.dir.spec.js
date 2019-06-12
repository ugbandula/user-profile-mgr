/**
 * Created by Bandula Gamage on 12/06/2019.
 */
let testUtils       = require('../../shared/test-utils');
let testConditionNo = 1;

/**
 * Manage user view unit tests
 */
describe('Unit testing great quotes', function() {
    var $compile,
        $rootScope;

    // Load the app module, which contains the directive
    // beforeEach(module('testApp'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('\tTest condition #' + apiUtils.getGlobalTestConditionNo() + ' [ Scenario No: ' + getNextTestConditionNo() + ']: View user profile template testing', function () {
        /**
         * Compiles a piece of HTML containing the directive
         */
        var element = $compile("<user-profile></user-profile>")($rootScope);
        /**
         * Fire all the watches, so the scope expression {{1 + 1}} will be evaluated
         */
        $rootScope.$digest();
        /**
         * Checks that the compiled element contains the templated content
         */
        expect(element.html()).toContain("View User Profile");
    });
});

/**
 * Returns the next module level test condition/scenario no
 * @returns {number}
 */
function getNextTestConditionNo() {
    return testConditionNo++;
}
