var gulp = require('gulp');
var mocha = require('gulp-mocha');

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname;
var LIVERELOAD_PORT = 35729;
var lr;

function startExpress() {
    
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(EXPRESS_ROOT));
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

gulp.task('test', function () {
    return gulp.src('test/index.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({
            reporter: 'nyan',
            require: ['../../node_modules/chai/chai.js'],
            debug: true,
            cwd: '.'
        }));
});

gulp.task('default', function () {
    startExpress();
    startLivereload();
    gulp.watch('app/*.js', notifyLivereload);
});
