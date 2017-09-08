import uglify from 'rollup-plugin-uglify';
import pkg from './package.json'

var banner = '//  Ramda v' + pkg.version + '\n'
  + '//  https://github.com/ramda/ramda\n'
  + '//  (c) 2013-' + new Date().getFullYear() + ' Scott Sauyet, Michael Hurley, and David Chambers\n'
  + '//  Ramda may be freely distributed under the MIT license.\n';

var env = process.env.NODE_ENV;

var config = {
  format: 'umd',
  moduleName: 'R',
  exports: 'named',
  banner: banner,
  plugins: [],
};

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    })
  );
}

export default config;
