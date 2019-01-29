var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

// html檔案存放的原始路徑(編譯前)
var paths = {pages: ['src/*.html']};

// 複製html檔到dist底下
gulp.task('copy-html', function() {
  return gulp.src(paths.pages).pipe(gulp.dest('dist'));
});

// gulp.task('default', gulp.series('copy-html', function() {
//   return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist'));
// }));

var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
gulp.task('default', gulp.series('copy-html', function() {
  return browserify({
           basedir: '.',
           debug: true,
           entries: ['src/main.ts'],
           cache: {},
           packageCache: {}
         })
      .plugin(tsify)
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('dist'));
}));