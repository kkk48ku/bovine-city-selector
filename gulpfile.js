require("babel-polyfill");
const gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    browserify = require('browserify'),
    // 转成stream流，gulp系
    stream = require('vinyl-source-stream'),
    // 转成二进制流，gulp系
    buffer = require('vinyl-buffer');

const processors = [
    autoprefixer({
        overrideBrowserslist: ["last 0 versions", "> 5%"],
        cascade: true, //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);
        remove: true //是否去掉不必要的前缀 默认：true
    })
];

gulp.task("jsCompile", () => {
    // 定义入口文件
    return browserify({
        entries: 'src/city-selector.js',
        debug: true
    })
        // 在bundle之前先转换es6，因为readabel stream 流没有transform方法
        .transform("babelify", { presets: ['es2015'] })
        // 转成node readabel stream流，拥有pipe方法（stream流分小片段传输）
        .bundle()
        // .pipe(babel())
        .on('error', function (error) {
            console.log(error.toString())
        })
        // 转成gulp系的stream流，node系只有content，添加名字
        .pipe(stream('city-selector.js'))
        // 转成二进制的流（二进制方式整体传输）
        .pipe(buffer())
        // 输出
        .pipe(gulp.dest('dist/'))
});

gulp.task("sass", () => {
    return gulp
        .src("example/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest("./example"));
});

gulp.task("main", function () {
    gulp.watch(["./src/*.js"], gulp.series("jsCompile"));
    gulp.watch(["./example/*.scss"], gulp.series("sass"));
});
