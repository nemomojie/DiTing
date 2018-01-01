'use strict';

const isProd = process.env.NODE_ENV === 'production';

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base-config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const fixedEntry = [ './app/public/entry/entry-client.js' ];
const hotEntry = [ 'webpack-hot-middleware/client' ];
const fixedPlugins = [
  // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
  // 以便可以在之后正确注入异步 chunk。
  // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity,
  }),
  // 此插件在输出目录中
  // 生成 `vue-ssr-client-manifest.json`。
  new VueSSRClientPlugin(),
];
const hotPlugins = isProd ? [] : [ new webpack.HotModuleReplacementPlugin() ];

module.exports = merge(baseConfig, {
  entry: isProd ? fixedEntry : [ ...fixedEntry, ...hotEntry ],
  plugins: isProd ? fixedPlugins : [ ...fixedPlugins, ...hotPlugins ],
});
