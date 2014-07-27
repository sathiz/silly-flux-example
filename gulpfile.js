var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var minifyHtml = require('gulp-minify-html');
var rev = require('gulp-rev');

function handleErrors() {
	var args = Array.prototype.slice.call(arguments);
	notify.onError({
		title: 'Error',
		message: '<%= error.message %>'
	}).apply(this, args);
	this.emit('end'); // Keep gulp from hanging on this task
}

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildJs(params) {
	var destJsFile = params.file;
	var deploy = params.deploy;

	return function () {
		var entries = {entries: ['./src/js/' + destJsFile]};
		var bundler = deploy ? browserify(entries) : watchify(entries);

		bundler.transform(reactify);

		function rebundle() {
			var stream = bundler.bundle({debug: !deploy})
				.on('error', handleErrors)
				.pipe(source(destJsFile));

			if (deploy) {
				return stream
					.pipe(streamify(uglify()))
					.pipe(streamify(rev()));
			}
			return stream.pipe(gulp.dest('dist/js/'));
		}

		bundler.on('update', function () {
			rebundle();
			gutil.log('Rebundle');
		});

		return rebundle();
	};
}

gulp.task('copy-images', function () {
	gulp.src('./src/images/**/*', {base: './src/images'})
		.on('error', handleErrors)
		.pipe(gulp.dest('./dist/images/'));
});

gulp.task('usemin', function () {
	gulp.src('./src/index.html')
		.pipe(usemin({
			css: [minifyCss(), 'concat'],
			html: [minifyHtml({empty: true})]
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('build', buildJs({file: 'main.js', deploy: true}));
gulp.task('watch', buildJs({file: 'main.js', deploy: false}));

gulp.task('default', ['usemin', 'copy-images', 'watch']);
gulp.task('deploy', ['usemin', 'copy-images', 'build']);
