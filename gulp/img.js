const gulp = require('gulp')

const imagemin = require('gulp-imagemin')
const imageminWebp = require('imagemin-webp')
const rename = require('gulp-rename')

module.exports = function img() {
    gulp.src('./#src/assets/img/*.{jpg,png,svg,gif,ico,webp}')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({
                quality: 75,
                progressive: true
            }),
            imagemin.optipng({ optimizationLevel: 5 }), // 0 to 7
            imagemin.svgo({
                plugins: [
                { removeViewBox: true },
                { removeUnusedNS: false },
                { removeUselessStrokeAndFill: false },
                { cleanupIDs: false },
                { removeComments: true },
                { removeEmptyAttrs: true },
                { removeEmptyText: true },
                { collapseGroups: true }
                ]
            }),
        ]))
        .pipe(gulp.dest('./dist/assets/img/'))
    return gulp.src('./#src/assets/img/*.{jpg,png}')
        .pipe(imagemin([imageminWebp({ quality: 50 })]))
        .pipe(rename({ extname: '.webp' }))
        .pipe(gulp.dest('./dist/assets/img/'))
}
