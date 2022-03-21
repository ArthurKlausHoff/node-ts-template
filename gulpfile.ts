import gulp from "gulp";
import sourcemaps from "gulp-sourcemaps";
import del from "del";
import minify from "gulp-minify";
import ts from "gulp-typescript";
import merge from "merge2";


const tsProject = ts.createProject("tsconfig.json");
const files = ["src/**/*.json"];


function build(type?: string) {
    let stream: NodeJS.ReadWriteStream = tsProject.src();
    let dir = "dist/";
    switch(type){
    case "debug":
        dir = "debug/";
        stream = stream
            .pipe(sourcemaps.init())
            .pipe(tsProject())
            .pipe(sourcemaps.write("maps/"))
            .pipe(gulp.dest(dir));
        break;
    case "dist":
        stream = stream
            .pipe(tsProject())
            .pipe(minify({ noSource: true, ext: { min: ".js" } }))
            .pipe(gulp.dest(dir));
        break;
    default:
        stream = stream
            .pipe(tsProject())
            .pipe(gulp.dest(dir));
    }

    return merge([
        stream, gulp.src(files).pipe(gulp.dest(dir))
    ]);
}


gulp.task("clean", () => del(["dist", "debug", "*.tgz"]));
gulp.task("build", gulp.series("clean", () => build()));
gulp.task("build-debug", gulp.series("clean", () => build("debug")));
gulp.task("build-dist", gulp.series("clean", () => build("dist")));
gulp.task("default", gulp.series("build-debug"));
