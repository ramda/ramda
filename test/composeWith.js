var R = require('..');
var eq = require('./shared/eq');


describe('composeWith', function() {

  it('is a variadic function', function() {
    eq(typeof R.composeWith, 'function');
    eq(R.composeWith.length, 0);
  });

  it('performs right-to-left function composition with function applying', function() {
    //  f :: (String, Number?) -> ([Number] -> [Number])
    var f = R.composeWith((f, res) => {
      return f(res);
    })(R.map, R.multiply, parseInt);

    eq(f.length, 2);
    eq(f('10')([1, 2, 3]), [10, 20, 30]);
    eq(f('10', 2)([1, 2, 3]), [2, 4, 6]);
  });

  it('performs right-to-left function while not nil result', function() {
    var isOdd = R.modulo(R.__, 2);
    var composeWhenNotNil = R.composeWith((f, res) => {
      return R.isNil(res) ? null : f(res);
    });

    var f = composeWhenNotNil(R.inc, R.ifElse(isOdd, R.identity, R.always(null)), parseInt);

    eq(f.length, 2);
    eq(f('1'), 2);
    eq(f('2'), null);
  });

});
