var gulp = require('gulp');
var mocha = require('gulp-mocha');
var react = require('gulp-react');
var del = require('del');

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname;
var LIVERELOAD_PORT = 35729;
var lr;

function startExpress() {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(EXPRESS_ROOT + '/dist'));
    app.listen(EXPRESS_PORT);
}

function startLivereload() {
    lr = require('tiny-lr')();
    lr.listen(LIVERELOAD_PORT);
}

function notifyLivereload(event) {
    var fileName = require('path').relative(EXPRESS_ROOT, event.path);
    lr.changed({
        body: {
            files: [fileName]
        }
    });
}

var paths = {
    jsx: ['app/*.jsx'],
    sourceFiles: ['app/*.*'],
    staticFiles: ['app/*.js', 'app/*.html', 'app/*.css'],
	baseFiles: ['app/*.html', 'app/*.css'],
    vendor: 'vendor'
};

gulp.task('test', function () {
    return gulp.src('test/index.js', { read: false })
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({
            reporter: 'nyan',
//            require: ['../../node_modules/chai/chai.js'],
            debug: true,
            cwd: '.'
        }));
});

gulp.task('setup-lr', function () {
    startExpress();
    startLivereload();
});

gulp.task('react', function () {
    return gulp.src(paths.jsx)
        .pipe(react())
        .pipe(gulp.dest('dist/app'));
});

gulp.task('copy-dist', function () {
    return gulp.src(paths.staticFiles)
        .pipe(gulp.dest('dist/app'));
});

gulp.task('copy-dist-static', function () {
    return gulp.src(paths.baseFiles)
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-dist-lib', function () {
    return gulp.src('vendor/**/*')
        .pipe(gulp.dest('dist/vendor'));
});

gulp.task('clean', function () {
    return del.sync(['dist']);
});

gulp.task('watch', function () {
    gulp.watch(paths.jsx, ['react']);
    gulp.watch(paths.js, ['copy-dist']);
    gulp.watch(paths.baseFiles, ['copy-dist-static']);
    gulp.watch('dist/*.*', notifyLivereload);
    gulp.watch(['app/*.*', 'test/*.js'], ['test']);
});

gulp.task('default', ['test', 'clean', 'setup-lr', 'react', 'copy-dist', 'copy-dist-static', 'copy-dist-lib', 'watch']);
