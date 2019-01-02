


const path = require('path');
const port = 3000

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html'
})
const WebpackBrowserPlugin = require('webpack-browser-plugin');
const WebpackBrowserPluginConfig = new WebpackBrowserPlugin({
  port: port,
  url: 'http://localhost'
});
module.exports = {
  entry: './src/index.jsx',
  output: {
    // path: path.resolve('dist'),
    // filename: 'index_bundle.js',
    // publicPath: '/'
    filename: 'js/[name].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss$/,loader: ['style-loader', 'css-loader', 'sass-loader']},
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'url-loader?limit=100000' },
      { test: /\.(jpe?g|png|gif|svg)$/i, use: ['url-loader?limit=10000','img-loader']}
    ]
  },
  plugins: [HtmlWebpackPluginConfig, WebpackBrowserPluginConfig],
  devtool: '#source-map',
  devServer: {
  	port: port,
    historyApiFallback: true,
    inline: true
  }
}