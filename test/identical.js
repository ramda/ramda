var R = require('../source');
var eq = require('./shared/eq');
var fc = require('fast-check');


describe('identical', function() {
  var a = [];
  var b = a;
  it('has Object.is semantics', function() {
    eq(R.identical(100, 100), true);
    eq(R.identical(100, '100'), false);
    eq(R.identical('string', 'string'), true);
    eq(R.identical([], []), false);
    eq(R.identical(a, b), true);
    eq(R.identical(undefined, undefined), true);
    eq(R.identical(null, undefined), false);

    eq(R.identical(-0, 0), false);
    eq(R.identical(0, -0), false);
    eq(R.identical(NaN, NaN), true);

    eq(R.identical(NaN, 42), false);
    eq(R.identical(42, NaN), false);

    eq(R.identical(0, new Number(0)), false);
    eq(R.identical(new Number(0), 0), false);
    eq(R.identical(new Number(0), new Number(0)), false);
  });

  it('perfect clones should be considered identical', function() {
    fc.assert(fc.property(fc.dedup(fc.anything({ maxDepth: 0 }), 2), function(values) {
      eq(R.identical(values[0], values[1]), true);
    }));
  });

});
