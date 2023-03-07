const { merge } = require('webpack-merge')
const path = require('path')
const common = require('./webpack.config')

const config = {
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, '/'),
    open: false,
    port: 3001,
    hot: true,
    compress: true, // gzip 压缩,
    historyApiFallback: false,
    proxy: {
      '/api': {
        target: 'http://192.168.3.13:3000/',
        pathRewrite: { '/api': '' },
        changeOrigin: true
      }
    }
  }
}

module.exports = merge(common, config)
