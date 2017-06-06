var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('divide', function() {
  it('divides two numbers', function() {
    eq(R.divide(28, 7), 4);
  });

  it('type checks its arguments', function() {
    assert.throws(
      function() { R.divide('1', '2'); },
      function(err) {
        return err.constructor === TypeError &&
               err.message === '‘divide’ expected a value of type Number ' +
                               'as its first argument; received "1"';
      }
    );
    assert.throws(
      function() { R.divide(1, '2'); },
      function(err) {
        return err.constructor === TypeError &&
               err.message === '‘divide’ expected a value of type Number ' +
                               'as its second argument; received "2"';
      }
    );
  });

  it('is curried', function() {
    var into28 = R.divide(28);
    eq(into28(7), 4);
  });

  it('behaves right curried when passed `R.__` for its first argument', function() {
    var half = R.divide(R.__, 2);
    eq(half(40), 20);
  });

});
