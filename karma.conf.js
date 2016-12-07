// Karma configuration
// Generated on Wed Nov 23 2016 11:33:46 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [ 'jasmine' , 'fixture' ],


    // list of files / patterns to load in the browser
    files: [
      'src/js/*.js',
      'test/js/*.js',
      'test/fixtures/*.html',
      'test/fixtures/*.json',
    ],


    // list of files to exclude
    exclude: [
      '**/*.swp',
      '**/*.swo',
      '**/*.swn'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '**/*.html' : ['html2js'] ,
        '**/*.json' : ['json_fixtures'] , 
    },

    // this fixes a bug that the fucking asshole developer didn't update in the documentation since 2015...
    // https://github.com/billtrik/karma-fixture/issues/10
    // this is why people don't test javascript.. the testing libraries aren't fucking tested!
    jsonFixturesPreprocessor: {
        variableName: '__json__',
        transformPath: function(path) {
            return path + '.js';
        }
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
