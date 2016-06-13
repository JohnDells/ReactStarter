var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task('copy:bootstrap', function () {
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.css').pipe(gulp.dest('wwwroot/css/'));
});

gulp.task('copy:systemjs', function () {
    return gulp.src('node_modules/systemjs/dist/system.js').pipe(gulp.dest('wwwroot/lib/systemjs/'));
});

gulp.task('copy:object-assign', function () {
    return gulp.src('node_modules/object.assign/dist/browser.js').pipe(rename('object-assign.js')).pipe(gulp.dest('wwwroot/lib/object-assign/'));
});

gulp.task('copy:react', function () {
    return gulp.src('node_modules/react/dist/react.js').pipe(gulp.dest('wwwroot/lib/react/'));
});

gulp.task('copy:react-dom', function () {
    return gulp.src('node_modules/react-dom/dist/react-dom.js').pipe(gulp.dest('wwwroot/lib/react/'));
});

gulp.task('copy:redux', function () {
    return gulp.src('node_modules/redux/dist/redux.js').pipe(gulp.dest('wwwroot/lib/redux/'));
});

gulp.task('copy:react-router', function () {
    return gulp.src('node_modules/react-router/umd/ReactRouter.js').pipe(gulp.dest('wwwroot/lib/react-router/'));
});

gulp.task('copy:immutable', function () {
    return gulp.src('node_modules/immutable/dist/immutable.js').pipe(gulp.dest('wwwroot/lib/immutable/'));
});

gulp.task('copy:es6-promise', function () {
    return gulp.src('node_modules/es6-promise/dist/es6-promise.js').pipe(gulp.dest('wwwroot/lib/es6-promise/'));
});

gulp.task('copy:superagent', function () {
    return gulp.src('node_modules/superagent/superagent.js').pipe(gulp.dest('wwwroot/lib/superagent/'));
});

gulp.task('default', ['copy:bootstrap', 'copy:systemjs', 'copy:object-assign', 'copy:react', 'copy:react-dom', 'copy:redux', 'copy:react-router', 'copy:immutable', 'copy:es6-promise', 'copy:superagent'], function () {
    console.log('Done Building');
    return true;
});