var assert = require('assert');

var R = require('..');


describe('maxBy', function() {

  it('returns the larger value as determined by the function', function() {
    assert.strictEqual(R.maxBy(function(n) { return n * n; }, -3, 2), -3);
    assert.deepEqual(R.maxBy(R.prop('x'), {x: 3, y: 1}, {x: 5, y: 10}), {x: 5, y: 10});
  });

});
