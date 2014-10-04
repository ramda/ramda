var sauceConf = require('./sauce/conf');
var sauceSrv = require('./sauce/server');

module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        orchestrate_token: process.env.ORCHESTRATE_API_KEY,

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= pkg.name %>.js']
                }
            }
        },

        mocha: {
            browser: ['test/**/*.html'],
            options: {
                run: true
            }
        },

        mochaTest: {
            test: {
                options: {
                    // reporter: 'progress'
                    // reporter: 'list'
                    reporter: 'spec'
                },
                src: ['test/**/*.js', 'ext/**/test/*.js']
            }
        },

        jscs: {
            files: ['**/*.js', '!{lib/test,node_modules,sauce}/**'],
            options: {
                config: '.jscsrc',
                excludeFiles: ['**/*.min.js']
            }
        },

        jshint: {
            files: ['**/*.js', '!{lib/test,node_modules,sauce}/**'],
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

        clean: {
            dist: {
                src: ['dist']
            }
        },

        copy: {
            dist: {
                files: [
                    {expand: true, src: ['docs/*'], dest: 'dist/docs'},
                    {expand: true, src: ['ramda.js', 'package.json', 'bower.json', 'LICENSE.txt', 'README.md'], dest: 'dist'}
                ]
            }
        },

        push: {
            options: {
                files: ['package.json', 'bower.json', 'ramda.js'],
                add: false,
                commit: false,
                createTag: false,
                push: false
            }
        },

        'saucelabs-mocha': sauceConf,

        connect: sauceSrv
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-push-release');
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
    grunt.registerTask('dist', ['uglify', 'copy:dist']);
    grunt.registerTask('min', ['jshint', 'mochaTest:test', 'uglify']);
    grunt.registerTask('publish', ['push', 'version']);
    grunt.registerTask('sauce', (function() {
        return (typeof process.env.SAUCE_ACCESS_KEY === 'undefined') ? [] : ['connect', 'saucelabs-mocha'];
    }()));
    grunt.registerTask('test', ['jshint', 'jscs', 'mochaTest:test']);
    grunt.registerTask('version', ['clean:dist', 'jshint', 'uglify', 'copy:dist']);
};
