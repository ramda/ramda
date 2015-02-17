/* global __dirname */

var path = require('path');
var ghpages = require('gh-pages');

module.exports = function(grunt) {
    grunt.registerTask('push-gh-pages', function() {
        grunt.task.requires('gh-pages');
        var done = this.async();
        var dir = path.resolve(__dirname, '../dist/gh-pages');
        grunt.log.writeln('Publishing ' + dir);
        ghpages.publish(dir, done);
    });
};
