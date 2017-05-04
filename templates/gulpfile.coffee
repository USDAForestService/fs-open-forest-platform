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
  gulp.src 'src/*.scss'
  .pipe sass()
  .pipe gulp.dest 'dist'

gulp.task 'watch', ->
  gulp.watch 'src/**/*.*' , ['pug', 'sass']

gulp.task 'copyUswdsFonts', ->
  gulp.src 'node_modules/uswds/dist/fonts/**/*'
  .pipe gulp.dest 'dist/fonts'

gulp.task 'copyUswdsImages', ->
  gulp.src 'node_modules/uswds/dist/img/**/*'
  .pipe gulp.dest 'dist/img'

gulp.task 'copyUswdsJs', ->
  gulp.src 'node_modules/uswds/dist/js/**/*'
  .pipe gulp.dest 'dist/js'

gulp.task 'copyFavicons', ->
  gulp.src 'src/favicons/**/*.*'
  .pipe gulp.dest 'dist/'

gulp.task 'copyImages', ->
  gulp.src 'src/img/*.*'
  .pipe gulp.dest 'dist/img'

gulp.task 'build', [
  'copyFavicons'
  'copyUswdsFonts'
  'copyUswdsImages'
  'copyUswdsJs'
  'copyImages'
  'pug'
  'sass'
]
gulp.task 'default', [
  'copyFavicons'
  'server'
  'copyUswdsFonts'
  'copyUswdsImages'
  'copyUswdsJs'
  'copyImages'
  'pug'
  'sass'
  'watch'
]
