var R = require('../source');
var eq = require('./shared/eq');


describe('pipeWith', function() {

  it('performs left-to-right function composition with function applying', function() {
    //  f :: (String, Number?) -> ([Number] -> [Number])
    var f = R.pipeWith(function(f, res) {
      return f(res);
    })([parseInt, R.multiply, R.map]);

    eq(f.length, 2);
    eq(f('10')([1, 2, 3]), [10, 20, 30]);
    eq(f('10', 2)([1, 2, 3]), [2, 4, 6]);
  });

  it('performs left-to-right function while not nil result', function() {
    var isOdd = R.flip(R.modulo)(2);
    var pipeWhenNotNil = R.pipeWith(function(f, res) {
      return R.isNil(res) ? null : f(res);
    });

    var f = pipeWhenNotNil([parseInt, R.ifElse(isOdd, R.identity, R.always(null)), R.inc]);

    eq(f.length, 2);
    eq(f('1'), 2);
    eq(f('2'), null);
  });

  it('performs left-to-right function using promise chaining', function() {
    var then = function(f, p) { return p.then(f); };
    var pipeP = R.pipeWith(then);
    var toListPromise = function(a) { return new Promise(function(res) { res([a]); }); };
    var doubleListPromise = function(a) { return new Promise(function(res) { res(R.concat(a, a)); }); };
    var f = pipeP([
      toListPromise,
      doubleListPromise
    ]);

    return f(1)
      .then(function(res) {
        eq(res, [1, 1]);
      });
  });

});
