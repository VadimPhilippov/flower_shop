'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

exports.less = function () {
  return gulp
    .src(['./src/styles/styles.less', './src/styles/adaptive.less', './src/styles/theme.less'])
    .pipe(
      less().on('error', function (err) {
        console.log(err);
      }),
    )
    .pipe(concat('styles.css'))
    .pipe(
      cssmin().on('error', function (err) {
        console.log(err);
      }),
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist'));
};

exports.default = function () {
  gulp.watch('./src/styles/*.less', gulp.series('less'));
};
