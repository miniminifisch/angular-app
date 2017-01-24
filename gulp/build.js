// 'use strict';
//
// var path = require('path');
// var gulp = require('gulp');
// var conf = require('./conf');
// var tar = require('gulp-tar');
// var gzip = require('gulp-gzip');
// var fs = require('fs');
// var bump = require('gulp-bump');
// var deployer = require('nexus-deployer');
//
// var $ = require('gulp-load-plugins')({
//   pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
// });
//
// // Only applies for fonts from bower dependencies
// // Custom fonts are handled by the "other" task
// gulp.task('fonts', function () {
//   return gulp.src($.mainBowerFiles())
//     .pipe($.filter('**/*.{eot,otf,svg,ttf,woff,woff2}'))
//     .pipe($.flatten())
//     .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
// });
//
// gulp.task('other', function () {
//   var fileFilter = $.filter(function (file) {
//     return file.stat.isFile();
//   });
//
//   return gulp.src([
//     path.join(conf.paths.src, '/**/*'),
//     path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
//   ])
//     .pipe(fileFilter)
//     .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
// });
//
// gulp.task('clean', function () {
//   return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
// });
//
// gulp.task('bump', function(){
//   gulp.src('./package.json')
//   .pipe(bump())
//   .pipe(gulp.dest('./'));
// });
//
// gulp.task('package', function(){
//     gulp.src('dist/*').pipe(tar('vtc-static.tar')).pipe(gzip()).pipe(gulp.dest('.'));
// });
//
//
// gulp.task('build', ['html', 'fonts', 'other']);
