var R = require('..');
var eq = require('./shared/eq');


describe('pipeWith', function() {

  it('is a variadic function', function() {
    eq(typeof R.pipeWith, 'function');
    eq(R.pipeWith.length, 0);
  });

  it('performs left-to-right function composition with function applying', function() {
    //  f :: (String, Number?) -> ([Number] -> [Number])
    var f = R.pipeWith((f, res) => {
      return f(res);
    })(parseInt, R.multiply, R.map);

    eq(f.length, 2);
    eq(f('10')([1, 2, 3]), [10, 20, 30]);
    eq(f('10', 2)([1, 2, 3]), [2, 4, 6]);
  });

  it('performs left-to-right function while not nil result', function() {
    var isOdd = R.modulo(R.__, 2);
    var pipeWhenNotNil = R.pipeWith((f, res) => {
      return R.isNil(res) ? null : f(res);
    });

    var f = pipeWhenNotNil(parseInt, R.ifElse(isOdd, R.identity, R.always(null)), R.inc);

    eq(f.length, 2);
    eq(f('1'), 2);
    eq(f('2'), null);
  });

});
