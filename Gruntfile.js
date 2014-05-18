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
        src: ['test/**/*.js']
      }
    },

    jshint: {
      files: ['ramda.js'],
      options: {
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
  grunt.loadNpmTasks('grunt-push-release');

  grunt.registerTask('coverage', 'Code coverage', function() {
    var shell = require('child_process').exec;
    console.log('pwd:', process.cwd());
    var cmd = 'istanbul cover ./node_modules/grunt-mocha/node_modules/mocha/bin/_mocha';
    shell(cmd, function(err, stdout, stderr) {
      console.log('callback');
      if (err) {
        console.log('err');
        console.warn(stderr);
      } else {
        console.log('ok');
        console.log(stdout);
      }
    });
  });
  grunt.registerTask('test', ['jshint', 'mochaTest:test']);
  grunt.registerTask('min', ['test', /* 'docco:doc', */ 'uglify']);
};



