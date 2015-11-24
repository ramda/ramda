var contains = require('../..').contains;

var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function randomLowerAlpha() {
  return String.fromCharCode(97 + (Math.random() * 26) >>> 0);
}

function nativeIndexOf(x, xs) {
  return xs.indexOf(x) >= 0;
}

module.exports = {
  name: 'contains',
  tests: {
    'contains(c, cs)': function() {
      return contains(randomLowerAlpha(), alphabet);
    },
    'native indexOf': function() {
      return nativeIndexOf(randomLowerAlpha(), alphabet);
    }
  }
};
