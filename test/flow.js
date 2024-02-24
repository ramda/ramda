var R = require('../source/index.js');
var eq = require('./shared/eq.js');

describe('flow', function() {

  it('is a binary function', function() {
    eq(typeof R.flow, 'function');
    eq(R.flow.length, 2);
  });

  it('performs left-to-right function composition', function() {
    //  f :: [Number] -> [Number]
    var f2 = R.flow(4, [Math.sqrt, R.multiply, R.map]);
    var f3 = R.flow(9, [Math.sqrt, R.multiply, R.map]);

    eq(f2([1, 2, 3]), [2, 4, 6]);
    eq(f3([1, 2, 3]), [3, 6, 9]);

    eq(R.flow(9, [Math.sqrt, R.negate, R.inc]), -2);
  });
});
