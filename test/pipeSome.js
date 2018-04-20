var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('pipeSome', function() {

  it('is a variadic function', function() {
    eq(typeof R.pipeSome, 'function');
    eq(R.pipeSome.length, 0);
  });

  it('performs left-to-right function composition', function() {
    //  f :: (String, Number?) -> ([Number] -> [Number])
    var f = R.pipeSome(parseInt, R.multiply, R.map);

    eq(f.length, 2);
    eq(f('10')([1, 2, 3]), [10, 20, 30]);
    eq(f('10', 2)([1, 2, 3]), [2, 4, 6]);
  });

  it('performs left-to-right function composition until null returned', function() {
    var isOdd = R.modulo(R.__, 2);
    //  f :: (String, Number?) -> Number?
    var f = R.pipeSome(parseInt, R.ifElse(isOdd, R.identity, R.always(null)), R.inc);

    eq(f.length, 2);
    eq(f('1'), 2);
    eq(f('2'), null);
  });

  it('throws if given no arguments', function() {
    assert.throws(
      function() { R.pipeSome(); },
      function(err) {
        return err.constructor === Error &&
               err.message === 'pipeSome requires at least one argument';
      }
    );
  });

});
