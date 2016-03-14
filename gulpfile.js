const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const Server = require('karma').Server;
var concatCss = require('gulp-concat-css');


const allScripts = ['**/*.js', '!node_modules/**'];
const serverTestFiles = ['models/*.js', 'routes/*.js'];


gulp.task('static:dev', () => {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('webpack:dev', () => {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});


gulp.task('webpack:css', function () {
  return gulp.src('app/sass/*.css')
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest('build/'));
});



gulp.task('lint', () => {
  return gulp.src(allScripts)
    .pipe(eslint({
      'rules': {
        'indent': [2, 2],
        'quotes': [2, 'single'],
        'semi': [2, 'always'],
        'no-console': 0,
        'no-unused-vars': 0
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
  return gulp.src('test/server/*spec.js')
    .pipe(mocha());
});


gulp.task('watch', () => {
  gulp.watch(allScripts, ['lint']);
});

gulp.task('default', ['watch']);

gulp.task('watch', function() {
    gulp.watch('app/js/*.js', ['webpack:dev'] );
    gulp.watch('app/sass/*.css', ['webpack:css'] );
    gulp.watch('app/**/*.html', ['static:dev']);
});

gulp.task('build', ['webpack:dev', 'static:dev', 'webpack:css']);
gulp.task('default', ['lint', 'mocha']);

