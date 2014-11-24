var envvar = require('envvar');
var sauceConf = require('./sauce/conf');
var sauceSrv = require('./sauce/server');

var ORCHESTRATE_API_KEY = envvar.string('ORCHESTRATE_API_KEY', '');
var SAUCE_ACCESS_KEY    = envvar.string('SAUCE_ACCESS_KEY', '');
var TRAVIS_BRANCH       = envvar.string('TRAVIS_BRANCH', '');
var TRAVIS_BUILD_ID     = envvar.string('TRAVIS_BUILD_ID', '');
var TRAVIS_COMMIT       = envvar.string('TRAVIS_COMMIT', '');
var TRAVIS_COMMIT_RANGE = envvar.string('TRAVIS_COMMIT_RANGE', '');
var TRAVIS_NODE_VERSION = envvar.string('TRAVIS_NODE_VERSION', process.versions.node);
var TRAVIS_TAG          = envvar.string('TRAVIS_TAG', '');

module.exports = function(grunt) {
    grunt.initConfig({

        orchestrate_token: ORCHESTRATE_API_KEY,

        mocha: {
            browser: ['test/**/*.html'],
            options: {
                run: true
            }
        },

        mochaTest: {
            docs: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/test.examplesRunner.js']
            },
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js', 'ext/**/test/*.js']
            },
            unit: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js', '!test/test.examplesRunner.js', 'ext/**/test/*.js']
            }
        },

        jscs: {
            files: ['**/*.js', '!{lib/test,node_modules}/**'],
            options: {
                config: '.jscsrc',
                excludeFiles: ['**/*.min.js']
            }
        },

        jshint: {
            files: ['**/*.js', '!{lib/test,node_modules}/**'],
            options: {
                ignores: ['**/*.min.js'],
                jshintrc: '.jshintrc'
            }
        },

        benchmark: {
            all: {
                src: ['bench/*.bench.js'],
                dest: 'bench/report/bench.<%= (new Date()).getTime() %>.json'
            }
        },

        'saucelabs-mocha': sauceConf,

        connect: sauceSrv
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-benchmark');
    grunt.loadNpmTasks('grunt-saucelabs');

    grunt.registerTask('uploadBenchmarks', 'upload benchmark report to orchestrate', function() {
        // upload files in report dir to orchestrate
        var done = this.async();
        var reportDir = 'bench/report/';
        var token = grunt.config.get('orchestrate_token');
        var db = require('orchestrate')(token);

        grunt.file.recurse(reportDir, function(abspath, rootdir, subdir, filename) {
            var json = {};
            var timestamp = filename.split('.')[1];
            if (timestamp) {
                json.timestamp = timestamp;
                json.datestamp = (new Date(+timestamp)).toISOString();
                json.platform = {
                    branch:       TRAVIS_BRANCH,
                    buildId:      TRAVIS_BUILD_ID,
                    commit:       TRAVIS_COMMIT,
                    commitRange:  TRAVIS_COMMIT_RANGE,
                    tag:          TRAVIS_TAG,
                    node:         TRAVIS_NODE_VERSION
                };
                json.report = grunt.file.readJSON(abspath);
                db.put('benchmarks', json.timestamp, json)
                    .then(function() {
                        console.log('SUCCESS');
                        grunt.file.delete(abspath);
                        done();
                    })
                    .fail(function(err) {
                        console.log('FAIL', err.body.message);
                        done();
                    });
            }
        });
    });

    grunt.registerTask('bench', ['benchmark', 'uploadBenchmarks']);
    grunt.registerTask('sauce', SAUCE_ACCESS_KEY === '' ? [] : ['connect', 'saucelabs-mocha']);
    grunt.registerTask('test', ['jshint', 'jscs', 'mochaTest:test']);
    grunt.registerTask('unittest', ['mochaTest:unit']);
    grunt.registerTask('doctest', ['mochaTest:docs']);
};
