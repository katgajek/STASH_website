const gulp            = require("gulp");
const browserSync     = require("browser-sync").create();
const sass            = require("gulp-sass");
const watch           = require("gulp-watch");
const autoprefixer    = require("gulp-autoprefixer");
const sourcemaps      = require("gulp-sourcemaps");
const plumber         = require("gulp-plumber");
const rename          = require("gulp-rename");
const gutil           = require("gulp-util");
const babel           = require('gulp-babel');

var browserify        = require('browserify');
var babelify          = require('babelify');
var source            = require('vinyl-source-stream');


const handleError = function(err) {
    console.log(gutil.colors.red(err.toString()));
    this.emit("end");
}


gulp.task("browseSync", function() {
    browserSync.init({
        server: "./dist",
        notify: true,
        //host: "192.168.0.24", //IPv4 Address Wirless LAN adapter WiFi from ipconfig
        //port: 3000,
        open: true
    });
});


gulp.task("sass", function() {
    return gulp.src("src/scss/style.scss")
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(autoprefixer({
            browsers: ["> 1%"]
        }))
        .pipe(rename({
            suffix: ".min",
            basename: "style"
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream({match: "**/*.css"}));
});

gulp.task("watch", function() {
    gulp.watch("src/scss/**/*.scss", ["sass"]);
    gulp.watch("src/scripts/**/*.js", ["es6"]);
    gulp.watch("dist/**/*.html").on("change", browserSync.reload);
});

gulp.task('es6', function() {
    browserify({
        entries: 'src/scripts/app.js',
        debug: true
    })
        .transform(babelify.configure({
            presets: ["env"]
        }))
        .on('error',gutil.log)
        .bundle()
        .on('error',gutil.log)
        .pipe(source('dist/js/out.js'))
        .pipe(gulp.dest(''));
});

gulp.task("default", function() {
    gulp.start(["sass", "es6", "browseSync", "watch"]);

});
