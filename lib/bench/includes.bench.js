var includes = require('../..').includes;

var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function randomLowerAlpha() {
  return String.fromCharCode(97 + (Math.random() * 26) >>> 0);
}

function nativeIncludes(x, xs) {
  return xs.includes(x);
}

module.exports = {
  name: 'includes',
  tests: {
    'includes(c, cs)': function() {
      return includes(randomLowerAlpha(), alphabet);
    },
    'native includes': function() {
      return nativeIncludes(randomLowerAlpha(), alphabet);
    }
  }
};
