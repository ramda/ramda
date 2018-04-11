var uglify = require('rollup-plugin-uglify');
var { sizeSnapshot } = require('rollup-plugin-size-snapshot');
var pkg = require('./package.json');

var banner = '//  Ramda v' + pkg.version + '\n'
  + '//  https://github.com/ramda/ramda\n'
  + '//  (c) 2013-' + new Date().getFullYear() + ' Scott Sauyet, Michael Hurley, and David Chambers\n'
  + '//  Ramda may be freely distributed under the MIT license.\n';

var input = './source/index.js';

module.exports = [
  {
    input,
    output: {
      file: 'dist/ramda.js',
      format: 'umd',
      name: 'R',
      exports: 'named',
      banner
    },
    plugins: [
      sizeSnapshot()
    ]
  },

  {
    input,
    output: {
      file: 'dist/ramda.min.js',
      format: 'umd',
      name: 'R',
      exports: 'named',
      banner
    },
    plugins: [
      uglify({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  }
];
