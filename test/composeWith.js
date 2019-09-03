var R = require('../source');
var eq = require('./shared/eq');


describe('composeWith', function() {

  it('performs right-to-left function composition with function applying', function() {
    //  f :: (String, Number?) -> ([Number] -> [Number])
    var f = R.composeWith(function(f, res) {
      return f(res);
    })([R.map, R.multiply, parseInt]);

    eq(f.length, 2);
    eq(f('10')([1, 2, 3]), [10, 20, 30]);
    eq(f('10', 2)([1, 2, 3]), [2, 4, 6]);
  });

  it('performs right-to-left function while not nil result', function() {
    var isOdd = R.flip(R.modulo)(2);
    var composeWhenNotNil = R.composeWith(function(f, res) {
      return R.isNil(res) ? null : f(res);
    });

    var f = composeWhenNotNil([R.inc, R.ifElse(isOdd, R.identity, R.always(null)), parseInt]);

    eq(f.length, 2);
    eq(f('1'), 2);
    eq(f('2'), null);
  });

  it('performs right-to-left function using promise chaining', function() {
    var then = function(f, p) { return p.then(f); };
    var composeP = R.composeWith(then);
    var toListPromise = function(a) { return new Promise(function(res) { res([a]); }); };
    var doubleListPromise = function(a) { return new Promise(function(res) { res(R.concat(a, a)); }); };
    var f = composeP([
      doubleListPromise,
      toListPromise
    ]);

    return f(1)
      .then(function(res) {
        eq(res, [1, 1]);
      });
  });

});
