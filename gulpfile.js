var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const concat = require('gulp-concat');

var src = './Site/src';
var dist = './Site/dist';

var dev = 'http://www-dev.projeto-spotify.com';
var prod = '';

var sassDevOptions = {
    outputStyle: 'nested'
}

// Minificando
var sassOptionsCompress = {
    outputStyle: 'compressed'
}

gulp.task('sass:build', function () {
    return gulp.src(`${src}/styles/custom/scss/*.scss`)
        .pipe(sass(sassDevOptions).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(`${dist}/styles`));
});

gulp.task('sass:watch', ['sass:build'], () => {
    gulp.watch(`${src}/styles/custom/scss/*.scss`, ['sass:build']);
});

gulp.task('sass:build-plugins', function () {
    return gulp.src(`${src}/styles/plugins/scss/*.scss`)
        .pipe(sass(sassOptionsCompress).on('error', sass.logError))
        .pipe(rename('style-plugins.min.css'))
        .pipe(gulp.dest(`${dist}/styles`));
});

gulp.task('js:build', () => {
    return gulp
        .src([
            `${src}/scripts/custom/*.js`
        ])
        .pipe(concat('custom.min.js'))
        .pipe(gulp.dest(`${dist}/scripts`));
});

gulp.task('js:build-plugins', () => {
    return gulp
        .src([
            `${src}/scripts/plugins/**/*.js`
        ])
        .pipe(concat('plugins.min.js'))
        .pipe(gulp.dest(`${dist}/scripts`));
});

gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: 'www-dev.projeto-spotify.com'
    });

    gulp.watch(`*.html`).on('change', browserSync.reload);
    gulp.watch(`${dist}/scripts/*.js`).on('change', browserSync.reload);
    gulp.watch(`${dist}/styles/*.min.css`).on('change', browserSync.reload);
});



gulp.task('default', ['browser-sync'], () => {
    console.log('Gulp está sendo iniciado...');
    console.log(':)');
    gulp.start('sass:watch');
    gulp.start('sass:build');
    gulp.start('sass:build-plugins');
    gulp.start('js:build');
    gulp.start('js:build-plugins');
});