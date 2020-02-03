var R = require('../source');
var eq = require('./shared/eq');


describe('prop', function() {
  var fred = {name: 'Fred', age: 23};

  it('returns a function that fetches the appropriate property', function() {
    var nm = R.prop('name');
    eq(typeof nm, 'function');
    eq(nm(fred), 'Fred');
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
});
