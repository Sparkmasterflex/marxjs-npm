gulp       = require('gulp')
gutil      = require('gulp-util')
debug      = require('gulp-debug')
stylus     = require('gulp-stylus')
riot       = require('gulp-riot')
coffee     = require('gulp-coffee')
connect    = require('gulp-connect')
source     = require('vinyl-source-stream')
browserify = require('browserify')
sourcemaps = require('gulp-sourcemaps')
uglify     = require('gulp-uglify')
concat     = require('gulp-concat')
rename     = require('gulp-rename')

gulp.task 'stylus', ->
  gulp.src("./app/stylesheets/*.styl")
    .pipe(stylus())
      .on('error', gutil.log)
    .pipe(gulp.dest('./build/stylesheets'))

gulp.task 'riot', ->
  gulp.src('./app/views/*.tag')
    .pipe(riot({
      type: 'coffeescript'
      modular: true
    }))
    .pipe(gulp.dest('./build/views'))

gulp.task 'coffee', ->
  gulp.src('./app/javascripts/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./build/javascripts'))


gulp.task 'browserify', ['coffee', 'riot'],  ->
  browserify('./build/javascripts/marx.js')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build'))
  .pipe(connect.reload())


gulp.task 'watch', ->
  gulp.watch(
    [
      "./app/stylesheets/*.styl",
      "./app/javascripts/*.coffee",
      "./app/views/*.tag"
    ]
    , ['stylus', 'coffee', 'riot', 'browserify']
  )

gulp.task 'connect', ->
  connect.server
    root: '.',
    livereload: true

gulp.task 'build', ['coffee', 'riot', 'browserify'], ->
  return gulp.src('./build/bundle.js')
    .pipe(uglify())
    .pipe(rename('marx.js'))
    .pipe(gulp.dest('./'));


gulp.task 'default', ['stylus', 'coffee', 'riot', 'browserify', 'connect', 'watch']

gulp.task 'build-production', ['stylus', 'coffee', 'riot', 'browserify', 'build']