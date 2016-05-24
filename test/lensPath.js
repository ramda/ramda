var R = require('..');
var eq = require('./shared/eq');


var testObj = {
  a: {
    b: 2
  },
  d: 3
};

describe('lensPath', function() {
  describe('view', function() {
    it('focuses the specified object property', function() {
      eq(R.view(R.lensPath(['d']), testObj), 3);
      eq(R.view(R.lensPath(['a', 'b']), testObj), 2);
      eq(R.view(R.lensPath([]), testObj), testObj);
    });
  });
  describe('set', function() {
    it('sets the value of the object property specified', function() {
      eq(R.set(R.lensPath(['d']), 0, testObj), {a: {b: 2}, d: 0});
      eq(R.set(R.lensPath(['a', 'b']), 0, testObj), {a: {b: 0}, d: 3});
      eq(R.set(R.lensPath([]), 0, testObj), 0);
    });
    it('adds the property to the object if it doesn\'t exist', function() {
      eq(R.set(R.lensPath(['X']), 0, testObj), {a: {b: 2}, d: 3, X: 0});
      eq(R.set(R.lensPath(['a', 'X']), 0, testObj), {a: {b: 2, X: 0}, d: 3});
    });
  });
  describe('over', function() {
    it('applies function to the value of the specified object property', function() {
      eq(R.over(R.lensPath(['d']), R.inc, testObj), {a: {b: 2}, d: 4});
      eq(R.over(R.lensPath(['a', 'b']), R.inc, testObj), {a: {b: 3}, d: 3});
      eq(R.over(R.lensPath([]), R.toPairs, testObj), [['a', {b: 2}], ['d', 3]]);
    });
    it('applies function to undefined and adds the property if it doesn\'t exist', function() {
      eq(R.over(R.lensPath(['X']), R.identity, testObj), {a: {b: 2}, d: 3, X: undefined});
      eq(R.over(R.lensPath(['a', 'X']), R.identity, testObj), {a: {b: 2, X: undefined}, d: 3});
    });
  });
  describe('composability', function() {
    it('can be composed', function() {
      var composedLens = R.compose(R.lensPath(['a']), R.lensPath(['b']));
      eq(R.view(composedLens, testObj), 2);
    });
  });
  describe('well behaved lens', function() {
    it('set s (get s) === s', function() {
      eq(R.set(R.lensPath(['d']), R.view(R.lensPath(['d']), testObj), testObj), testObj);
      eq(R.set(R.lensPath(['a', 'b']), R.view(R.lensPath(['a', 'b']), testObj), testObj), testObj);
    });
    it('get (set s v) === v', function() {
      eq(R.view(R.lensPath(['d']), R.set(R.lensPath(['d']), 0, testObj)), 0);
      eq(R.view(R.lensPath(['a', 'b']), R.set(R.lensPath(['a', 'b']), 0, testObj)), 0);
    });
    it('get (set(set s v1) v2) === v2', function() {
      var p = ['d'];
      var q = ['a', 'b'];
      eq(R.view(R.lensPath(p), R.set(R.lensPath(p), 11, R.set(R.lensPath(p), 10, testObj))), 11);
      eq(R.view(R.lensPath(q), R.set(R.lensPath(q), 11, R.set(R.lensPath(q), 10, testObj))), 11);
    });
  });
});
