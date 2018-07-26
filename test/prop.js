var R = require('../source');
var eq = require('./shared/eq');


describe('prop', function() {
  var fred = {name: 'Fred', age: 23};

  it('returns a function that fetches the appropriate property', function() {
    var nm = R.prop('name');
    eq(typeof nm, 'function');
    eq(nm(fred), 'Fred');
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
