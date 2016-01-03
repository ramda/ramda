var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('subtract', function() {
  it('subtracts two numbers', function() {
    eq(R.subtract(22, 7), 15);
  });

  it('type checks its arguments', function() {
    assert.throws(
      function() { R.subtract('1', '2'); },
      function(err) {
        return err.constructor === TypeError &&
               err.message === '‘subtract’ expected a value of type Number ' +
                               'as its first argument; received "1"';
      }
    );
    assert.throws(
      function() { R.subtract(1, '2'); },
      function(err) {
        return err.constructor === TypeError &&
               err.message === '‘subtract’ expected a value of type Number ' +
                               'as its second argument; received "2"';
      }
    );
  });

  it('is curried', function() {
    var ninesCompl = R.subtract(9);
    eq(ninesCompl(6), 3);
  });

  it('behaves right curried when passed `R.__` for its first argument', function() {
    var minus5 = R.subtract(R.__, 5);
    eq(minus5(17), 12);
  });

});
