var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCss = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps'),
	inject = require('gulp-inject'),
	flatten = require('gulp-flatten'),
	watch = require('gulp-watch'),	
	runSequence = require('run-sequence'),
	browserSync = require('browser-sync').create(),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	babel = require('babelify'),
	uglify = require('gulp-uglify'),
	clean = require('gulp-clean');

// copy vendor css into dist folder 
gulp.task('copyVendorCSS', function(){
	return gulp.src(['bower_components/**/*.min.css'])
		   .pipe(flatten())
		   .pipe(gulp.dest('dist/assets/css'));
})
// copy fonts
gulp.task('copyVendorFonts', function(){
	return gulp.src(['src/assets/fonts/*'])
		   .pipe(flatten())
		   .pipe(gulp.dest('dist/assets/fonts'));
})
// copy angularjs, jquery etc
gulp.task('copyVendorJS', function(){
	return gulp.src(['bower_components/**/*.min.js', 'bower_components/**/firebase.js'])
		   .pipe(flatten())
		   .pipe(gulp.dest('dist/assets/js/vendor'));
})
// optimize images
gulp.task('image', function(){
	return gulp.src(['src/assets/images/*'])
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/assets/images'));
})
// copy html
gulp.task('copyHtml', function(){
  return gulp.src('src/**/*.tmpl.html')
		.pipe(gulp.dest('dist/'))
})

// compile app custom css
gulp.task('compileAppCss', function(){
  return gulp.src('src/assets/scss/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('main.min.css'))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.init())
		.pipe(minifyCss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/assets/css/'));
})
// compile es6
gulp.task('compileAppJs', function() {  
	
return browserify('src/app/index.es6', { debug: true, extensions: ['.js','.es6']})
		.transform(babel, {presets: ["es2015"]})
		.bundle()
	    .on('error', function(err) { console.error(err); this.emit('end'); })
	    .pipe(source('app.min.js'))
	    .pipe(buffer())
	    .pipe(sourcemaps.init({ loadMaps: true }))
	    .pipe(uglify())
	    .pipe(sourcemaps.write('./'))
	    .pipe(gulp.dest('./dist/assets/js'));
});
// inject css and js
gulp.task('inject', function(){
	var target = gulp.src('src/index.html');
	var sourceCss = gulp.src(['./dist/assets/css/bootstrap.min.css','./dist/assets/css/main.min.css']);
	var sourceJs = gulp.src([
		'./dist/assets/js/vendor/firebase.js',
		'./dist/assets/js/vendor/jquery.min.js',
		'./dist/assets/js/vendor/angular.min.js',
		'./dist/assets/js/vendor/angularfire.min.js',
		'./dist/assets/js/vendor/angular-*',
		'./dist/assets/js/vendor/bootstrap.min.js',  
		'./dist/assets/js/vendor/ui-bootstrap.min.js', 
		'./dist/assets/js/vendor/ui-bootstrap-tpls.min.js',
		'./dist/assets/js/vendor/jquery.slim.min.js'
		]);
	var sourceAppJs = gulp.src('./dist/assets/js/app.min.js');
	return target.pipe(inject(sourceCss, {ignorePath: 'dist'})).pipe(inject(sourceJs, {ignorePath: 'dist'})).pipe(inject(sourceAppJs, {ignorePath: 'dist', name:'app'}))
    .pipe(gulp.dest('dist'));
})
// sync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});
//
gulp.task('reload', function(){
	browserSync.reload();
})
// clean
gulp.task('clean', function () {
	return gulp.src('dist', {read: false})
		.pipe(clean());
});

// serve on browser
gulp.task('serve',['build'], function(){
	runSequence('inject', 'browser-sync', 'watch');
})

// build
gulp.task('build', function(done){
	runSequence('clean','image','copyVendors','copyHtml', 'compileAppCss','compileAppJs', done);  
})

// copy vendors
gulp.task('copyVendors', function(){
	runSequence('copyVendorCSS', 'copyVendorJS', 'copyVendorFonts');
})

// compile app for watch
gulp.task('appSequence', function(){
	runSequence('compileAppCss','compileAppJs','copyHtml','inject','reload');  
})

// watch
gulp.task('watch', function () {
  // watch app scss files
  gulp.watch('src/assets/**/*.scss', ['appSequence']);
  // watch app html files
  gulp.watch('src/**/*.tmpl.html', ['appSequence']);
  // watch app es6 files
  gulp.watch('src/**/*.es6', ['appSequence']);
  // watch app index file (inject task will automatically copy index file in dist)
  gulp.watch('src/index.html', ['appSequence']);

});
