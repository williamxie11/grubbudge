var gulp = require('gulp');

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var run = require('gulp-run');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

var bundler = watchify(browserify({
  entries: ['./src/cp'],
  standalone: 'cp',
  noparse: ['../lib/vegalite.js', '../lib/clusterfck.js'],
  // require: ['./lib/vegalite', './lib/clusterfck'],
  debug: true,
  transform: ['browserify-shim']
  // ,
  // //deal with require() in /clusterfck
  // ignoreMissing: true
}));

// builds vegalite
function bundle() {
  return bundler
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))

    .pipe(source('compass.js'))
    .pipe(buffer())
    .pipe(gulp.dest('.'))
    .pipe(sourcemaps.init({loadMaps: true}))
    // This will minify and rename to vegalite.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('.'));
}

gulp.task('build', bundle);
gulp.task('default', ['copyvl', 'test', 'build', 'watch', 'watchvl']);

// test

gulp.task('watch', function() {
  gulp.watch(['src/**', 'test/**'], ['build', 'test']);
});


var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
gulp.task('test', function() {
  return gulp.src(['test/**/*.spec.js'], { read: false })
    .pipe(mocha({ reporter: 'list' }))
    .on('error', gutil.log);
});

// copy vegalite to lib

var vlPath = '../vegalite/';
gulp.task('watchvl', function() {
  gulp.watch([vlPath + 'vegalite.js'], ['copyvl', 'build']);
});

gulp.task('copyvl', function() {
  gulp.src(vlPath+'vegalite.js')
    .pipe(gulp.dest('lib/'));
});

