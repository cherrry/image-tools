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
var adjustcss = require('gulp-css-url-adjuster')
var lazypipe = require('lazypipe')

gulp.task('default', ['copy', 'html', 'js'])

gulp.task('copy', function () {
    gulp.src('./bower_components/semantic-ui/dist/themes/default/assets/**/*', {
        base: './bower_components/semantic-ui/dist/themes/default/assets'
    }).pipe(gulp.dest('./css/assets'))
})

gulp.task('html', function () {
    var assets = useref.assets()
    var csspipe = lazypipe()
        .pipe(adjustcss, {
            replace: [ '../themes/default/assets', './assets' ]
        })
        .pipe(minifycss)
    return gulp.src('./index.html')
        .pipe(assets)
        .pipe(gulpif('*.css', csspipe()))
        .pipe(useref())
        .pipe(chmod(644))
        .pipe(gulp.dest('./'))
        .pipe(livereload())
})

gulp.task('js', ['js/vendor', 'js/index'])
gulp.task('js/vendor', function () {
    return browserify({ debug: true })
        .plugin('bundle-collapser/plugin')
        .require('events')
        .require('react')
        .require('react/addons')
        .require('flux')
        .require('underscore')
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
        .exclude('events')
        .exclude('react')
        .exclude('react/addons')
        .exclude('flux')
        .exclude('underscore')
        .bundle()
        .pipe(source('./js/index.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'))
})

gulp.task('w', ['watch'])
gulp.task('watch', function () {

    var bundler = watchify(browserify('./js/index.jsx', {
        cache: {},
        packageCache: {},
        fullPaths: true,
        debug: true
    }))
        .exclude('events')
        .exclude('react')
        .exclude('react/addons')
        .exclude('flux')
        .exclude('underscore')

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

    watch(['./index.html', './css/index.css', './css/octocat.css'], function () {
        gulp.start('html')
    })

    gulp.start('copy')
    gulp.start('html')
    gulp.start('js/vendor')
    gulp.start('js-watch/index')
})

gulp.task('s', ['server'])
gulp.task('server', ['watch'], function (done) {
    http.createServer(st({
        path: __dirname,
        index: 'index.html',
        cache: false
    })).listen(8080, done)
    livereload.listen({ basePath: './' })
})
