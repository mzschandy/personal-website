var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var $             = require('gulp-load-plugins')();
var autoprefixer  = require('autoprefixer');

var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src',
  'assets/scss'
];

const PATHS = {
  dist: './_build',
  assets: [
    "assets/**/*",
    "!assets/{scss,js}/**/*"
  ],
  pages: "pages/**/*.html"
};

function sass() {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest(PATHS.dist + '/css'))
    .pipe(browserSync.stream());
};

function pages() {
  return gulp.src(PATHS.pages)
  .pipe(gulp.dest( PATHS.dist));

}
function copy(){
  return gulp.src(PATHS.assets)
  .pipe(gulp.dest(PATHS.dist + '/assets'));

}
function javascript() {
  //for now just copy, but I want to investigate building js files
  return gulp.src('assets/js/**/*.js')
  .pipe(gulp.dest(PATHS.dist + '/js'));

}

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  //for now this does nothing, but we could add clearing the dist folder in future
  done();
}

function serve() {
  browserSync.init({
    server: PATHS.dist
  });

  gulp.watch(PATHS.assets, copy);
  gulp.watch('pages/**/*.html').on('all', gulp.series(pages, browserSync.reload));
  //gulp.watch("scss/*.scss", sass);
  gulp.watch("assets/scss/**/*.scss").on('all', sass);
  //gulp.watch("*.html").on('change', browserSync.reload);
  
  gulp.watch('assets/js/**/*.js').on('all', gulp.series(javascript, browserSync.reload));
}

//gulp.task('sass', sass);
//gulp.task('serve', gulp.series('sass', serve));
gulp.task('build', gulp.series(clean, gulp.parallel(javascript, pages, copy), sass));
//gulp.task('default', gulp.series('sass', serve));
gulp.task('default', gulp.series('build', serve));