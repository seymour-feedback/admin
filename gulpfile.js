'use strict';

var gulp = require('gulp'),
  browserify = require('gulp-browserify'),
  stylus = require('gulp-stylus'),
  nib = require('nib');

gulp.task('js', function () {
  gulp
    .src('src/js/app.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function () {
  gulp
    .src('src/styles/styles.styl')
    .pipe(stylus({
      use: nib(),
      compress: true
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['js', 'css'], function () {});
