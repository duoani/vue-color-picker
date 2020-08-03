const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'development';

const devtool = env === 'production' ? false : 'eval-source-map';

const extractOrInjectStyles = env !== 'production'
  ? 'vue-style-loader'
  : MiniCssExtractPlugin.loader;

module.exports = {
  mode: env,
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  devtool,
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'components': path.resolve(__dirname, '../src/components'),
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.resolve(__dirname, '../src'),
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: false
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, '../'),
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          extractOrInjectStyles,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new MiniCssExtractPlugin({
      filename: 'vue-color-picker.css',
    }),
    new VueLoaderPlugin(),
  ],
  stats: {
    children: false,
    modules: false,
  },
};
