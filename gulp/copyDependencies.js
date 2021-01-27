const gulp = require('gulp')

const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const rename = require("gulp-rename")

const concat = require('gulp-concat')
const terser = require('gulp-terser')

module.exports = function copyDependencies() {
    return gulp.src([
            './#src/assets/projects/**/*.*',
        ])
        .pipe(gulp.dest('./dist/assets/projects/'))
}
