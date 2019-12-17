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
  },
  resolve: {
    alias: {
      'art-template': 'art-template/lib/template-web'
    }
  },
  module: {
    rules: [
        {
            test: /\.art$/,
            loader: 'art-template-loader',
            options: {}
        }
    ]
  }
})

mix.autoload({
  jquery: ['$', 'jQuery', 'jquery', 'window.jQuery'],
  lodash: ['_'],
  toastr: ['toastr', 'Toastr'],
  layerui: ['layer', 'Layer'],
  'art-template': ['template', 'Template'],
  plupload: ['plupload'],
  moment: ['moment', 'Moment']
});

//ps: 多层文件夹的打包顺序要放在前面，关系到vendor.js/manifest.js位置(最后一个.js()的同级位置)
mix.js('assets/backend/js/admin-lte.js', `${output}/backend/js`) // 打包后台js
.sass('assets/backend/sass/admin-lte.scss', `${output}/backend/css`) // 打包后台css
.js('assets/backend/js/general/attachment.js', `${output}/backend/js/general`)
.js('assets/backend/js/general/profile.js', `${output}/backend/js/general`)
.js('assets/backend/js/test.js', `${output}/backend/js`)
.js('assets/backend/js/index.js', `${output}/backend/js`)
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
'bootstrap-daterangepicker', 
'eonasdan-bootstrap-datetimepicker', 
'dragsort', 
'cxselect', 
'summernote']) // 提取依赖库
.setResourceRoot('../') // 设置资源目录
.setPublicPath(`${output}/backend`); // 设置 mix-manifest.json 目录