var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('minBy', function() {

  it('returns the smaller value as determined by the function', function() {
    eq(R.minBy(function(n) { return n * n; }, -3, 2), 2);
    eq(R.minBy(R.prop('x'), {x: 3, y: 1}, {x: 5, y: 10}), {x: 3, y: 1});
  });

  it('throws a typeError if the returned values by the function cannot be compared', function() {
    assert.throws(
      function() { R.minBy(n => n * 2, 1, undefined); },
      function(err) {
        return err.constructor === TypeError &&
          err.message === 'cannot compare 2 with NaN';
      }
    );
  });
});
