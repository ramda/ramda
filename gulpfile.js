var gulp = require('gulp');

var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var header = require('gulp-header');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');
var moment = require('moment');

var pkg = require('./package.json');
var hintConfig = {
    evil: true
};

gulp.task('clean', function() {
    gulp.src('./dist')
        .pipe(clean());
});

gulp.task('hint', function() {
    gulp.src('ramda.js')
        .pipe(jshint(hintConfig))
        .pipe(jshint.reporter('default'));
});

gulp.task('min', function() {
    var banner = '/*! <%= pkg.name %> <%= pkg.version %>: ' + moment().format('YYYY-MM-DD') + ' */\n';
    gulp.src('ramda.js')
        .pipe(uglify())
        .pipe(header(banner, {'pkg': pkg}))
        .pipe(rename('ramda.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('test', function() {
    gulp.run('hint');
    gulp.src('test/**/*.js')
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', function(){
    gulp.run('hint', 'min');

    // Watch For Changes To Our JS
    gulp.watch('ramda.js', function(){
        gulp.run('hint', 'min');
    });
});