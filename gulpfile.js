var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    react = require('gulp-react'),
    htmlreplace = require('gulp-html-replace'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    streamify = require('gulp-streamify'),
    runSequence = require('run-sequence');


var PATH = {
    DIST: 'dist',
    HTML: {
        SRC: 'src/index.html',
        DST: 'dist'
    },
    CSS: {
        SRC: 'src/sass/**/*.scss',
        DST: 'dist/css'
    },
    JS: {
        ENTRY_POINT: 'src/app.js',
        BUILD: 'build.js',
        BUILD_MINIFIED: 'build.min.js',
        DST_DEV: 'dist/src',
        DST_PROD: 'dist/build',
    },
    ASSETS: {
        SRC: 'assets/**/*',
        DST: 'dist',
    }
};


gulp.task('clean', function () {
    return gulp
        .src([PATH.DIST], {read: false})
        .pipe(vinylPaths(del))
        .pipe(gulp.dest(PATH.DIST));
});


gulp.task('htmlDev', function () {
    return gulp
        .src(PATH.HTML.SRC)
        .pipe(gulp.dest(PATH.HTML.DST));
});


gulp.task('htmlProd', function () {
    return gulp
        .src(PATH.HTML.SRC)
        .pipe(htmlreplace({
            js: 'build/' + PATH.JS.BUILD_MINIFIED
        }))
        .pipe(gulp.dest(PATH.HTML.DST));
});


gulp.task('sassDev', function () {
    return gulp
        .src(PATH.CSS.SRC)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(PATH.CSS.DST));
});


gulp.task('sassProd', function () {
    return gulp
        .src(PATH.CSS.SRC)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(PATH.CSS.DST));
});


gulp.task('jsDev', function () {
    return browserify({
        entries: [PATH.JS.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    })
        .bundle()
        .pipe(source(PATH.JS.BUILD))
        .pipe(gulp.dest(PATH.JS.DST_DEV));
});


gulp.task('jsProd', function () {
    return browserify({
        entries: [PATH.JS.ENTRY_POINT],
        transform: [reactify]
    })
        .bundle()
        .pipe(source(PATH.JS.BUILD_MINIFIED))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(PATH.JS.DST_PROD));
});


gulp.task('copyAssets', function () {
    return gulp
        .src(PATH.ASSETS.SRC)
        .pipe(gulp.dest(PATH.ASSETS.DST));
});


gulp.task('watch', function () {
    gulp.watch(PATH.HTML.SRC, ['htmlDev']);
    gulp.watch(PATH.CSS.SRC, ['sassDev']);
    gulp.watch(PATH.ASSETS.SRC, ['copyAssets']);

    var watcher = watchify(browserify({
        entries: [PATH.JS.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }));

    return watcher.on('update', function () {
        watcher.bundle()
            .pipe(source(PATH.JS.BUILD))
            .pipe(gulp.dest(PATH.JS.DST_DEV));
        console.log("Updated");
    })
        .bundle()
        .pipe(source(PATH.JS.BUILD))
        .pipe(gulp.dest(PATH.JS.DST_DEV));
});


gulp.task('production', function () {
    runSequence(
        'clean',
        [
            'htmlProd',
            'sassProd',
            'jsProd',
            'copyAssets'
        ]
    );

});


gulp.task('default', function () {
    runSequence(
        'clean',
        [
            'htmlDev',
            'sassDev',
            'jsDev',
            'copyAssets',
        ],
        'watch'
    );
});