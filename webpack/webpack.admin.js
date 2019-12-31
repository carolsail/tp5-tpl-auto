const mix = require('laravel-mix');
const path = require('path');

if (mix.inProduction()) {
  mix.version()
}


const output = '../public/static/dist'

mix.webpackConfig({
  output: {
    publicPath: `${output}/backend`, // 设置默认打包目录
    chunkFilename: `js/[name].${mix.inProduction() ? '[chunkhash].' : ''}js`, // 路由懒加载的时候打包出来的js文件
    // libraryTarget: "var",
    // library: "I"
  },
  resolve: {
    alias: {
      'art-template': 'art-template/dist/template-native',
      '@common': path.resolve('assets/common/js')
    }
  }
})

mix.autoload({
  jquery: ['$', 'jQuery', 'jquery', 'window.jQuery'],
  lodash: ['_'],
  toastr: ['toastr', 'Toastr'],
  layerui: ['layer', 'Layer'],
  plupload: ['plupload'],
  moment: ['moment', 'Moment'],
  'art-template': ['template', 'Template']
});

mix.js('assets/backend/js/admin-lte.js', `${output}/backend/js`) // 打包后台js
.sass('assets/backend/sass/admin-lte.scss', `${output}/backend/css`) // 打包后台css
.js('assets/backend/js/backend.js', `${output}/backend/js`) // backend.js通过require动态按需引入
.extract([
'admin-lte', 
'bootstrap-sass', 
'fastclick', 
'jquery', 
'jquery-slimscroll', 
'icheck',
'lodash', 
'layerui',
'moment', 
'toastr', 
'bootstrap-table',
'art-template',
'nice-validator', 
'plupload', 
'select2', 
'bootstrap-datepicker', 
'bootstrap-daterangepicker', 
'eonasdan-bootstrap-datetimepicker', 
'dragsort', 
'cxselect',
'summernote', 
'jstree']) // 提取依赖库
.setResourceRoot('../') // 设置资源目录
.setPublicPath(`${output}/backend`); // 设置 mix-manifest.json 目录