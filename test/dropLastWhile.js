var assert = require('assert');

var R = require('..');


describe('dropLastWhile', function() {
  it('skips elements while the function reports `true`', function() {
    assert.deepEqual(R.dropLastWhile(function(x) {return x >= 5;}, [1, 3, 5, 7, 9]), [1, 3]);
  });

  it('returns an empty list for an empty list', function() {
    assert.deepEqual(R.dropLastWhile(function() { return false; }, []), []);
    assert.deepEqual(R.dropLastWhile(function() { return true; }, []), []);
  });

  it('starts at the right arg and acknowledges undefined', function() {
    var sublist = R.dropLastWhile(function(x) {return x !== void 0;}, [1, 3, void 0, 5, 7]);
    assert.strictEqual(sublist.length, 3);
    assert.strictEqual(sublist[0], 1);
    assert.strictEqual(sublist[1], 3);
    assert.strictEqual(sublist[2], void 0);
  });

  it('is curried', function() {
    var dropGt7 = R.dropLastWhile(function(x) {return x > 7;});
    assert.deepEqual(dropGt7([1, 3, 5, 7, 9]), [1, 3, 5, 7]);
    assert.deepEqual(dropGt7([1, 3, 5]), [1, 3, 5]);
  });
});
