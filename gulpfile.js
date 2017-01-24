(function () {
  'use strict';

  /**
   * gulp serve :
   serve application on http://localhost:9000

   * gulp serve watch :
   serve application on http://localhost:9000 and reload it when updating a file

   * gulp build :
   build the application on "/dist" folder

   * gulp serve-dist :
   serve builded application (dist folder) on http://localhost:9000

   */

  var _ = require('underscore');
  var concat = require('gulp-concat');
  var connect = require('gulp-connect');
  var del = require('del');
  var fs = require('fs');
  var gulp = require('gulp');
  var gulpFilter = require('gulp-filter');
  var gulpif = require('gulp-if');
  var ngAnnotate = require('gulp-ng-annotate');
  var inject = require('gulp-inject');
  var mainBowerFiles = require('main-bower-files');
  var minifycss = require('gulp-clean-css');
  var path = require('path');
  var proxy = require('http-proxy-middleware');
  var rename = require('gulp-rename');
  var replace = require('gulp-replace');
  var rev = require('gulp-rev');
  var runSequence = require('run-sequence');
  var uglify = require('gulp-uglify');
  var livereload = require('gulp-livereload');
  var templateCache = require('gulp-angular-templatecache');
  var sourcemaps = require('gulp-sourcemaps');
  var sass = require('gulp-sass');
  var series = require('stream-series');
  var packageJson = JSON.parse(fs.readFileSync('./package.json'));
  var distFolder = 'docker/dist/' + packageJson.name;
  var gulpProtractorAngular = require('gulp-angular-protractor');

  gulp.task('default', ['serve']);

  var src = {
    applicationScripts: [
      'src/app/*.module.js',
      'src/**/*.js',
      '!src/i18n/*.json',
      '!src/**/*.spec.js',
      '!src/**/*___jb_old___',
      '!src/rs/**',
      '!src/bower_components/**'
    ],
    applicationStyle: [
      'src/index.scss',
      'src/app/**/*.css',
      'src/app/**/*.scss',
      'src/css/**/*.css',
      'src/css/**/*.scss'
    ],
    applicationTemplates: [
      'src/**/*.html',
      '!src/bower_components/**'
    ],
    applicationTests: [
      'src/**/*.spec.js',
      '!src/bower_components/**'
    ],
    vendorScripts: gulp.src(mainBowerFiles()).pipe(gulpFilter('**/*.js')),
    vendorStyle: gulp.src(mainBowerFiles()).pipe(gulpFilter('**/*.css')),
    devStyle: [
      'dev/**/*.css'
    ]
  };

  gulp.task('build', function (callback) {
    return runSequence(
      ['clean'],
      [
        'build-app-scripts',
        'build-app-styles',
        'build-app-templates',
        'build-vendor-scripts',
        'build-vendor-styles',
        'copy-app-assets',
        'copy-garden-fonts',
        'copy-index-html',
        'copy-i18n',
        'copy-mock',
        'copy-fonts',
        'copy-images',
        'copy-docs'
      ],
      ['inject'],
      callback);
  });


  gulp.task('serve', function (callback) {
    return runSequence(
      ['clean-dev'],
      ['compile-dev-styles'],
      ['inject-dev'],
      ['serve-static'],
      ['watch-compile-dev-styles'],
      callback);
  });

  gulp.task('watch-compile-dev-styles', function (callback) {
    gulp.watch(src.applicationStyle, ['compile-dev-styles']);
  });

  function serve(root, livereload) {
    return connect.server({
      root: root,
      port: 9000,
      livereload: !!livereload
    });
  }

  gulp.task('serve-static', function () {
    return serve(['dev', 'src'], 'LIVE_RELOAD');
  });

  gulp.task('serve-dist', function () {
    return serve(distFolder);
  });

  gulp.task('remove-translations', function () {
    return del(distFolder + '/i18n/*.json');
  });

  gulp.task('remove-dist-sources', function () {
    return del(distFolder);
  });

  gulp.task('clean', function () {
    return del('./docker/dist');
  });

  gulp.task('clean-dev', function () {
    return del('./dev');
  });

  gulp.task('build-app-scripts', function () {

    var isFinalVersion = (packageJson.version).indexOf('SNAPSHOT') === -1
      && (packageJson.version).indexOf('RC') === -1 ;

    return gulp.src(src.applicationScripts)
      .pipe(gulpif(!isFinalVersion, sourcemaps.init()))
      .pipe(concat('scripts.js'))
      .pipe(ngAnnotate())
      .pipe(uglify({
        compress: {
          drop_console: true
        }
      }))
      .pipe(rename({suffix: '.min'}))
      .pipe(rev())
      .pipe(gulpif(!isFinalVersion,sourcemaps.write()))
      .pipe(gulp.dest(distFolder + '/scripts/'));
  });

  gulp.task('build-app-styles', function () {
    var series = require('stream-series');
    return series(gulp.src('src/index.scss'),
      gulp.src('src/app/**/*.css'),
      gulp.src('src/css/**/*.scss'),
      gulp.src('src/css/**/*.css'),
      gulp.src('src/app/**/*.scss'))
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('style.css'))
      .pipe(minifycss())
      .pipe(rename({suffix: '.min'}))
      .pipe(rev())
      .pipe(gulp.dest(distFolder + '/styles/'));
  });

  gulp.task('build-app-templates', function () {
    return gulp.src(src.applicationTemplates)
      .pipe(templateCache())
      .pipe(rev())
      .pipe(gulp.dest(distFolder + '/templates/'));
  });

  gulp.task('build-vendor-scripts', function () {

    return src.vendorScripts
      .pipe(concat('vendor.js'))
      .pipe(ngAnnotate()) // Requested for fwk-anguarjs1-ng
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(rev())
      .pipe(gulp.dest(distFolder + '/scripts/'));
  });

  gulp.task('build-vendor-styles', function () {

    return src.vendorStyle
      .pipe(concat('vendor.css'))
      .pipe(minifycss())
      .pipe(rename({suffix: '.min'}))
      .pipe(rev())
      .pipe(gulp.dest(distFolder + '/styles/'));
  });

  gulp.task('copy-app-assets', function () {

    return gulp.src(['./src/assets/**/*.jpg', './src/assets/**/*.png', './src/assets/**/*.ico'])
      .pipe(gulp.dest(distFolder + '/assets'));
  });

  gulp.task('copy-garden-fonts', function () {
    return gulp.src(['./src/bower_components/garden/dist/fonts/*.woff',
      './src/bower_components/garden/dist/fonts/*.eot',
      './src/bower_components/garden/dist/fonts/*.ttf'])
      .pipe(gulp.dest(distFolder + '/fonts'));
  });

  gulp.task('copy-images', function () {

    return gulp.src('./src/images/**/*.*')
      .pipe(gulp.dest(distFolder + '/images'));
  });

  gulp.task('copy-index-html', function () {

    return gulp.src('./src/index.html')
      .pipe(gulp.dest(distFolder));
  });

  gulp.task('copy-i18n', function () {

    return gulp.src('./src/i18n/*.json')
      .pipe(gulp.dest(distFolder + '/i18n'));
  });

  gulp.task('copy-mock', function () {

    return gulp.src('./src/mock/*.json')
      .pipe(gulp.dest(distFolder + '/mock'));
  });

  gulp.task('copy-docs', function () {

    return gulp.src('./src/docs/*.*')
      .pipe(gulp.dest(distFolder + '/docs'));
  });

  gulp.task('copy-fonts', function () {

    return gulp.src([
      './src/fonts/**/*.*',
      './src/bower_components/font-awesome/fonts/*.*'])
      .pipe(gulp.dest(distFolder + '/fonts'));
  });

  gulp.task('inject', function () {

    var applicationStyle = gulp.src(['./styles/style*.css'], {read: false, cwd: __dirname + '/' + distFolder});
    var applicationScript = gulp.src(['./scripts/scripts*.js'], {read: false, cwd: __dirname + '/' + distFolder});
    var applicationTemplate = gulp.src(['./templates/templates*.js'], {read: false, cwd: __dirname + '/' + distFolder});
    var vendorStyle = gulp.src(['./styles/vendor*.css'], {read: false, cwd: __dirname + '/' + distFolder});
    var vendorScript = gulp.src(['./scripts/vendor*.js'], {read: false, cwd: __dirname + '/' + distFolder});

    return gulp.src(distFolder + '/index.html')
      .pipe(inject(applicationStyle, {name: 'application', addRootSlash: false}))
      .pipe(inject(applicationScript, {name: 'application', addRootSlash: false}))
      .pipe(inject(applicationTemplate, {name: 'templates', addRootSlash: false}))
      .pipe(inject(vendorStyle, {name: 'vendor', addRootSlash: false}))
      .pipe(inject(vendorScript, {name: 'vendor', addRootSlash: false}))
      .pipe(gulp.dest(distFolder));
  });

  gulp.task('compile-dev-styles', function(){

    return gulp.src(src.applicationStyle)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dev/styles'));

  });

  gulp.task('inject-dev', function () {

    return gulp.src('./src/index.html')
      .pipe(inject(series(gulp.src(src.devStyle, {read: false})), {name: 'application', ignorePath: 'dev'}))
      .pipe(inject(gulp.src(src.applicationScripts, {read: false}), {name: 'application', ignorePath: 'src'}))
      .pipe(inject(src.vendorStyle, {name: 'vendor', ignorePath: 'src'}))
      .pipe(inject(src.vendorScripts, {name: 'vendor', ignorePath: 'src'}))
      .pipe(gulp.dest('./dev/'));
  });

  gulp.task('reload', function () {
    return gulp.src('./src/index.html')
      .pipe(livereload());
  });

  gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(src.applicationTemplates.concat(src.applicationScripts, src.applicationStyle), ['reload']);
  });

  gulp.task('protractor', function() {
    return gulp.src(src.applicationTests)
      .pipe(gulpProtractorAngular({
        'configFile': 'protractor-config.js',
        'debug': false,
        'autoStartStopServer': true
      }));
  });
})();
