const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const include = require('gulp-include');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

var scss = {outputStyle: 'compressed'}; //{ outputStyle: 'compact' , sourceComments: 'map'}

var styles = {
    dest:'public/css',
    watch:'resources/styles/**/*.{css,scss}',
    style: {
        src:'resources/styles/style.scss',
        file:'style.css'
    }
};

var scripts = {
    dest:'public/js',
    watch:'resources/scripts/**/*.js',
    script: {
        src:'resources/scripts/script.js',
        file:'script.js'
    }
};

/*
 * START STYLES
 */
gulp.task('style.css', () => {
    return gulp
        .src(styles.style.src)
        .pipe(sass(scss))
        .pipe(rename(styles.style.file))
        .pipe(gulp.dest(styles.dest));
});

/*
 * END STYLES
 */


/*
 * START THEME.JS
 */
gulp.task('script.js', () => {
    return gulp
        .src(scripts.script.src)
        .pipe(include())
        .pipe(
            babel({
                presets: ["@babel/preset-env"].map(require.resolve)
            })
        )
        .pipe(
            uglify({
                mangle: false,
                compress: true
            })
        )
        .pipe(rename(scripts.script.file))
        .pipe(gulp.dest(scripts.dest));
});
/*
 * END THEME.JS
 */

/**
 * WATCH
 */
gulp.task('watch', () => {
    gulp.watch(styles.watch, (done) => {
        gulp.series(['style.css'])(done);
    });

    gulp.watch(scripts.watch, (done) => {
        gulp.series(['script.js'])(done);
    });
});
/**
 * END WATCH
 */

/**
 * ALL CLEAN
 */
gulp.task('clean', () => {
    return del([
        styles.dest + '/' + styles.style.file,
        scripts.dest + '/' + scripts.script.file
    ]);
});
/**
 * END ALL CLEAN
 */

/**
 * DEPLOY
 */
gulp.task('deploy',gulp.series('clean', 'style.css', 'script.js'));
/**
 * END DEPLOY
 */