/* jshint node:true */
 
// Include project requirements.
var gulp    = require( 'gulp' ),
gutil       = require( 'gulp-util' ),
path        = require('path'),
concat      = require( 'gulp-concat' ),
uglify      = require( 'gulp-uglify' ),
less        = require( 'gulp-less' ),
coffee      = require( 'gulp-coffee' ),
browserSync = require( 'browser-sync' ),
minifyCSS   = require( 'gulp-minify-css' );
 
// Sets assets folders.
var dirs = {
  js: 'js',
  plugins: 'js/plugins',
  coffee: 'assets/coffee',
  coffee_plugins: 'assets/coffee/plugins',
  css: 'css',
  less: 'assets/less',
  images: 'img'
};

gulp.task('browser-sync', function() {
  browserSync.init(null, {
    server: {
      baseDir: "./"
    }
  });
});

// HTML Task

gulp.task('html', function() {
  gulp.src([ '*.html' ])
    .pipe(browserSync.reload({stream:true, once: true}));
});

// END OF HTML Task

// CoffeeScript Task

gulp.task('coffee', function() {
  gulp.src([ dirs.coffee + '/*.coffee' ])
    .pipe(concat( '/app.coffee') )
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(uglify())
    .pipe(gulp.dest( dirs.js ))
    .pipe(browserSync.reload({stream:true, once: true}));
});

// END OF CoffeeScript Task

// Plugins Task

gulp.task('plugins', function() {
  gulp.src([ dirs.coffee_plugins + '/*.coffee' ])
    .pipe(coffee({bare: true}).on('error', gutil.log))
    // .pipe(uglify())
    .pipe(gulp.dest( dirs.plugins ))
    .pipe(browserSync.reload({stream:true, once: true}));
});

// END OF Plugins Task

// --------------------------------------------------------------------- //

// LESS Task

gulp.task('less', function() {
  gulp.src([
    dirs.less + '/reset.less',
    dirs.less + '/modal.less',
    dirs.less + '/form.less',
    dirs.less + '/shared.less'
  ])
  .pipe(concat( 'app.less') )
  .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .pipe(minifyCSS({keepBreaks:true}))
  .pipe(gulp.dest( dirs.css ))
  .pipe(browserSync.reload({stream:true}));
});

// END OF LESS Task

// --------------------------------------------------------------------- //
 
// --------------------------------------------------------------------- //

// Watch Task
 
gulp.task( 'watch', ['browser-sync'], function () {
  // Watch HTML changes.
  gulp.watch( [ '*.html' ], function () {
    gulp.start( 'html' );
  });

  // Watch JavaScript changes.
  gulp.watch( [ dirs.coffee + '/*.coffee' ], function () {
    gulp.start( 'coffee' );
  });

  gulp.watch( [ dirs.coffee_plugins + '/*.coffee' ], function () {
    gulp.start( 'plugins' );
  });

  gulp.watch( [ dirs.less + '/*.less' ], function () {
    gulp.start( 'less' );
  });
});

// END OF Watch Task

gulp.task( 'build', function () {
  gulp.start( 'coffee' );
  gulp.start( 'less' );
  gulp.start( 'html' );
});