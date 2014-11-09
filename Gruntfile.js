var sauceConf = require('./sauce/conf');
var sauceSrv = require('./sauce/server');

module.exports = function(grunt) {
    grunt.initConfig({

        orchestrate_token: process.env.ORCHESTRATE_API_KEY,

        mocha: {
            browser: ['test/**/*.html'],
            options: {
                run: true
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js', 'ext/**/test/*.js']
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
                    branch: process.env.TRAVIS_BRANCH,
                    buildId: process.env.TRAVIS_BUILD_ID,
                    commit: process.env.TRAVIS_COMMIT,
                    commitRange: process.env.TRAVIS_COMMIT_RANGE,
                    tag: process.env.TRAVIS_TAG,
                    node: process.env.TRAVIS_NODE_VERSION || process.versions.node
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
    grunt.registerTask('sauce', (function() {
        return (typeof process.env.SAUCE_ACCESS_KEY === 'undefined') ? [] : ['connect', 'saucelabs-mocha'];
    }()));
    grunt.registerTask('test', ['jshint', 'jscs', 'mochaTest:test']);
};
