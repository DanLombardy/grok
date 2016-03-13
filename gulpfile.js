const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const Server = require('karma').Server;

const allScripts = ['**/*.js', '!node_modules/**'];
const serverTestFiles = ['models/*.js', 'routes/*.js'];

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
