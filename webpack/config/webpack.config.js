const path = require('path')
const fs = require('fs')
const PhpWebpackPlugin = require('./php-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'
const webpack = require('webpack');

const jsPath = path.resolve(__dirname, '../src/js')

var res = {}
const getFiles = (p, d) => {
  var f = fs.readdirSync(p)
  f.forEach((e) => {
    e = path.join(p, e)
    var info = fs.statSync(e)
    if (info.isFile()) {
      var name = path.basename(e, '.js')
      d ? ( res[d +'\\'+ name] = e ) : ( res[name] = e )
    } else {
      var dir = e.substring(e.lastIndexOf('\\') + 1, e.length)
      var dname = d ? ( d + '\\' + dir ) : dir
      getFiles(p + '\\' + dir, dname)
    }
  })
  return res
}

const config = {
  entry: getFiles(jsPath),
  output: {
    filename: devMode?'[name].js':'[name].[contenthash].js',
    path: path.resolve(__dirname, '../../public/static/dist'),
    library: 'I'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [{
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              plugins: (loader) => [
                require('autoprefixer')()
              ]
            }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  performance: { hints: false },
  plugins: [
    new PhpWebpackPlugin({
       assetsMapPath: path.resolve(__dirname, '../../config/webpack.php'),
      //devPath: 'http://localhost:8080/', // 可选，开发模式下assets路径，一般配合devServer使用
      //prodPath: '/dist/', // 可选，生产模式下assets路径
     }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      // chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
      chunkFilename: devMode ? '[id].[name].css' : '[id].[name].[contenthash].css',
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    })
  ]
}

module.exports = config