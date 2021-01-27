const gulp = require('gulp')

const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const pugLinter = require('gulp-pug-linter')
const htmlValidator = require('gulp-w3c-html-validator')
const bemValidator = require('gulp-html-bem-validator')
const webphtml = require('gulp-webp-html')

module.exports = function pug2html() {
    return gulp.src('./#src/pug/*.pug')
        .pipe(plumber())
        //.pipe(pugLinter({ reporter: 'default' }))
        .pipe(pug())
        //.pipe(webphtml())
        //.pipe(htmlValidator())
        //.pipe(bemValidator())
        .pipe(gulp.dest('./dist/'))
}
