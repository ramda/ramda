var R = require('../source');
var eq = require('./shared/eq');

describe('evolveTo', function() {
  it('creates a new object from keys in transformations `object` ' +
    'and result of transformation functions called with source `data`', function() {
    var transf = {
      sum: R.prop('total'),
      values: R.prop('numbers'),
      multi: R.compose(R.reduce(R.multiply, 1), R.prop('numbers'))
    };
    var src = {total: 10, numbers: [1, 4, 2, 3]};
    var exp = {sum: 10, values: [1, 4, 2, 3], multi: 24};
    eq(R.evolveTo(transf, src), exp);
  });
  it('set key value null if corresponding transformation is not func or object', function() {
    var transf = {a: 5, b: 'test', c: null};
    var src = {a: 'test', d: 10};
    var exp = {a: null, b: null, c: null};
    eq(R.evolveTo(transf, src), exp);
  });
  it('can treat array as indexed object', function() {
    var transf = [R.inc, R.multiply(10)];
    var src = 10;
    var exp = {0: 11, 1: 100};
    eq(R.evolveTo(transf, src), exp);
  });
  it('can apply recursive transformations', function() {
    var transf = {a: {a0: R.inc, a1: [R.multiply(5), R.add(15), {b: R.subtract(5)}]}};
    var src = 10;
    var exp = {a: {a0: 11, a1: {0: 50, 1: 25, 2: {b: -5}}}};
    eq(R.evolveTo(transf, src), exp);
  });
});
