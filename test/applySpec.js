var R = require('..');
var eq = require('./shared/eq');


describe('applySpec', function() {

  it('works with empty spec', function() {
    eq(R.applySpec({})(), {});
  });

  it('works with unary functions', function() {
    eq(R.applySpec({ v: R.inc, u: R.dec })(1), { v: 2, u: 0 });
  });

  it('works with binary functions', function() {
    eq(R.applySpec({ sum: R.add })(1, 2), { sum: 3 });
  });

  it('works with nested specs', function() {
    eq(R.applySpec({ unnested: R.always(0), nested: { sum: R.add } })(1, 2),
       { unnested: 0, nested: { sum: 3 } });
  });

  it('retains the highest arity', function() {
    var f = R.applySpec({ f1: R.nAry(2, R.T), f2: R.nAry(5, R.T) });
    eq(f.length, 5);
  });

  it('returns a curried function', function() {
    eq(R.applySpec({ sum: R.add })(1)(2), { sum: 3 });
  });

  it('works with arrays', function () {
    eq(R.applySpec([ R.add(-1), R.identity, R.add(1) ])(3), [2, 3, 4]);  
  });
  
  it('works with arrays of objects', function () {
    eq(
      R.applySpec([
        { type: R.always('add'), value: R.add },
        { type: R.always('multiply'), value: R.multiply }
      ])(2, 4),
      [ { type: 'add', value: 6 }, { type: 'multiply', value: 8 } ]
    );
  });
  
  it('works with objects containing arrays', function () {
    eq(
      R.applySpec({
        sums: [ R.add(1), R.add(2), R.add(3) ],
        products: [ R.multiply(2), R.multiply(3), R.multiply(4) ]
      })(3),
      { sums: [4, 5, 6], products: [6, 9, 12] }
    );
  });
});
