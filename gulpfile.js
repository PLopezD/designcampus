var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    jsonminify = require('gulp-jsonminify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber');

var env,
    jsSources,
    sassSources,
    htmlSources,
    outputDir,
    sassStyle;

env = process.env.NODE_ENV || 'development';

if (env==='development') {
  outputDir = './public/';
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
}

jsSources = ['development/js/*.js'];
sassSources = ['development/sass/*.scss'];
htmlSources = ['*.html'];

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});

gulp.task('sass', function () {
  gulp.src(sassSources)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(outputDir+'/css/'))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(sassSources, ['sass']);
  gulp.watch(jsSources, ['js']);
  gulp.watch('./*.html', ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: "./",
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    .pipe(connect.reload())
});


gulp.task('default', ['html', 'js', 'connect', 'sass','watch']);




