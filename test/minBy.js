var assert = require('assert');

var R = require('..');


describe('minBy', function() {

  it('returns the smaller value as determined by the function', function() {
    assert.strictEqual(R.minBy(function(n) { return n * n; }, -3, 2), 2);
    assert.deepEqual(R.minBy(R.prop('x'), {x: 3, y: 1}, {x: 5, y: 10}), {x: 3, y: 1});
  });

});
