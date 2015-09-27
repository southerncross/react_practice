var gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    react        = require('gulp-react'),
    htmlreplace  = require('gulp-html-replace'),
    source       = require('vinyl-source-stream'),
    browserify   = require('browserify'),
    watchify     = require('watchify'),
    reactify     = require('reactify'),
    streamify    = require('gulp-streamify');



var path = {
	HTML: 'src/index.html',
	MINIFIED_OUT: 'build.min.js',
	OUT: 'build.js',
	DEST: 'dist',
	DEST_BUILD: 'dist/build',
	DEST_SRC: 'dist/src',
	ENTRY_POINT: './src/js/app.js'
};



gulp.task('copy', function() {
	return gulp.src(path.HTML)
		.pipe(gulp.dest(path.DEST));
});


gulp.task('watch', function() {
	gulp.watch(path.HTML, ['copy']);

	var watcher = watchify(browserify({
		entries: [path.ENTRY_POINT],
		transform: [reactify],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	}));

	return watcher.on('update', function() {
		watcher.bundle()
			.pipe(source(path.OUT))
			.pipe(gulp.dest(path.DEST_SRC));
		console.log("Updated");
	})
		.bundle()
		.pipe(source(path.OUT))
		.pipe(gulp.dest(path.DEST_SRC));
});


gulp.task('default', ['watch']);


gulp.task('build', function() {
	return browserify({
		entries: [path.ENTRY_POINT],
		transform: [reactify]
	})
		.bundle()
		.pipe(source(path.MINIFIED_OUT))
		.pipe(streamify(uglify(path.MINIFIED_OUT)))
		.pipe(gulp.dest(path.DEST_BUILD));
});


gulp.task('replaceHTML', function() {
	return gulp
		.src(path.HTML)
		.pipe(htmlreplace({
			js: 'build/' + path.MINIFIED_OUT
		}))
		.pipe(gulp.dest(path.DEST));
});


gulp.task('production', ['replaceHTML', 'build']);