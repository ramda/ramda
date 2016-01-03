var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('add', function() {
  it('adds together two numbers', function() {
    eq(R.add(3, 7), 10);
  });

  it('type checks its arguments', function() {
    assert.throws(
      function() { R.add('1', '2'); },
      function(err) {
        return err.constructor === TypeError &&
               err.message === '‘add’ expected a value of type Number ' +
                               'as its first argument; received "1"';
      }
    );
    assert.throws(
      function() { R.add(1, '2'); },
      function(err) {
        return err.constructor === TypeError &&
               err.message === '‘add’ expected a value of type Number ' +
                               'as its second argument; received "2"';
      }
    );
  });

  it('is curried', function() {
    var incr = R.add(1);
    eq(incr(42), 43);
  });

});
