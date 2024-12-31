const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');

const paths = {
  styles: {
    src: 'assets/sass/**/*.scss', // Path to your Sass files
    dest: 'dist/css', // Destination for compiled CSS files
  },
  scripts: {
    src: 'assets/js/**/*.js', // Path to your JavaScript files
    dest: 'dist/js', // Destination for compiled JavaScript files
  },
};

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    proxy: 'http://hpm-theme.staging', // Update with your local WordPress site URL
		https: true
  });

  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch('**/*.php').on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
