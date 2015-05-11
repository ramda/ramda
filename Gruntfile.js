var envvar = require('envvar');

var TRAVIS_BRANCH       = envvar.string('TRAVIS_BRANCH', '');
var TRAVIS_BUILD_ID     = envvar.string('TRAVIS_BUILD_ID', '');
var TRAVIS_COMMIT       = envvar.string('TRAVIS_COMMIT', '');
var TRAVIS_COMMIT_RANGE = envvar.string('TRAVIS_COMMIT_RANGE', '');
var TRAVIS_NODE_VERSION = envvar.string('TRAVIS_NODE_VERSION', process.versions.node);
var TRAVIS_TAG          = envvar.string('TRAVIS_TAG', '');

var jsFiles = [
  'scripts/build',
  '**/*.js',
  '!{dist,lib/test,node_modules,bower_components}/**'
];

module.exports = function(grunt) {
  grunt.initConfig({

    benchmark: {
      all: {
        src: ['lib/bench/*.bench.js'],
        dest: 'lib/bench/report/bench.<%= (new Date()).getTime() %>.json'
      }
    },

    less: {
      'gh-pages': {
        files: {
          'dist/gh-pages/style.css': 'lib/doc/less/ramda.less'
        }
      }
    },

    jsdoc: {
      'gh-pages': {
        src: ['dist/ramda.js'],
        options: {
          template: './lib/doc/jsdoc-template',
          destination: 'dist/gh-pages/'
        }
      }
    },

    clean: {
      'gh-pages': [
        'dist/gh-pages/**/*'
      ]
    },

    copy: {
      'gh-pages': {
        files: [{
          expand: true,
          cwd: 'bower_components/bootstrap/',
          src: ['fonts/*'],
          dest: 'dist/gh-pages/'
        }, {
          src: ['dist/ramda.js'],
          dest: 'dist/gh-pages/docs/'
        }, {
          src: ['lib/doc/main.js'],
          dest: 'dist/gh-pages/docs/main.js'
        }]
      }
    },

    watch: {
      docs: {
        files: ['./Gruntfile.js', './lib/doc/*', './lib/doc/jsdoc-template/*'],
        tasks: ['gh-pages'],
        options: {
          livereload: true
        }
      },
    },
    express: {
      docs: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          bases: ['./dist/gh-pages'],
          livereload: true
        }
      }
    },
    open: {
      docs: {
        path: 'http://localhost:<%= express.docs.options.port%>/docs'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-benchmark');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');

  grunt.loadTasks('lib/grunt/tasks');

  grunt.registerTask('bench', ['benchmark', 'uploadBenchmarks']);
  grunt.registerTask('gh-pages', [
    'clean:gh-pages',
    'less:gh-pages',
    'jsdoc:gh-pages',
    'copy:gh-pages'
  ]);
  grunt.registerTask('publish-gh-pages', [
    'gh-pages',
    'push-gh-pages'
  ]);
  grunt.registerTask('serve', [
    'express',
    'open',
    'watch'
  ]);
};
