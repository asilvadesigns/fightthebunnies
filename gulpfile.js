//
//  Require
var gulp   = require('gulp');
var auto   = require('gulp-autoprefixer');
var comb   = require('gulp-csscomb');
var cp	   = require('child_process');
var nano   = require('gulp-cssnano');
var scss   = require('gulp-sass');
var sync   = require('browser-sync');
var ugly   = require('gulp-uglify');
var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

//
//  Paths
var paths = {
  css: {
    src:        './_assets/scss/**/*.scss',
    dist:       './css/',
    jekyllSrv:  './_site/css/'
  },
  js: {
    src:        './_assets/js/**/*.js',
    dist:       './js/',
    jekyllSrv:  './_site/js/'
  },
  html:    { src: [ './_includes/*', './_layouts/*', './_pages/*', './_posts/*', './_projects' ] },
  jekyll:  { src: './_site/' }
}

//
//  Tasks
gulp.task('default',
  gulp.series(
    Jekyll,
    Styles,
    Scripts,
    gulp.parallel(Serve, Watch)
  )
)

//
//  Task Jekyll - spawn jekyll task in new terminal, when finished, callback
function Jekyll(done) {
  return cp.spawn(jekyll , ['build'], {stdio: 'inherit'}).on('close', done);
}

//
//  Task Serve - initialize and start browser-sync at jekyll directory
function Serve() {
  sync.init({
    server: paths.jekyll.src,
    notify: false
  })
}

//
//  Task Styles - build stylesheets
function Styles() {
  return gulp.src(paths.css.src)
    .pipe(scss().on('error', scss.logError))
    .pipe(auto({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(nano())
    .pipe(gulp.dest(paths.css.jekyllSrv))
    .pipe(gulp.dest(paths.css.dist))
    .pipe(sync.stream());
}

//
//  Task Scripts - build javascript
function Scripts() {
  return gulp.src(paths.js.src)
    .pipe(ugly())
    .pipe(gulp.dest(paths.js.jekyllSrv))
    .pipe(gulp.dest(paths.js.dist))
    .pipe(sync.stream());
}

//
//  Task Reload - reload browser
function Reload() {
  sync.reload();
}

//
//  Task Watch - watch for files and take action accordingly
function Watch() {
  gulp.watch(paths.html.src).on('change', gulp.series(Jekyll, Reload));
  gulp.watch(paths.css.src).on('change', Styles);
  gulp.watch(paths.js.src).on('change', Scripts);
}
