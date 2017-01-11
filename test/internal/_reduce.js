var assert = require('assert');
var _reduce = require('../../src/internal/_reduce');

var id = function(acc, next) { return acc; };

describe('_reduce', function() {
  it('displays a more helpful error when passed null', function() {
    assert.throws(function() {
      _reduce(id, 0, null);
    }, /reduce: list cannot be null or undefined/);
  });
  it('displays a more helpful error when passed undefined', function() {
    assert.throws(function() {
      _reduce(id, 0, undefined);
    }, /reduce: list cannot be null or undefined/);
  });
});
