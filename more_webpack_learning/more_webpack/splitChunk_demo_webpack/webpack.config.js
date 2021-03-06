const { AutoWebPlugin } = require('web-webpack-plugin')
const autoPlugin = new AutoWebPlugin(
  // the directory hold all pages
  './src',
  {
    // all props below is not required

    // {string,function}
    // the template file path used by all pages
    // if typeof template ===string: template config is html template file full path
    // if typeof template ===function: template config is function(pageName)=>newFullPath ,ask user for detail
    template: './src/template.html',

    // { function(pageName,templateFullPath)=>htmlString }
    // if provide AutoWebPlugin will use Compiler to compile org template file to html content before used it in WebPlugin
    templateCompiler: (pageName, templateFullPath) => '',

    // {string,function}
    // get WebPlugin template's string content, high priority than template
    // typeof===string: template config is html template file string content
    // typeof===function: template config is function,ask user for detail
    templateContent: `<!DOCTYPE html>....`,

    // {string,function}
    // javascript main file for current page,if it is null will use index.js in current page directory as main file
    // typeof entry===string: entry config is entry file full path
    // typeof entry===function: entry config is function(pageName)=>newFullPath ,ask user for detail
    entry: null,

    // {function}
    // get WebPlugin output filename,default filename is pageName
    // set filename as function(pageName)=>filename to add custom logic
    filename: null,

    // {Array} pre append to all page's entry
    // preEntrys: [''],

    // {Array} post append to all page's entry
    // postEntrys: [''],

    // {string} publicPath for css file,for js file will use webpack.publicPath
    stylePublicPath: null,

    // page name list will not ignore by AutoWebPlugin(Not output html file for this page name)
    ignorePages: ['pageName'],

    // whether output a pagemap.json file which contain all pages has been resolved with AutoWebPlugin in this way:
    // {"page name": "page url",}
    outputPagemap: true,
    // commonsChunk: {
    //   name: 'commons',
    //   chunks: 'all',
    //   minChunks: 1,
    //   minSize: 1,
    // },
    // vendor: {
    //   test: /[\\/]node_modules[\\/]/,
    //   name: 'vendor',
    //   chunks: 'all',
    //   minSize: 1,
    //   minChunks: 1,
    //   priority: 1,
    // },
  },
)
const { resolve } = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: autoPlugin.entry({
    base: './src/base.js',
  }),
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
  plugins: [autoPlugin, new CleanWebpackPlugin()],
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 12,
          name: 'vendors',
          minChunks: 1,
          minSize: 1,
          chunks: 'all',
        },
        react: {
          name: 'chunk-react',
          priority: 20,
          test: /[\\/]node_modules[\\/]_?react/,  
          chunks: 'all',
        },
        common: {
          name: 'common',
          priority: 10,
          minChunks: 1,
          minSize: 1,
          chunks: 'all',
        },
      },
    },
  },
  mode: 'development',
}

/*

 ????????????????????????/?????????splitChunks.*???????????????;??????test???priority???reuseExistingChunk?????????????????????????????????????????????????????????????????????????????????????????????false??? 
  cacheGroups: {
   default: false
  }

    
  
*/
