express = require 'express'
gulp = require 'gulp'
pug = require 'gulp-pug'
watch = require 'gulp-watch'
copy = require 'gulp-copy'

server = express()
server.use express.static './public'
server.listen 8080

gulp.task 'pug', ->
  gulp.src 'src/screens/*.pug'
  .pipe pug
    pretty: true
  .pipe gulp.dest 'public'

gulp.task 'watch', ->
  gulp.watch 'src/**/*.*' , ['pug']

gulp.task 'copy', ->
  gulp.src 'node_modules/uswds/dist/**/*'
  .pipe copy '.'
  .pipe gulp.dest 'public/uswds'


gulp.task('default', ['copy', 'pug', 'watch'])
