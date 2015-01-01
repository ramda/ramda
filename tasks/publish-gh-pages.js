var path = require('path');
var ghpages = require('gh-pages');

module.exports = function(grunt) {
    grunt.registerTask('publish-gh-pages', function() {
        var done = this.async();
        var dir = path.resolve(__dirname, '../dist/gh-pages');
        grunt.log.writeln('Publishing ' + dir);
        ghpages.publish(dir, done);
    });
};
