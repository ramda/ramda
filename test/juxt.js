var R = require('../source');
var eq = require('./shared/eq');


describe('juxt', function() {
  function hello() { return 'hello'; }
  function bye() { return 'bye'; }

  it('works with no functions and no values', function() {
    eq(R.juxt([])(), []);
  });

  it('works with no functions and some values', function() {
    eq(R.juxt([])(2, 3), []);
  });

  it('works with 1 function and no values', function() {
    eq(R.juxt([hello])(), ['hello']);
  });

  it('works with 1 function and 1 value', function() {
    eq(R.juxt([R.add(3)])(2), [5]);
  });

  it('works with 1 function and some values', function() {
    eq(R.juxt([R.multiply])(2, 3), [6]);
  });

  it('works with some functions and no values', function() {
    eq(R.juxt([hello, bye])(), ['hello', 'bye']);
  });

  it('works with some functions and 1 value', function() {
    eq(R.juxt([R.multiply(2), R.add(3)])(2), [4, 5]);
  });

  it('works with some functions and some values', function() {
    eq(R.juxt([R.add, R.multiply])(2, 3), [5, 6]);
  });

  it('retains the highest arity', function() {
    var f = R.juxt([R.nAry(1, R.T), R.nAry(3, R.T), R.nAry(2, R.T)]);
    eq(f.length, 3);
  });

  it('returns a curried function', function() {
    eq(R.juxt([R.multiply, R.add])(2)(3), [6, 5]);
  });

});
