const gulp = require('gulp')

const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const rename = require("gulp-rename")

const concat = require('gulp-concat')
const terser = require('gulp-terser')

module.exports = function copyDependencies() {
    gulp.src([
            './#src/assets/themes/theme-dark.css',
            './#src/assets/themes/theme-light.css',
        ])
        .pipe(autoprefixer({ cascade: false }))
        .pipe(csso({
            restructure: false,
            debug: true
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/assets/themes/'))
    return gulp.src([
            './#src/assets/projects/**/*.*',
        ])
        .pipe(gulp.dest('./dist/assets/projects/'))
}
