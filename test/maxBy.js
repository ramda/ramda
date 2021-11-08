var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('maxBy', function() {

  it('returns the larger value as determined by the function', function() {
    eq(R.maxBy(function(n) { return n * n; }, -3, 2), -3);
    eq(R.maxBy(R.prop('x'), {x: 3, y: 1}, {x: 5, y: 10}), {x: 5, y: 10});
  });

  it('throws a typeError if the returned values by the function cannot be compared', function() {
    assert.throws(function() { R.maxBy(n => n * 2, 1, undefined); }, TypeError);
  });
});
