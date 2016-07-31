var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

// Servidor estático que vigila los cambios de archivos scss y html

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);

});

// Compilar Sass a CSS, aplicar autoprefixer, enviar archivo CSS a su carpeta e inyectar al navegador

gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
    .pipe(sass())
    .pipe (sass({
        outputStyle: 'expanded',
    }))
    .pipe (autoprefixer ({
        browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
