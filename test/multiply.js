var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('multiply', function() {
  it('adds together two numbers', function() {
    eq(R.multiply(6, 7), 42);
  });

  it('type checks its arguments', function() {
    assert.throws(
      function() { R.multiply('1', '2'); },
      function(err) {
        return err.constructor === TypeError &&
               err.message === '‘multiply’ expected a value of type Number ' +
                               'as its first argument; received "1"';
      }
    );
    assert.throws(
      function() { R.multiply(1, '2'); },
      function(err) {
        return err.constructor === TypeError &&
               err.message === '‘multiply’ expected a value of type Number ' +
                               'as its second argument; received "2"';
      }
    );
  });

  it('is curried', function() {
    var dbl = R.multiply(2);
    eq(dbl(15), 30);
  });

});
