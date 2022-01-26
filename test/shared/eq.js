var assert = require('assert');

var R = require('../../source/index.js');


module.exports = function(actual, expected) {
  assert.strictEqual(arguments.length, 2);
  assert.strictEqual(R.toString(actual), R.toString(expected));
};
