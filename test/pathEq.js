var R = require('../source');
var eq = require('./shared/eq');


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
    eq(R.pathEq(['a'], 1, obj), true);
    eq(R.pathEq(['b', 1, 'ba'], 3, obj), true);
  });

  it('returns false for non matches', function() {
    eq(R.pathEq(['a'], '1', obj), false);
    eq(R.pathEq(['b', 0, 'ba'], 3, obj), false);
  });

  it('returns false for non existing values', function() {
    eq(R.pathEq(['c'], 'foo', obj), false);
    eq(R.pathEq(['c', 'd'], 'foo', obj), false);
  });

  it('accepts empty path', function() {
    eq(R.pathEq([], 42, {a: 1, b: 2}), false);
    eq(R.pathEq([], obj, obj), true);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    eq(R.pathEq(['value'], 0, {value: -0}), false);
    eq(R.pathEq(['value'], -0, {value: 0}), false);
    eq(R.pathEq(['value'], NaN, {value: NaN}), true);
    eq(R.pathEq(['value'], new Just([42]), {value: new Just([42])}), true);
  });

});
