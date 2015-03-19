'use strict'

var gulp = require('gulp')
var useref = require('gulp-useref')
var gulpif = require('gulp-if')
var minifycss = require('gulp-minify-css')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var uglify = require('gulp-uglify')
var watchify = require('watchify')
var watch = require('gulp-watch')
var sourcemaps = require('gulp-sourcemaps')
var chmod = require('gulp-chmod')
var livereload = require('gulp-livereload')
var http = require('http')
var st = require('st')

gulp.task('default', ['html', 'js'])

gulp.task('html', function () {
    var assets = useref.assets()
    return gulp.src('./index.html')
        .pipe(assets)
        .pipe(gulpif('*.css', minifycss()))
        .pipe(useref())
        .pipe(chmod(644))
        .pipe(gulp.dest('./'))
        .pipe(livereload())
})

gulp.task('js', ['js/vendor', 'js/index'])
gulp.task('js/vendor', function () {
    return browserify({ debug: true })
        .plugin('bundle-collapser/plugin')
        .require('react')
        .bundle()
        .pipe(source('./js/vendor.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'))
})
gulp.task('js/index', function () {
    return browserify('./js/index.jsx', { debug: true })
        .plugin('bundle-collapser/plugin')
        .exclude('react')
        .bundle()
        .pipe(source('./js/index.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'))
})

gulp.task('watch', ['html', 'js/vendor'], function () {

    var bundler = watchify(browserify('./js/index.jsx', {
        cache: {},
        packageCache: {},
        fullPaths: true,
        debug: true
    })).exclude('react')

    gulp.task('js-watch/index', function () {
        return bundler.bundle()
            .pipe(source('./js/index.min.js'))
            .pipe(buffer())
            .pipe(gulp.dest('./'))
            .pipe(livereload())
    })

    bundler.on('update', function () {
        gulp.start('js-watch/index')
    })

    watch(['./index.html', './css/**/*.css', '!./**/*.min.*'], function () {
        gulp.start('html')
    })

    gulp.start('js-watch/index')
})

gulp.task('server', ['watch'], function (done) {
    http.createServer(st({
        path: __dirname,
        index: 'index.html',
        cache: false
    })).listen(8080, done)
    livereload.listen({ basePath: './' })
})
