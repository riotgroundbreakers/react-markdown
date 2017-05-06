'use strict'

var path = require('path')
var webpack = require('webpack')
var assign = require('object-assign')
var baseConfig = require('./webpack.config')

var config = assign({}, baseConfig, {
  entry: [path.join(__dirname, 'src', 'react-markdown.js')],
  output: {
    path: path.join(__dirname, 'umd'),
    filename: 'react-markdown.js',
    libraryTarget: 'umd'
  },
  plugins: baseConfig.plugins.concat([
    new webpack.IgnorePlugin(/path-browserify/)
  ])
})

module.exports = config
