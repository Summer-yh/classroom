'use strict';

let gulp = require('gulp');
let $ = require('gulp-load-plugins')();
let sass = require('gulp-sass');
let runSequence = require('run-sequence');
// let bowljsCLI = require('bowljs-cli');
let args = require('get-gulp-args')();
let buffer = require('vinyl-buffer');
let merge = require('merge-stream');
let spritesmith = require('gulp.spritesmith');
let stylish = require('jshint-stylish');
let replace = require('gulp-replace');
let fs = require('fs');
let path = require('path');

let util = require('./util');

let dirPath = process.argv[3].substring(2);
let WATCH_SRC = args[0];

let config = {
    sass: {
        src: './public/scss/',
        dest: './public/stylesheets/'
    },
    img: {
        src: './public/scss/',
        dest: './public/images/'
    }
    // js: {
    //     src: '../dev/modjs/page'
    // },
    // modjsPath: '../dev/modjs/page',
    // modjsSettingPath: '../dev/modjs/package-bowl.settings'
};

/* task */
gulp.task('sass', () => {
    return gulp.src(config.sass.src + `${WATCH_SRC}` + '/**/*.scss')
        .pipe(sass({
            sourceComments: 'map',
            outputStyle: 'nested'
        }).on('error', sass.logError))
        .pipe(gulp.dest(config.sass.dest + `${WATCH_SRC}`));
});

gulp.task('sass:watch', () => {
    gulp.watch(config.sass.src + `${WATCH_SRC}` + '/**/*.scss', ['sass']);
    console.dir('=== watch src with ' + config.sass.src + `${WATCH_SRC}` + '/**/*.scss', {
        colors: true
    });
});

/**
 * 代码质量检测task
 * gulp lint --<编译目录>
 * example: gulp lint --page/live/normal/1.0.1
 */
gulp.task('lint', () => {
    return gulp.src(config.js.src + dirPath + '/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(stylish));
});

/**
 * 雪碧图合并task，
 * 参数1：监听目录；
 * 参数2：生成的sass和图片的文件名；
 * 参数3：输出目录（参数3是特别需求才需要的）。
 * example：gulp sprite --live/normal/v2 --mySprite
 */
gulp.task('sprite', ['copy:images'], () => {
    var timestamp = + new Date();
    var DEST_SRC = args[2] !== undefined ? args[2] : args[0];
    var DEST_NAME = args[1];
    var spriteData = gulp.src(config.img.src + `${WATCH_SRC}` + '/**/*.png').pipe(spritesmith({
        imgName: DEST_NAME + '_' + timestamp + '.png',
        imgPath: 'http://file3.qf.56.itc.cn/style/' + `${DEST_SRC}/img/` + DEST_NAME + '_' + timestamp + '.png',
        cssName: '_' + args[1] + '.scss'
    }));

    let imgStream = spriteData.img
        .pipe(buffer())
        .pipe($.imagemin())
        .pipe(gulp.dest(config.img.dest + `${DEST_SRC}/img`));

    let cssStream = spriteData.css
        .pipe(gulp.dest(config.sass.src + `${DEST_SRC}/css`));

    return merge(imgStream, cssStream);
});

gulp.task('copy:images', () => {
    return gulp.src(config.img.src + `${WATCH_SRC}` + '/**/*.{jpg,gif}')
        .pipe($.imagemin())
        .pipe(gulp.dest(config.img.dest + `${WATCH_SRC}`));
});

gulp.task('images:min', () => {
    return gulp.src(config.img.src + `${WATCH_SRC}` + '/**/*.{png,jpg,gif}')
        .pipe($.imagemin())
        .pipe(gulp.dest(config.img.dest + `${WATCH_SRC}`));
});

gulp.task('css:min', () => {
    return gulp.src(config.sass.src + `${WATCH_SRC}` + '/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe($.cssmin())
        // .pipe($.rev())
        // .pipe(rev.manifest())
        .pipe(gulp.dest(config.sass.dest + `${WATCH_SRC}`));
});

/**
 * 编译sass task，
 * gulp watch --<监听目录>
 * example: gulp watch --live/normal/v1，就会只监听live/normal/v1目录下的sass文件
 */
gulp.task('watch', () => {
    if (util.existsDir()) {
        runSequence('sass:watch');
    } else {
        util.log();
    }
});

/**
 * 编译sass并压缩处理
 * gulp watchb --<监听目录>
 * example: gulp watchb --live/normal/v1，就会只监听live/normal/v1目录下的sass文件
 */
gulp.task('watchb', () => {
    if (util.existsDir()) {
        gulp.watch(config.sass.src + `${WATCH_SRC}` + '/**/*.scss', ['css:min']);
        console.dir('=== watch src with ' + config.sass.src + `${WATCH_SRC}` + '/**/*.scss', {
            colors: true
        });
    } else {
        util.log();
    }
});

/**
 * 编译打包sass task，
 * gulp build:css --<编译打包目录>
 * example: gulp build:css --live/normal/v1，就会编译打包live/normal/v1目录下的sass文件
 */
gulp.task('build:css', () => {
    if (util.existsDir()) {
        runSequence(['css:min']);
    } else {
        util.log();
    }
});

/**
 * 编译js task，
 * gulp build:js --<编译目录>
 * example: gulp build:js --page/live/normal/1.0.1
 */
// gulp.task('build:js', (callback) => {
//     bowljsCLI.build(config.modjsPath + dirPath, config.modjsSettingPath);
//     callback();
// });

/**
 * js文件 域名全局替换 task，
 * gulp replace --<监听目录>
 * example: gulp replace --page/live/normal/1.0.1
 */
// gulp.task('replace:js', () => {
//     gulp.src(config.modjsPath + dirPath + '/**/*.js')
//         .pipe(replace('http://qf.56.com', 'https://qf.56.com'))
//         .pipe(gulp.dest(config.modjsPath + dirPath))
// });

/**
 * scss文件 域名全局替换 task，
 * gulp replace --<监听目录>
 * example: gulp replace:css --live/normal/v1
 */
// gulp.task('replace:css', () => {
//     gulp.src(config.sass.src + dirPath + '/**/*.scss')
//         .pipe(replace('http://file3.qf.56.itc.cn', 'https://file3.qf.56.itc.cn'))
//         .pipe(gulp.dest(config.sass.src + dirPath))
// });

/**
 * 工具集
 */
let Util = {
    currentDir: '',
    /**
     * 检查当前监听或编译目录是否存在
     * @param type 类型 可选(默认是编译scss路径；如果是"js",则是编译js的路径)
     * @return true/false
     */
    existsDir: function(type) {
        let rootPath = __dirname.substring(0, __dirname.lastIndexOf('build') - 1),
            src = config.sass.src.substring(2),
            inputPath = dirPath;

        if (type === 'js') {
            src = config.modjsPath.substring(2);
        }

        this.currentDir = PATH.join(rootPath, src, inputPath);

        return FS.existsSync(this.currentDir);
    },
    //输出log
    log: function() {
        console.log(color('文件夹不存在--> ' + this.currentDir, 'red'));
    }
};
