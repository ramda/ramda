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

  it('handles number as property', function() {
    var deities = ['Cthulhu', 'Dagon', 'Yog-Sothoth'];
    eq(R.propOr('Unknown', 0, deities), 'Cthulhu');
    eq(R.propOr('Unknown', 1, deities), 'Dagon');
    eq(R.propOr('Unknown', 2, deities), 'Yog-Sothoth');
    eq(R.propOr('Unknown', -1, deities), 'Yog-Sothoth');
    eq(R.propOr('Unknown', 3, deities), 'Unknown');
  });

  it('shows the same behaviour as pathOr for a nonexistent property', function() {
    var propOrResult = R.propOr('Unknown', 'incorrect', fred);
    var pathOrResult = R.pathOr('Unknown', ['incorrect'], fred);
    eq(propOrResult, pathOrResult);
  });

  it('shows the same behaviour as pathOr for an undefined property', function() {
    var propOrResult = R.propOr('Unknown', undefined, fred);
    var pathOrResult = R.pathOr('Unknown', [undefined], fred);
    eq(propOrResult, pathOrResult);
  });

  it('shows the same behaviour as pathOr for a null property', function() {
    var propOrResult = R.propOr('Unknown', null, fred);
    var pathOrResult = R.pathOr('Unknown', [null], fred);
    eq(propOrResult, pathOrResult);
  });

  it('shows the same behaviour as pathOr for a valid property and object', function() {
    var propOrResult = R.propOr('Unknown', 'age', fred);
    var pathOrResult = R.pathOr('Unknown', ['age'], fred);
    eq(propOrResult, pathOrResult);
  });

  it('shows the same behaviour as pathOr for a null object', function() {
    var propOrResult = R.propOr('Unknown', 'age', null);
    var pathOrResult = R.pathOr('Unknown', ['age'], null);
    eq(propOrResult, pathOrResult);
  });

  it('shows the same behaviour as pathOr for an undefined object', function() {
    var propOrResult = R.propOr('Unknown', 'age', undefined);
    var pathOrResult = R.pathOr('Unknown', ['age'], undefined);
    eq(propOrResult, pathOrResult);
  });
});
