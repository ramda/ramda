var R = require('../source');
var eq = require('./shared/eq');


describe('propOr', function() {
  var fred = {name: 'Fred', age: 23};
  var anon = {age: 99};

  var nm = R.propOr('Unknown', 'name');

  it('returns a function that fetches the appropriate property', function() {
    eq(typeof nm, 'function');
    eq(nm(fred), 'Fred');
  });

  it('returns the default value when the property does not exist', function() {
    eq(nm(anon), 'Unknown');
  });

  it('returns the default value when the object is nil', function() {
    eq(nm(null), 'Unknown');
    eq(nm(void 0), 'Unknown');
  });

  it('uses the default when supplied an object with a nil value', function() {
    eq(R.propOr('foo', 'x', {x: null}), 'foo');
    eq(R.propOr('foo', 'x', {x: undefined}), 'foo');
  });

});
