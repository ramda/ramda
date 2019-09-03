var R = require('../source');
var eq = require('./shared/eq');


var testObj = {
  a: 1,
  b: 2,
  c: 3
};

describe('lensProp', function() {
  describe('view', function() {
    it('focuses object the specified object property', function() {
      eq(R.view(R.lensProp('a'), testObj), 1);
    });
    it('returns undefined if the specified property does not exist', function() {
      eq(R.view(R.lensProp('X'), testObj), undefined);
    });
  });
  describe('set', function() {
    it('sets the value of the object property specified', function() {
      eq(R.set(R.lensProp('a'), 0, testObj), {a:0, b:2, c:3});
    });
    it('adds the property to the object if it doesn\'t exist', function() {
      eq(R.set(R.lensProp('d'), 4, testObj), {a:1, b:2, c:3, d:4});
    });
  });
  describe('over', function() {
    it('applies function to the value of the specified object property', function() {
      eq(R.over(R.lensProp('a'), R.inc, testObj), {a:2, b:2, c:3});
    });
    it('applies function to undefined and adds the property if it doesn\'t exist', function() {
      eq(R.over(R.lensProp('X'), R.identity, testObj), {a:1, b:2, c:3, X:undefined});
    });
  });
  describe('composability', function() {
    it('can be composed', function() {
      var nestedObj = {a: {b: 1}, c:2};
      var composedLens = R.compose(R.lensProp('a'), R.lensProp('b'));

      eq(R.view(composedLens, nestedObj), 1);
    });
  });
  describe('well behaved lens', function() {
    it('set s (get s) === s', function() {
      eq(R.set(R.lensProp('a'), R.view(R.lensProp('a'), testObj), testObj), testObj);
    });
    it('get (set s v) === v', function() {
      eq(R.view(R.lensProp('a'), R.set(R.lensProp('a'), 0, testObj)), 0);
    });
    it('get (set(set s v1) v2) === v2', function() {
      eq(
        R.view(R.lensProp('a'), R.set(R.lensProp('a'), 11, R.set(R.lensProp('a'), 10, testObj))),
        11
      );
    });
  });
});
