'use strict';

const gulp = require("gulp");
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const del = require('del');
const webpack = require('webpack-stream');
const sourcemaps = require('gulp-sourcemaps');
var ghPages = require('gulp-gh-pages');
const debug = require('gulp-debug');

gulp.task('styles', function () {
  return gulp.src('./src/style/main.less')
  .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./build/style'));
});

gulp.task('clean', function(){
    return del('./build');
});

gulp.task('assets', function(){
  return gulp.src('./src/assets/**')
  .pipe(gulp.dest('./build'));
});

gulp.task('js', function(){
    return gulp.src('./src/js/main.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(webpack({output: {
        filename: 'main.js'}})) 
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/js'))
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'js', 'assets')));

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});