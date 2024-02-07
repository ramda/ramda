var assert = require('assert');

var R = require('../source/index.js');
var eq = require('./shared/eq.js');

describe('flow', function() {

  it('is a variadic function', function() {
    eq(typeof R.flow, 'function');
    eq(R.flow.length, 0);
  });

  it('performs left-to-right function composition', function() {
    //  f10 :: [Number] -> [Number]
    var f2 = R.flow(4, Math.sqrt, R.multiply, R.map);
    var f3 = R.flow(9, Math.sqrt, R.multiply, R.map);

    eq(f2([1, 2, 3]), [2, 4, 6]);
    eq(f3([1, 2, 3]), [3, 6, 9]);
  });

  it('throws if given no arguments', function() {
    assert.throws(
      function() { R.flow(); },
      function(err) {
        return err.constructor === Error &&
               err.message === 'flow requires at least two arguments';
      }
    );
  });

  it('can be applied to one argument', function() {
    eq(R.flow(16, Math.sqrt), 4);
  });
});
