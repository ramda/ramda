var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var {Just} = require('./shared/Maybe.js');


describe('pathEq', function() {

  var obj = {
    a: 1,
    b: [{
      ba: 2
    }, {
      ba: 3
    }]
  };

  it('returns true if the path matches the value', function() {
    eq(R.pathEq(1, ['a'], obj), true);
    eq(R.pathEq(3, ['b', 1, 'ba'], obj), true);
  });

  it('returns false for non matches', function() {
    eq(R.pathEq('1', ['a'], obj), false);
    eq(R.pathEq(3, ['b', 0, 'ba'], obj), false);
  });

  it('returns false for non existing values', function() {
    eq(R.pathEq('foo', ['c'], obj), false);
    eq(R.pathEq('foo', ['c', 'd'], obj), false);
  });

  it('accepts empty path', function() {
    eq(R.pathEq(42, [], {a: 1, b: 2}), false);
    eq(R.pathEq(obj, [], obj), true);
  });

  it('has R.equals semantics', function() {
    eq(R.pathEq(0, ['value'], {value: -0}), false);
    eq(R.pathEq(-0, ['value'], {value: 0}), false);
    eq(R.pathEq(NaN, ['value'], {value: NaN}), true);
    eq(R.pathEq(new Just([42]), ['value'], {value: new Just([42])}), true);
  });

});
