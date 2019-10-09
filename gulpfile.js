const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const files = {
    imgPath: 'dev/img/**/*.png',
    scssPath: 'dev/scss/**/*.scss',
    jsPath: 'dev/js/**/*.js'
}

function scssTask(){
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('public/css'));
}

function jsTask(){
    return src(files.jsPath)
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('public/js'))
}

function imageTask(){
    return src(files.imgPath)
        .pipe(imagemin())
        .pipe(dest('public/img'))
}

const cbString = new Date().getTime();
function cacheBustTask(){
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('.'));
}

function watchTask(){
    watch([files.scssPath, files.jsPath, files.imgPath],
        parallel(scssTask, jsTask, imageTask));
}

exports.default = series(
    parallel(scssTask, jsTask, imageTask),
    cacheBustTask, 
    watchTask
);