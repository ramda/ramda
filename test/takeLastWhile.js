var assert = require('assert');

var R = require('..');


describe('takeLastWhile', function() {
  it('continues taking elements while the function reports `true`', function() {
    assert.deepEqual(R.takeLastWhile(function(x) {return x !== 5;}, [1, 3, 5, 7, 9]), [7, 9]);
  });

  it('starts at the right arg and acknowledges undefined', function() {
    assert.deepEqual(R.takeLastWhile(function() { assert(false); }, []), []);
    assert.deepEqual(R.takeLastWhile(function(x) {return x !== void 0;}, [1, 3, void 0, 5, 7]), [5, 7]);
  });

  it('is curried', function() {
    var takeLastUntil7 = R.takeLastWhile(function(x) {return x !== 7;});
    assert.deepEqual(takeLastUntil7([1, 3, 5, 7, 9]), [9]);
    assert.deepEqual(takeLastUntil7([2, 4, 6, 8, 10]), [2, 4, 6, 8, 10]);
  });
});
