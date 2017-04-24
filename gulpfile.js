/**
 * Created by sregej on 06.01.17.
 */
const gulp = require('gulp');
const express = require('express');
const fs = require('fs');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const tsify = require('tsify');
const exorcist = require('exorcist');
const source = require('vinyl-source-stream');
const notify = require('gulp-notify');
const buffer = require('vinyl-buffer');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const nib = require('nib');
const rename = require('gulp-rename');

const expressPort = 3000;

const vendorArray = [
    'react',
    'react-dom',
];

function handleTSErrors() {
    var args = Array.prototype.slice.call(arguments);

    notify.onError({
        title: "TypeScript Error",
        message: "<%= error.message %>"
    }).apply(this, args);

    this.emit('end');
}

function startExpress(port) {
    var server = express();

    server.use('/', express.static('dist'));

    server.get('*', function (req, res) {
        res.set('content-type', 'text/html');
        res.send(fs.readFileSync('dist/index.html', 'utf8'));
    });

    server.listen(port);
}

function stylusCompile() {
    return gulp.src('src/styl/style.styl')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

function browserSyncInit() {
    return browserSync.init({
        codeSync: true,
        open: false,
        proxy: 'http://localhost:' + (expressPort + 1)
    });
}

function vendor() {
    var vendor = browserify({
        debug: true
    });

    vendorArray.forEach(function (lib) {
        vendor.require(lib);
    });

    return vendor.bundle()
        .on('error', handleTSErrors)
        .pipe(source('vendor.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist'));
}

var bundler = null;

function bundle() {
    var bundler = bundler || browserify({
            entries: ['./src/ts/app.ts'],
            extensions: ['.ts', '.tsx'],
            debug: true

        })
            .plugin(tsify, {target: 'es5'});

    return bundler
        .external(vendorArray)
        .bundle()
        .on('error', handleTSErrors)
        .pipe(exorcist('dist/app.js'))
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());

}

function createHtml() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

function images() {
    return gulp.src(['src/img/**/*','src/img/*.**'])
        .pipe(gulp.dest('dist/img'));
}

gulp.task('stylesProduction', function () {
	return gulp.src('src/styl/ui-video-seek-slider.styl')
		.pipe(plumber())
		.pipe(stylus(
			{
				use: [
					nib()
				]
			}
		))
		.pipe(rename('video-seek-slider.css'))
		.pipe(gulp.dest('lib'));
});

gulp.task('html', function () {
    createHtml();
});

gulp.task('styles', ['html'], function () {
    return stylusCompile();
});

gulp.task('images', ['styles'], function () {
    return images();
});

gulp.task('vendor', ['images'], function () {
    return vendor();
});

gulp.task('bundler', ['vendor'], function () {
    return bundle();
});

gulp.task('browserSync', ['bundler'], function () {
    browserSyncInit()
});

gulp.task('default', ['browserSync'], function () {
    startExpress(expressPort + 1);

    gulp.watch([
        './src/ts/*.ts',
        './src/ts/**/*.ts',
        './src/ts/**/*.tsx',
        '!./src/ts/server.ts'
    ], function () {
        bundle();
    });

    gulp.watch([
        './src/styl/**/*.styl'
    ], function () {
        stylusCompile();
    });

    gulp.watch([
        './src/index.html'
    ], function () {
        createHtml();
    });

    gulp.watch([
        './src/img/**/*.**'
    ], function () {
        images();
    });

});
