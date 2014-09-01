/**
 * http://gruntjs.com/configuring-tasks
 */
module.exports = function (grunt) {
    var path = require('path');
    var DEMO_PATH = 'docs';
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            options: {
                hostname: '*'
            },
            demo: {
                options: {
                    port: +process.env.RAMDA_DOCS_PORT || 8000,
                    base: DEMO_PATH,
                    middleware: function (connect, options) {
                        return [
                            require('connect-livereload')(),
                            connect.static(path.resolve(options.base))
                        ];
                    }
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            less: {
                files: ['less/**/*.less'],
                tasks: ['less']
            },

            lesscopy: {
                files: ['static/styles/jaguar.css'],
                tasks: ['copy:css']
            },

            jscopy: {
                files: ['static/scripts/main.js'],
                tasks: ['copy:js']
            },

            jsdoc: {
                files: ['**/*.tmpl', '*.js', '../ramda/**/*.js'],
                tasks: ['jsdoc']
            }
        },

        clean: {
            demo: {
                src: DEMO_PATH
            }
        },

        'curl-dir': {
            'ramda': {
                src: [
                    'https://raw.githubusercontent.com/CrossEye/ramda/master/ramda.js',
                    'https://raw.githubusercontent.com/CrossEye/ramda/master/README.md'
                ],
                dest: 'src'
            }
        },

        jsdoc: {
            ramda: {
                src: ['src/ramda.js', 'src/README.md'],
                options: {
                    verbose: true,
                    destination: DEMO_PATH,
                    configure: 'conf.json',
                    template: './',
                    'private': false
                }
            }
        },

        less: {
            dist: {
                src: 'less/**/jaguar.less',
                dest: 'static/styles/jaguar.css'
            }
        },

        copy: {
            css: {
                src: 'static/styles/jaguar.css',
                dest: DEMO_PATH + '/styles/jaguar.css'
            },

            js: {
                src: 'static/scripts/main.js',
                dest: DEMO_PATH + '/scripts/main.js'
            }
        }
    });

    // Load task libraries
    [
        'grunt-contrib-connect',
        'grunt-contrib-watch',
        'grunt-contrib-copy',
        'grunt-contrib-clean',
        'grunt-contrib-less',
        'grunt-jsdoc',
        'grunt-curl'
    ].forEach(function (taskName) {
        grunt.loadNpmTasks(taskName);
    });

    // Definitions of tasks
    grunt.registerTask('default', 'Watch project files', [
        'docs',
        'connect:demo',
        'watch'
    ]);

    grunt.registerTask('docs', 'Create ramda documentations', [
        'less',
        'clean',
        'curl-dir:ramda',
        'jsdoc'
    ]);
};
