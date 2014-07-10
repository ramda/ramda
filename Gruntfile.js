module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
        //src: ['test/**/*.js']
      }
    },

    jshint: {
      files: ['ramda.js'],
      options: {
        evil: true,
        eqnull: true
      }
    },

    docco: {
      doc: {
        src: ['<%= pkg.name %>.js'],
        options: {
          output: 'docs/'
        }
      }
    },

    benchmark: {
      all: {
        src: ['bench/*.bench.js'],
        dest: 'bench/report/bench.json',
        options: {
          displayResults: true
        }
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
        files: ['package.json', 'bower.json'],
        add: false,
        commit: false,
        createTag: false,
        push: false
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-push-release');
  grunt.loadNpmTasks('grunt-benchmark');

  grunt.registerTask('uploadBenchmarks', 'run benchmarks', function() {
    // after bench:
    // upload files in report dir to orchestrate

  });

  grunt.registerTask('dist', ['uglify', 'copy:dist']);

  grunt.registerTask('test', ['jshint', 'mochaTest:test']);
  grunt.registerTask('min', ['test', /* 'docco:doc', */ 'uglify']);
  grunt.registerTask('version', ['clean:dist', 'jshint', 'docco:doc', 'uglify', 'copy:dist']);
  grunt.registerTask('publish', ['push', 'version']);
};



