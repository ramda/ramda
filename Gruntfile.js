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
          reporter: 'progress'
          // reporter: 'list'
          // reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    jshint: {
      files: ['gruntfile.js', '*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        evil: true,
        globals: {
        }
      }
    },

    docco: {
      doc: {
        src: ['<%= pkg.name %>.js'],
        options: {
          output: 'docs/'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-docco');

  grunt.registerTask('test', ['jshint', 'mocha']);
  grunt.registerTask('min', ['test', 'docco:doc', 'uglify']);
};



