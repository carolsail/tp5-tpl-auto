let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const output = '../public/static/dist'

mix.autoload({
  jquery: ['$', 'jQuery', 'jquery', 'window.jQuery'],
});

mix.js('assets/js/admin-lte.js', `${output}/js`)
  .sass('assets/sass/admin-lte.scss', `${output}/css`);

mix.js('assets/js/backend/test.js', `${output}/js`)
  .webpackConfig({
    output: {
      libraryTarget: "var",
      library: "I"
    }
  });

mix.extract([
  'admin-lte',
  'axios',
  'bootstrap-sass',
  'fastclick',
  'jquery',
  'jquery-slimscroll',
  'lodash',
  'vue',
], `${output}/js/vendor.js`);

mix.version();

mix.setPublicPath(output);
