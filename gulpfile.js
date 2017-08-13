/**
 * Created by sergiiivanchenko on 19/06/2017.
 */

// grab our gulp packages
var gulp = require ('gulp'),
    gutil = require ('gulp-util'),
    jshint = require ('gulp-jshint'),
    sass = require ('gulp-sass');
const concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');


// define the default task and add the watch task to it
// gulp.task ('default', ['build-css', 'watch']);
gulp.task ('default', ['build-css', 'browser-sync']);


// configure which files to watch and what tasks to use on file changes
gulp.task ('watch', function () {
    // gulp.watch ('source/assets/javascript/**/*.js', ['logChanges', 'jshint']);
    gulp.watch ('source/scss/**/*.scss', [ 'build-css']);
    // gulp.watch ('source/assets/templates/**/*.*', [ 'templates-copy']);
    // gulp.watch ('source/index.html', [ 'copyIndexFile']);
});

// // create a default task and just log a message
gulp.task ('logChanges', function () {
    return gutil.log ('Changes detected! Start checking....')
});

gulp.task('copyIndexFile', function () {
    gutil.log ('Index,html copying...');
    return gulp.src('source/index.html')
        .pipe(gulp.dest('public'))
});

gulp.task('templates-copy', function () {
    gutil.log ('Templates copying...');
    return gulp.src('source/assets/templates/**/*.*')
        .pipe(gulp.dest('public/assets/templates'))
});


// compile css from sass
// gulp.task ('sass', function () {
//     return gulp.src ('source/assets/scss/**/*.scss')
//                .pipe (sass ().on ('error', sass.logError))
//                .pipe (gulp.dest ('public/assets/css'));
// });

// configure the jshint task
gulp.task ('jshint', function () {
    gutil.log ('Check js and copying...');
    var stream = gulp.src ('source/assets/javascript/**/*.js')
                     .pipe (jshint ())
                     .pipe (jshint.reporter ('jshint-stylish'))
                     .pipe (gulp.dest ('public/assets/javascript'));

});

// compile css from sass
gulp.task('build-css', function() {
    gutil.log ('Building css from sass...');
    return gulp.src('source/scss/**/*.scss')
               .pipe(sourcemaps.init())  // Process the original sources
               .pipe(concat('all.scss'))
               .pipe(sass ().on ('error', sass.logError))
               .pipe(sourcemaps.write()) // Add the map to modified source.
               .pipe(gulp.dest('views'));
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:8081",
        files: ["**/*.*"],
        browser: "google chrome",
        port: 7000,
    });

    // browserSync.init({
    //     server: {
    //         baseDir: "./"
    //     }
    // });

    gulp.watch ('source/scss/**/*.scss', [ 'build-css']);
    // gulp.watch("views/**/*.*").on('change', browserSync.reload);
});
gulp.task('nodemon', function (cb) {

    var started = false;

    return nodemon({
        script: 'app.js'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});
