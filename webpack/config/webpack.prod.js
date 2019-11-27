const merge = require('webpack-merge')
const base = require('./webpack.config')
const webpack = require('webpack')
base.mode = 'production'
const config = merge(base, {
  plugins: [
    new webpack.optimize.SplitChunksPlugin({
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 6,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        a: {
          test: /[\\/]node_modules[\\/]jquery[\\/]/,
          name: 'jquery',
          chunks: 'all',
          priority: -10
        },
        b: {
          test: /[\\/]node_modules[\\/]vue[\\/]/,
          name: 'vue',
          chunks: 'all',
          priority: -10
        },
        c: {
          test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
          name: 'bootstrap',
          chunks: 'all',
          priority: -10
        },
        d: {
          test: /[\\/]node_modules[\\/]bootstrap-table[\\/]/,
          name: 'bootstrap-table',
          chunks: 'all',
          priority: -10
        },
        e: {
          test: /[\\/]node_modules[\\/]admin-lte[\\/]/,
          name: 'admin-lte',
          chunks: 'all',
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },

      }
    })
  ]
})

module.exports = config