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
var exec = require('child_process').exec

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
        .require('classnames')
        .require('events')
        .require('flux')
        .require('pixi')
        .require('react')
        .require('react/addons')
        .require('shortid')
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
        .exclude('classnames')
        .exclude('events')
        .exclude('flux')
        .exclude('pixi')
        .exclude('react')
        .exclude('react/addons')
        .exclude('shortid')
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
        .exclude('classnames')
        .exclude('events')
        .exclude('flux')
        .exclude('pixi')
        .exclude('react')
        .exclude('react/addons')
        .exclude('shortid')
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

gulp.task('t', ['test'])
gulp.task('test', function (cb) {
    exec('npm test', function (err, stdout, stderr) {
        console.log(stdout)
        console.error(stderr)
        cb(err)
    })
})
