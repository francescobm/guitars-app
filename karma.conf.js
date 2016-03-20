// Karma configuration
// Generated on Sun Mar 20 2016 10:13:51 GMT+0000 (GMT Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

     plugins: [
            'karma-browserify',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-jasmine-jquery',
            'karma-ng-html2js-preprocessor'
          ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine-jquery', 'jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/angular/angular.js',
      'bower_components/firebase/firebase.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/angular-bootstrap/*.min.js',
      'bower_components/angular-messages/*.min.js',
      'bower_components/angular-ui-router/release/*.min.js',
      'bower_components/angularfire/dist/*.min.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/app/index.es6',
      'src/test/**/*.es6',
      'src/**/*tmpl.html'
    ],
    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/app/**/*.es6': ['browserify'],
      'src/test/**/*.es6': ['browserify'],
      '**/*tmpl.html': ['ng-html2js']
    },

     browserify: {
       debug: true,
       transform: [
         ['babelify', {
          presets: ["es2015"]}
          ]
       ],
       extensions: ['.es6']
     },

     ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'src/',
      // the name of the Angular module to create
      moduleName: "templates"
    },

   

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
