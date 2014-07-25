var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var notify = require("gulp-notify");
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

var scriptsDir = './src/js';
var buildDir = './dist/js';

function handleErrors() {
	var args = Array.prototype.slice.call(arguments);
	notify.onError({
		title: "Error",
		message: "<%= error.message %>"
	}).apply(this, args);
	this.emit('end'); // Keep gulp from hanging on this task
}

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/

function buildScript(params) {
	var file = params.file;
	var watch = params.watch;

	return function() {
		var props = {entries: [scriptsDir + '/' + file]};
		var bundler = watch ? watchify(props) : browserify(props);

		bundler.transform(reactify);

		function rebundle() {
			var stream = bundler.bundle({debug: watch})
				.on('error', handleErrors)
				.pipe(source(file));

			if(!watch)
				stream.pipe(streamify(uglify()));

			return stream.pipe(gulp.dest(buildDir + '/'));
		}

		bundler.on('update', function () {
			rebundle();
			gutil.log('Rebundle...');
		});

		return rebundle();
	};
}

gulp.task('copy', function () {
	gulp.src('src/**/*.html', {base: './src'})
		.pipe(gulp.dest('./dist/'));
	gulp.src('src/css/**/*', {base: './src/css'})
		.pipe(gulp.dest('./dist/css/'));
	gulp.src('src/images/**/*', {base: './src/images'})
		.pipe(gulp.dest('./dist/images/'));
});

gulp.task('build', buildScript({file: 'main.js', watch: false}));
gulp.task('watch', buildScript({file: 'main.js', watch: true}));

gulp.task('default', ['copy', 'watch']);
gulp.task('deploy', ['copy', 'build']);
