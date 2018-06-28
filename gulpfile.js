'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
// uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    htmlmin = require('gulp-htmlmin'),
    rimraf = require('rimraf'),
    include = require("gulp-include"),
    gulpSequence = require('gulp-sequence'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


var path = {
    dest: {
        html: 'prod/',
        css: 'prod/css/',
        js: 'prod/js/',
        img: 'prod/img/',
        fonts: 'prod/fonts/'
    },
    src: {
        html: '_dev/**/*.html',
        // landings: '_dev/products/*.html',
        css: '_dev/css/**/*.scss',
        js: '_dev/js/*.js',
        img: '_dev/img/**/*.*',
        fonts: '_dev/fonts/**/*.*',
        pug: '_dev/*.pug'
    },
    watch: {
        html: '_dev/**/*.html',
        css: '_dev/css/**/*.scss',
        js: '_dev/js/**/*.js',
        img: '_dev/img/**/*.*',
        fonts: '_dev/fonts/**/*.*'
    },
    clean: 'prod'
};

var config = {
        server: {
            baseDir: "prod"
        },
        open: false
    },
    configTunnel = {
        server: {
            baseDir: "prod"
        },
        browser: 'Google Chrome',
        open: 'local'
    };


gulp.task('html:build', function () {
    gulp.src(path.src.html) //������� ����� �� ������� ����
        .pipe(include())
        // .pipe(htmlmin({collapseWhitespace: true}))
        .on('error', console.log)
        .pipe(gulp.dest(path.dest.html)) //�������� �� � ����� build
        .on('end', browserSync.reload) //� ������������ ��� ������ ��� ����������
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //������ ��� main ����
        .pipe(sourcemaps.init()) //�������������� sourcemap
        // .pipe(uglify()) //������ ��� js
        .pipe(sourcemaps.write('.')) //�������� �����
        .pipe(gulp.dest(path.dest.js)) //�������� ������� ���� � build
        .on('end', browserSync.reload) //� ������������ ������
});


gulp.task('css:build', function () {
    gulpSequence(

        gulp.src(path.src.css) // ������� ��� main.scss
            .pipe(sourcemaps.init()) //�������������� sourcemap
            .pipe(sass().on('error', sass.logError)) //������������
            .pipe(prefixer()) //������� ��������� ��������
            .pipe(cssnano()) //������
            .pipe(sourcemaps.write('.'))//�������� �����
            .pipe(gulp.dest(path.dest.css)) //� � build
            .on('end', browserSync.reload)
    )
});

gulp.task('img:build', function () {
    gulp.src(path.src.img) //������� ���� ��������
    // .pipe(imagemin({ //������ ��
    //     progressive: true,
    //     svgoPlugins: [{removeViewBox: false}],
    //     use: [pngquant()],
    //     interlaced: true
    // }))
        .pipe(gulp.dest(path.dest.img)) //� ������ � build
        .on('end', browserSync.reload)
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dest.fonts));
});

gulp.task('build', [
    'html:build',
    'css:build',
    'fonts:build',
    'img:build',
    'js:build'
]);

gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function (event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('img:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('webserverTunnel', function () {
    browserSync(configTunnel);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


gulp.task('default', ['build', 'webserver', 'watch']);