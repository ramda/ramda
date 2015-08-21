var assert = require('assert');

var R = require('..');


describe('pickValues', function() {
  var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, 1: 7};

  it('returns the values of the named properties of an object', function() {
    assert.deepEqual(R.pickValues(['a', 'c', 'f'], obj), [1, 3, 6]);
  });

  it('handles numbers as properties', function() {
    assert.deepEqual(R.pickValues([1], obj), [7]);
  });

  it('ignores properties not included', function() {
    assert.deepEqual(R.pickValues(['a', 'c', 'g'], obj), [1, 3]);
  });

  it('retrieves prototype properties', function() {
    var F = function(param) {this.x = param;};
    F.prototype.y = 40; F.prototype.z = 50;
    var obj = new F(30);
    obj.v = 10; obj.w = 20;
    assert.deepEqual(R.pickValues(['w', 'x', 'y'], obj), [20, 30, 40]);
  });

  it('is curried', function() {
    var copyAB = R.pickValues(['a', 'b']);
    assert.deepEqual(copyAB(obj), [1, 2]);
  });
});
