
var R = require('../source');
var eq = require('./shared/eq');
var Maybe = require('./shared/Maybe');


var add3 = R.curry(function add3(a, b, c) {
  return a + b + c;
});
var add4 = R.curry(function add4(a, b, c, d) {
  return a + b + c + d;
});
var add5 = R.curry(function add5(a, b, c, d, e) {
  return a + b + c + d + e;
});
var madd3 = R.lift(add3);
var madd4 = R.lift(add4);
var madd5 = R.lift(add5);


describe('lift', function() {

  it('returns a function if called with just a function', function() {
    eq(typeof R.lift(R.add), 'function');
  });

  it('produces a cross-product of array values', function() {
    eq(madd3([1, 2, 3], [1, 2], [1, 2, 3]), [3, 4, 5, 4, 5, 6, 4, 5, 6, 5, 6, 7, 5, 6, 7, 6, 7, 8]);
    eq(madd3([1], [2], [3]), [6]);
    eq(madd3([1, 2], [3, 4], [5, 6]), [9, 10, 10, 11, 10, 11, 11, 12]);
  });

  it('can lift functions of any arity', function() {
    eq(madd3([1, 10], [2], [3]), [6, 15]);
    eq(madd4([1, 10], [2], [3], [40]), [46, 55]);
    eq(madd5([1, 10], [2], [3], [40], [500, 1000]), [546, 1046, 555, 1055]);
  });

  it('works with other functors such as "Maybe"', function() {
    var addM = R.lift(R.add);
    eq(addM(Maybe.Just(3), Maybe.Just(5)), Maybe.Just(8));
  });

});
