var contains = require('../..').contains;

var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function randomLowerAlpha() {
  return String.fromCharCode(97 + (Math.random() * 26) >>> 0);
}

function nativeIncludes(x, xs) {
  return xs.includes(x);
}

module.exports = {
  name: 'contains',
  tests: {
    'contains(c, cs)': function() {
      return contains(randomLowerAlpha(), alphabet);
    },
    'native includes': function() {
      return nativeIncludes(randomLowerAlpha(), alphabet);
    }
  }
};
