var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
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
var through2 = require('through2');
var runSequence = require('run-sequence');

function handleErrors() {
	var args = Array.prototype.slice.call(arguments);
	notify.onError({ title: 'Error', message: '<%= error.message %>'}).apply(this, args);
	this.emit('end'); // Keep gulp from hanging on this task
}

var revdJsFiles = [];

function buildJs(params) {
	var file = params.file;
	var watch = params.watch;

	return function () {
		var props = {entries: ['./src/js/' + file]};
		var bundler = watch ? watchify(props) : browserify(props);

		bundler.transform(reactify);

		function rebundle() {
			var stream = bundler.bundle({debug: watch})
				.on('error', handleErrors)
				.pipe(source(file));

			if (!watch) {
				return stream
					.pipe(streamify(uglify()))
					.pipe(streamify(rev()))
					.pipe(through2.obj(function (file, enc, done) {
						revdJsFiles.push({
							old: path.basename(file.revOrigPath),
							new: path.basename(file.path)
						});
						done(null, file);
					}))
					.pipe(gulp.dest('./dist/js/'));
			}

			return stream.pipe(gulp.dest('./dist/js/'));
		}

		bundler.on('update', function () {
			rebundle();
			gutil.log('Rebundle...');
		});

		return rebundle();
	};
}

gulp.task('copy-images', function () {
	return gulp.src('./src/images/**/*', {base: './src/images'})
		.on('error', handleErrors)
		.pipe(gulp.dest('./dist/images/'));
});

gulp.task('usemin', function () {
	return gulp.src('./src/index.html')
		.pipe(usemin({
			css: [minifyCss(), 'concat'],
			html: [minifyHtml({empty: true})]
		}))
		.pipe(gulp.dest('dist/'));
});

// renames JS files changed by grunt-rev in the buildJS function above
gulp.task('fix-revd-js-files-in-index', function () {
	return gulp.src('./dist/index.html')
		.pipe(through2.obj(function (file, enc, done) {
			var indexContents = file.contents.toString();

			revdJsFiles.forEach(function(revdJsFile) {
				indexContents = indexContents.replace(revdJsFile.old, revdJsFile.new);
			});

			file.contents = new Buffer(indexContents);
			done(null, file);
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('watch-js', buildJs({file: 'main.js', watch: true}));
gulp.task('deploy-js', buildJs({file: 'main.js', watch: false}));

gulp.task('default', ['copy-images', 'usemin', 'watch-js']);

gulp.task('deploy', function(cb) {
	runSequence(['copy-images', 'usemin', 'deploy-js'], 'fix-revd-js-files-in-index', cb);
});
