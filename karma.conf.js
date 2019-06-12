//jshint strict: false
module.exports = function(config) {
    config.set({

        basePath: './app',

        files: [
            'public/bower_components/angular/angular.js',
            'public/bower_components/angular-ui-router/release/angular-ui-router.js',
            'public/bower_components/angular-mocks/angular-mocks.js',
            'public/**/*.js'
        ],

        // list of files to exclude
        exclude: [
            'app/public/bower_components/**/*.js',
            'app/public/libs/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ]

    });
};
