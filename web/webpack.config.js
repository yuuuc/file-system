const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInjectPreload = require('@principalstudio/html-webpack-inject-preload')
// import { Configuration } from 'webpack';

/**
 * @type {Configuration}
 */
const config = {
  entry: {
    app: './src/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash:8].js',
    publicPath: '/',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[hash][ext][query]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        }
      },
      {
        test: /\.(woff(2)?|eot|tff|otf)$/,
        type: 'asset/inline'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // 为0 只有css-loader 会处理@import ， 为1 css-loader和postcss-loader 都会处理@import
            }
          }
          // 'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html'
    }),
    new HtmlWebpackInjectPreload({
      files: [
        {
          match: /(vendor-*|app).*.\.js$/,
          attributes: { as: 'script' }
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
}

module.exports = config
