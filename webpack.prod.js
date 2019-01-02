


const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const webpackConfig = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
});
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html'
})
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const versionFile = Math.round(+new Date()/1000);
module.exports = {
  entry: {
    main: './src/index.jsx',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk',
      'reselect',
      'moment'
    ]
  },
  output: {
    path: path.resolve('dist'),
    filename: 'js/[name]-'+versionFile+'.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      // { test: /\.css$/, loader: "style-loader!css-loader" },
      // { test: /\.scss$/,loader: ['style-loader', 'css-loader', 'sass-loader']},
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: {minimize: true} },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer({ browsers: ['> 1%', 'IE >= 10'] })],
              },
            },
            { loader: 'sass-loader' },
          ],
        }),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: {minimize: true} },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer({ browsers: ['> 1%', 'IE >= 10'] })],
              },
            },
            { loader: 'sass-loader' },
          ],
        }),
      },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'url-loader?limit=100000' },
      { test: /\.(jpe?g|png|gif|svg)$/i, use: ['url-loader?limit=10000','img-loader']}
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig, 
    webpackConfig,
    new ExtractTextPlugin('css/main-'+versionFile+'.css'),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'js/vendor-'+versionFile+'.js' }),
    new webpack.optimize.UglifyJsPlugin({
      parallel: {
        cache: true,
        workers: 2,
      },
    }),
  ]
}