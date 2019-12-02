const mix = require('laravel-mix');

if (mix.inProduction()) {
  mix.version()
}


const output = '../public/static/dist'

mix.webpackConfig({
  output: {
    publicPath: `${output}/backend`, // 设置默认打包目录
    chunkFilename: `js/[name].${mix.inProduction() ? '[chunkhash].' : ''}js`, // 路由懒加载的时候打包出来的js文件
    libraryTarget: "var",
    library: "I"
  }
})

mix.autoload({
  jquery: ['$', 'jQuery', 'jquery', 'window.jQuery'],
  lodash: ['_']
});

mix.js('assets/backend/js/admin-lte.js', `${output}/backend/js`) // 打包后台js
.sass('assets/backend/sass/admin-lte.scss', `${output}/backend/css`) // 打包后台css
.js('assets/backend/js/test.js', `${output}/backend/js`)
.extract(['admin-lte', 'bootstrap-sass', 'fastclick', 'jquery', 'jquery-slimscroll', 'lodash']) // 提取依赖库
.setResourceRoot('../') // 设置资源目录
.setPublicPath(`${output}/backend`); // 设置 mix-manifest.json 目录