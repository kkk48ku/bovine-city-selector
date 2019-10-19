const gulp = require('gulp'),
	// 转换scss文件
	sass = require('gulp-sass'),
	// 处理css文件
	postcss = require('gulp-postcss'),
	// 使css兼容低版本浏览器
	autoprefixer = require('autoprefixer'),
	// 转换es6
	babelify = require('babelify'),
	// 使JS文件可以模块化开发
	browserify = require('browserify'),
	// 转成stream流，gulp系
	stream = require('vinyl-source-stream'),
	// 转成二进制流，gulp系
	buffer = require('vinyl-buffer');

const processors = [
	autoprefixer({
		// 兼容更低版本的浏览器
		overrideBrowserslist: ['last 0 versions', '> 5%'],
		cascade: true, //是否美化属性值 默认：true 像这样：
		//-webkit-transform: rotate(45deg);
		//        transform: rotate(45deg);
		remove: true //是否去掉不必要的前缀 默认：true
	})
];

gulp.task('main', function() {
	gulp.watch(['./example/index.js', './src/city-selector.js'], gulp.series('jsCompile'));
	gulp.watch(['./src/*.scss'], gulp.series('sass'));
});

gulp.task('jsCompile', () => {
	// 定义入口文件
	return (
		browserify({
			entries: 'example/index.js'
			// 开启后在打包的文件后有sourceMap(会使打包文件体积较大)
			// debug: true
		})
			// 在bundle之前先转换es6，因为readabel stream 流没有transform方法
			.transform('babelify', { presets: ['es2015'] })
			// 转成node readabel stream流，拥有pipe方法（stream流分小片段传输）
			.bundle()
			// 关闭后保存报错可以自动重启
			// .on('error', function (error) {
			//     console.log(error.toString())
			// })
			// 转成gulp系的stream流，node系只有content，添加名字
			.pipe(stream('bundle.js'))
			// 转成二进制的流（二进制方式整体传输）
			.pipe(buffer())
			// 输出
			.pipe(gulp.dest('example/'))
	);
});

gulp.task('sass', () => {
	return gulp
		.src('src/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(gulp.dest('./src'))
		.pipe(gulp.dest('./dist'));
});

// 打包生成最终的文件
gulp.task('build', () => {
	// 定义入口文件
	return (
		browserify({
			entries: 'src/city-selector.js'
			// 开启后在打包的文件后有sourceMap(会使打包文件体积较大)
			// debug: true
		})
			// 在bundle之前先转换es6，因为readabel stream 流没有transform方法
			.transform('babelify', { presets: ['es2015'] })
			// 转成node readabel stream流，拥有pipe方法（stream流分小片段传输）
			.bundle()
			// 转成gulp系的stream流，node系只有content，添加名字
			.pipe(stream('city-selector.js'))
			// 转成二进制的流（二进制方式整体传输）
			.pipe(buffer())
			// 输出
			.pipe(gulp.dest('dist/'))
	);
});
