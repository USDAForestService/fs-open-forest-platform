express = require 'express'
gulp = require 'gulp'
pug = require 'gulp-pug'
sass = require 'gulp-sass'
watch = require 'gulp-watch'

gulp.task 'server', ->
  server = express()
  server.use express.static './dist'
  server.listen 4200

gulp.task 'pug', ->
  gulp.src 'src/screens/*.pug'
  .pipe pug
    pretty: true
  .pipe gulp.dest 'dist'

gulp.task 'sass', ->
  gulp.src 'src/*.sass'
  .pipe sass()
  .pipe gulp.dest 'dist'

gulp.task 'watch', ->
  gulp.watch 'src/**/*.*' , ['pug', 'sass']

gulp.task 'copyStyles', ->
  gulp.src 'node_modules/uswds/dist/**/*'
  .pipe gulp.dest 'dist/uswds'

gulp.task 'copyImages', ->
  gulp.src 'src/images/*.*'
  .pipe gulp.dest 'dist/'

gulp.task('build', ['copyStyles', 'copyImages', 'pug', 'sass'])
gulp.task('default', ['server', 'copyStyles', 'copyImages', 'pug', 'sass', 'watch'])
