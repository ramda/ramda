var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('composeSome', function() {

  it('is a variadic function', function() {
    eq(typeof R.composeSome, 'function');
    eq(R.composeSome.length, 0);
  });

  it('performs right-to-left function composition', function() {
    //  f :: (String, Number?) -> ([Number] -> [Number])
    var f = R.composeSome(R.map, R.multiply, parseInt);

    eq(f.length, 2);
    eq(f('10')([1, 2, 3]), [10, 20, 30]);
    eq(f('10', 2)([1, 2, 3]), [2, 4, 6]);
  });

  it('performs left-to-right function composition until null returned', function() {
    var isOdd = R.modulo(R.__, 2);
    //  f :: (String, Number?) -> Number?
    var f = R.composeSome(R.inc, R.ifElse(isOdd, R.identity, R.always(null)), parseInt);

    eq(f.length, 2);
    eq(f('1'), 2);
    eq(f('2'), null);
  });

  it('throws if given no arguments', function() {
    assert.throws(
      function() { R.composeSome(); },
      function(err) {
        return err.constructor === Error &&
               err.message === 'composeSome requires at least one argument';
      }
    );
  });
});
