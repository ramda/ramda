var uglify = require('rollup-plugin-uglify');
var pkg = require('./package.json');

var banner = '//  Ramda v' + pkg.version + '\n'
  + '//  https://github.com/ramda/ramda\n'
  + '//  (c) 2013-' + new Date().getFullYear() + ' Scott Sauyet, Michael Hurley, and David Chambers\n'
  + '//  Ramda may be freely distributed under the MIT license.\n';

var input = 'source/index.js';

var config = {
  input: input,
  output: {
    format: 'umd',
    name: 'R',
    exports: 'named'
  },
  banner: banner,
  plugins: []
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  );
}

module.exports = config;
