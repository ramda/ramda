var assert = require('assert');

var R = require('..');


describe('takeWhile', function() {
  it('continues taking elements while the function reports `true`', function() {
    assert.deepEqual(R.takeWhile(function(x) {return x !== 5;}, [1, 3, 5, 7, 9]), [1, 3]);
  });

  it('starts at the right arg and acknowledges undefined', function() {
    assert.deepEqual(R.takeWhile(function() { assert(false); }, []), []);
    assert.deepEqual(R.takeWhile(function(x) {return x !== void 0;}, [1, 3, void 0, 5, 7]), [1, 3]);
  });

  it('is curried', function() {
    var takeUntil7 = R.takeWhile(function(x) {return x !== 7;});
    assert.deepEqual(takeUntil7([1, 3, 5, 7, 9]), [1, 3, 5]);
    assert.deepEqual(takeUntil7([2, 4, 6, 8, 10]), [2, 4, 6, 8, 10]);
  });
});
