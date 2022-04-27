const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (env, options) => {
  const isDevMode = options.mode !== 'production';

  let plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      base: '/',
      favicon: path.resolve(__dirname, './src/images/favicon.ico'),
    }),
  ];
  if (isDevMode) plugins.push(new ReactRefreshWebpackPlugin());
  if (!isDevMode) {
    plugins = [
      ...plugins,
      new MiniCssExtractPlugin(),
      new CopyWebpackPlugin({
        patterns: [{ from: 'public' }],
      }),
      new CleanWebpackPlugin(),
    ];
  }

  const babelPresets = ['@babel/preset-react'];
  if (!isDevMode) babelPresets.unshift('@babel/preset-env');

  return {
    mode: isDevMode ? 'development' : 'production',
    entry: ['regenerator-runtime/runtime.js', path.resolve(__dirname, './src/index.jsx')],
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
    devServer: {
      hot: true,
      historyApiFallback: true,
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: babelPresets,
                plugins: [isDevMode && require.resolve('react-refresh/babel')].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|svg)$/,
          exclude: /node_modules/,
          loader: 'file-loader',
        },
      ],
    },
  };
};
