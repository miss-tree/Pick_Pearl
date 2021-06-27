//引入gulp
const gulp = require("gulp");
//压缩css代码
const CleanCss = require("gulp-clean-css");

gulp.task("mini-css",function(){
//		要处理的css文件,导入进来
		gulp.src("static/css/*.css")
//		压缩css代码
		.pipe(CleanCss({compatibility:'ie8'}))
		.pipe(gulp.dest("/dist/css"))
})


var browserSync = require('browser-sync').create();
// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port:8000
    });
    gulp.watch(["src/*.html"],browserSync.reload).on("change",browserSync.reload)
//  热更新,监听html的变化,如果有变化就进行重载
	gulp.watch("src/scss/*.scss",[sass]).on("change",browserSync.reload)
	//热更新，监听scss的变化，如果有变化就执行sass命令
});
