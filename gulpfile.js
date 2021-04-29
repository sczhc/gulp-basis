const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass'); // 把scss 转成 css
const csso = require('gulp-csso'); // 压缩css
const autoprefixer = require('gulp-autoprefixer'); // 给css添加前缀
const babel = require('gulp-babel'); // es6 转成 es5
const uglify = require('gulp-uglify'); // 压缩js
// const smushit = require('gulp-smushit'); // 压缩图片
const imagemin = require('gulp-imagemin'); // 压缩图片

function Sass() {
  return src('compile/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(autoprefixer())
    .pipe(dest('dist/css'))
}

function Script() {
  return src('compile/scripts/**/*.js')
    .pipe(babel({
      presets: ['@babel/env'],
      plugins: ['@babel/transform-runtime']
    }))
    // .pipe(uglify())
    .pipe(dest('dist/js'))
}

function Image() {
  return src('compile/images/**/*.{jpg,png}')
    .pipe(imagemin({ optimizationLevel: 6 }))
    .pipe(dest('dist/images'))
}

const Init = parallel(Sass, Script, function () {
  watch('compile/scss/**/*.scss', Sass)
  watch('compile/scripts/**/*.js', Script)
})


const fs = require('fs')
const join = require('path').join
function findSync(startPath) {
  let result = []
  function finder(path) {
    let files = fs.readFileSync(path)
    files.forEach(val => {
      let fPath = join(path, val)
      let stats = fs.statSync(fPath)
      if (stats.isDirectory()) finder(fPath)
      if (stats.isFile()) result.push({ path: './' + fPath, name: val })
    })
  }
  finder(startPath)
  let res = result.map(item => {
    item.path = item.path.replace(/\\/g, '/')
    return item
  })
  console.log(res)
  return res
}

module.exports = {
  default: Init,
  Image,
  findSync
}