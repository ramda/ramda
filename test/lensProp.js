var R = require('..');
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
    it('returns object unchanged if specified property does not exist', function() {
      eq(R.over(R.lensProp('X'), R.always(0), testObj), {a:1, b:2, c:3, X:0});
    });
  });
});
