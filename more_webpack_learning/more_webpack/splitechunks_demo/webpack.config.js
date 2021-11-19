const { resolve } = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    index: './index.js',
    onther: './index1.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: resolve(__dirname, 'lib'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                corejs: '3',
                targets: {
                  chrome: 58,
                },
                useBuiltIns: 'usage',
              },
            ],
            '@babel/preset-react',
          ],
        },
      },
      {
        test: /.html$/,
        use: 'html-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    splitChunks: {
        cacheGroups: {
        commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 1,
            minSize:1
        },
        vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
            minSize:1,
            minChunks: 1,
            priority:1
          }
      },
    },
  },
  mode: 'development',
}

/*

 缓存组可以继承和/或覆盖splitChunks.*的任何选项;但是test、priority和reuseExistingChunk只能在缓存组级别上配置。若要禁用任何默认缓存组，请将它们设置为false。 
  cacheGroups: {
   default: false
  }

    
*/
