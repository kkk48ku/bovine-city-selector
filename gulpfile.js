require("babel-polyfill");
const gulp = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const processors = [
    autoprefixer({
        browsers: ["last 0 versions", "> 5%"],
        cascade: true, //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);
        remove: true //是否去掉不必要的前缀 默认：true
    })
];
gulp.task("jsCompile", () => {
    return gulp
        .src("src/index.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});

gulp.task("sass", () => {
    return gulp
        .src("example/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest("./example"));
});

gulp.task("main", function() {
    gulp.watch(["./src/index.js"], gulp.series("jsCompile"));
    gulp.watch(["./example/*.scss"], gulp.series("sass"));
});
