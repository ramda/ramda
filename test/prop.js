var R = require('../source');
var eq = require('./shared/eq');
var fc = require('fast-check');

describe('prop', function() {
  var fred = {name: 'Fred', age: 23};

  it('returns a function that fetches the appropriate property', function() {
    var nm = R.prop('name');
    eq(typeof nm, 'function');
    eq(nm(fred), 'Fred');
  });

  it('handles number as property', function() {
    var deities = ['Cthulhu', 'Dagon', 'Yog-Sothoth'];
    eq(R.prop(0, deities), 'Cthulhu');
    eq(R.prop(1, deities), 'Dagon');
    eq(R.prop(2, deities), 'Yog-Sothoth');
    eq(R.prop(-1, deities), 'Yog-Sothoth');
  });

  it('shows the same behaviour as path for a nonexistent property', function() {
    var propResult = R.prop('incorrect', fred);
    var pathResult = R.path(['incorrect'], fred);
    eq(propResult, pathResult);
  });

  it('shows the same behaviour as path for an undefined property', function() {
    var propResult = R.prop(undefined, fred);
    var pathResult = R.path([undefined], fred);
    eq(propResult, pathResult);
  });

  it('shows the same behaviour as path for a null property', function() {
    var propResult = R.prop(null, fred);
    var pathResult = R.path([null], fred);
    eq(propResult, pathResult);
  });

  it('shows the same behaviour as path for a valid property and object', function() {
    var propResult = R.prop('age', fred);
    var pathResult = R.path(['age'], fred);
    eq(propResult, pathResult);
  });

  it('shows the same behaviour as path for a null object', function() {
    var propResult = R.prop('age', null);
    var pathResult = R.path(['age'], null);
    eq(propResult, pathResult);
  });

  it('shows the same behaviour as path for an undefined object', function() {
    var propResult, propException, pathResult, pathException;
    try {
      propResult = R.prop('name', undefined);
    } catch (e) {
      propException = e;
    }

    try {
      pathResult = R.path(['name'], undefined);
    } catch (e) {
      pathException = e;
    }

    eq(propResult, pathResult);
    eq(propException, pathException);
  });

  it('returns that value associated to a property given valid one', function() {
    fc.assert(
      fc.property(fc.string(), fc.anything(), function(p, value) {
        const o = { [p]: value };
        eq(R.prop(p, o), value);
      })
    );
  });

  it('shows the same behaviour as path on any object', function() {
    fc.assert(
      fc.property(fc.string(), fc.object(), function(p, o) {
        eq(R.prop(p, o), R.path([p], o));
      })
    );
  });

  it('shows the same behaviour as path on any value', function() {
    fc.assert(
      fc.property(fc.string(), fc.anything(), function(p, o) {
        var propResult, propException, pathResult, pathException;
        try {
          propResult = R.prop(p, o);
        } catch (e) {
          propException = e;
        }

        try {
          pathResult = R.path([p], o);
        } catch (e) {
          pathException = e;
        }

        eq(propResult, pathResult);
        eq(propException, pathException);
      })
    );
  });
});
