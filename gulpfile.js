var gulp = require('gulp');

var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var header = require('gulp-header');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');
var moment = require('moment');
var istanbul = require('gulp-istanbul');
var lib = 'ramda.js';

var pkg = require('./package.json');
var hintConfig = {
    evil: true,
    eqnull: true
};

gulp.task('clean', function() {
    gulp.src('./dist')
        .pipe(clean());
});

gulp.task('hint', function() {
    gulp.src(lib)
        .pipe(jshint(hintConfig))
        .pipe(jshint.reporter('default'));
});

gulp.task('min', function() {
    var banner = '/*! <%= pkg.name %> <%= pkg.version %>: ' + moment().format('YYYY-MM-DD') + ' */\n';
    gulp.src(lib)
        .pipe(uglify())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(rename('ramda.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('cover', function(cb) {
    gulp.src(lib)
        .pipe(istanbul())
        .on('end', cb);
});

gulp.task('test', function() {
    gulp.run('hint');
    gulp.src('test/**/*.js')
        .pipe(mocha({reporter: 'spec'}));
});

// Run tests and output reports
gulp.task('test2', function() {
    gulp.run('cover', function() {
        gulp.src('test/*.js')
            .pipe(mocha({reporter: 'spec'})) // Run any unit test frameworks here
            .pipe(istanbul.writeReports());
    });
});

gulp.task('default', function() {
    gulp.run('hint', 'min');

    // Watch For Changes To Our JS
    gulp.watch(lib, function() {
        gulp.run('hint', 'min');
    });
});
