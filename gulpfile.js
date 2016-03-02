const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const Server = require('karma').Server;

const scripts = ['**/*.js', '!node_modules/**'];
const testFiles = ['./test/**/*.js'];

gulp.task('eslint', () => {
  return gulp.src(scripts)
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

gulp.task('mocha', () => {
  return gulp.src(testFiles)
    .pipe(mocha({ reporter: 'tap'
  }));
});

gulp.task('default', ['eslint', 'mocha']);
