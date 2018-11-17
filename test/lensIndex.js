var R = require('../source');
var eq = require('./shared/eq');


var testList = [{a: 1}, {b: 2}, {c: 3}];

describe('lensIndex', function() {
  describe('view', function() {
    it('focuses list element at the specified index', function() {
      eq(R.view(R.lensIndex(0), testList), {a: 1});
    });
    it('returns undefined if the specified index does not exist', function() {
      eq(R.view(R.lensIndex(10), testList), undefined);
    });
  });
  describe('set', function() {
    it('sets the list value at the specified index', function() {
      eq(R.set(R.lensIndex(0), 0, testList), [0, {b: 2}, {c: 3}]);
    });
  });
  describe('over', function() {
    it('applies function to the value at the specified list index', function() {
      eq(R.over(R.lensIndex(2), R.keys, testList), [{a: 1}, {b: 2}, ['c']]);
    });
  });
  describe('composability', function() {
    it('can be composed', function() {
      var nestedList = [0, [10, 11, 12], 1, 2];
      var composedLens = R.compose(R.lensIndex(1), R.lensIndex(0));

      eq(R.view(composedLens, nestedList), 10);
    });
  });
  describe('well behaved lens', function() {
    it('set s (get s) === s', function() {
      eq(R.set(R.lensIndex(0), R.view(R.lensIndex(0), testList), testList), testList);
    });
    it('get (set s v) === v', function() {
      eq(R.view(R.lensIndex(0), R.set(R.lensIndex(0), 0, testList)), 0);
    });
    it('get (set(set s v1) v2) === v2', function() {
      eq(
        R.view(R.lensIndex(0), R.set(R.lensIndex(0), 11, R.set(R.lensIndex(0), 10, testList))),
        11
      );
    });
  });
});
