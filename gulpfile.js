const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const babel = require('babel-loader');
const Server = require('karma').Server;
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const minifyCss = require('gulp-minify-css');
// TO DO: configure browsersync
const browserSync = require('browser-sync');

const allScripts = ['**/*.js', '!node_modules/**', '!build/**'];

gulp.task('static:dev', () => {
  gulp.src(['app/**/*.html', 'app/**/*.png'])
  .pipe(gulp.dest('build/'));
});

gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/entry.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('sass:dev', () => {
  return gulp.src(['app/scss/**/*.scss', 'app/scss/vendor/font_awesome'])
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('build/css'));
});

gulp.task('lint', () => {
  return gulp.src(allScripts)
    .pipe(eslint({
      'rules': {
        'indent': [2, 2],
        'semi': [2, 'always'],
        'no-console': 0,
        'no-unused-vars': 0,
        'no-inner-declarations' : 0
      },
      env: {
        'es6': true,
        'node': true,
        'mocha': true
      },
      'extends': 'eslint:recommended'
    }))
    .pipe(eslint.format());
});

gulp.task('test:server', () => {
  return gulp.src('./test/server/*spec.js')
    .pipe(mocha());
});

gulp.task('watch', () => {
  // gulp.watch(allScripts, ['lint']);
  gulp.watch('app/js/*.js', ['webpack:dev'] );
  gulp.watch('app/scss/**/*.scss', ['sass:dev'] );
  gulp.watch('app/**/*.html', ['static:dev']);
});

gulp.task('build', ['webpack:dev', 'static:dev', 'sass:dev']);
gulp.task('default', ['lint', 'test:server']);
