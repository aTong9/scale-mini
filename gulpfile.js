/**
 * 预览使用gulp来压缩文件，解决当前开发模式无法预览的流程问题
 */
const gulp = require('gulp')
const uglify = require('gulp-uglify')
const cssnano = require('gulp-cssnano')
const htmlClean = require('gulp-htmlclean')
const imageMin = require('gulp-imagemin')
const cache = require('gulp-cache')
const pngquant = require('imagemin-pngquant')
const del = require('del')

function minifyJS() {
  return gulp
    .src('dist/**/*.js')
    .pipe(
      uglify({
        output: {
          comments: false
        }
      })
    )
    .pipe(gulp.dest('./build'))
}

function minifyCSS() {
  return gulp.src('dist/**/*.wxss').pipe(cssnano()).pipe(gulp.dest('./build'))
}

function minifyHTML() {
  return gulp.src('dist/**/*.wxml').pipe(htmlClean()).pipe(gulp.dest('./build'))
}
/**
 * 只压缩修改的图片。压缩图片时比较耗时，在很多情况下我们只修改了某些图片，没有必要压缩所有图片，使用”gulp-cache”只压缩修改的图片，没有修改的图片直接从缓存文件读取
 */
function minifyImg() {
  return (
    gulp
      // 1. 找到文件
      .src(['dist/**/**/*.{png,jpg,jpeg,gif,ico}'])
      // 2. 压缩文件
      // .pipe(imageMin())
      .pipe(
        cache(
          imageMin({
            optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            svgoPlugins: [{ removeViewBox: false }], //不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
          })
        )
      )
      // 3. 另存压缩后的文件
      .pipe(gulp.dest('./build/'))
  )
}
function copyOther() {
  return gulp.src(['dist/**/*.map', 'dist/**/*.json', 'dist/**/*.wxs']).pipe(gulp.dest('./build'))
}

function cleanBuild() {
  return del(['build/**/*'])
}

function cleanDist() {
  return del(['dist/**/*'])
}

function carry() {
  return gulp.src('build/**/*').pipe(gulp.dest('dist'))
}

gulp.task(
  'build',
  gulp.series(cleanBuild, gulp.parallel(minifyJS, minifyCSS, minifyHTML, minifyImg, copyOther), cleanDist, carry)
)

gulp.task('default', gulp.series('build'))
