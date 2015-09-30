var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('invoker', function() {

  var concat2 = R.invoker(2, 'concat');

  it('returns a function with correct arity', function() {
    eq(concat2.length, 3);
  });

  it('calls the method on the object', function() {
    eq(concat2(3, 4, [1, 2]), [1, 2, 3, 4]);
  });

  it('throws a descriptive TypeError if method does not exist', function() {
    assert.throws(
      function() { R.invoker(0, 'foo')(null); },
      function(err) {
        return err.constructor === TypeError &&
               err.message === 'null does not have a method named "foo"';
      }
    );
    assert.throws(
      function() { R.invoker(0, 'foo')([1, 2, 3]); },
      function(err) {
        return err.constructor === TypeError &&
               err.message === '[1, 2, 3] does not have a method named "foo"';
      }
    );
    assert.throws(
      function() { R.invoker(0, 'length')([1, 2, 3]); },
      function(err) {
        return err.constructor === TypeError &&
               err.message === '[1, 2, 3] does not have a method named "length"';
      }
    );
  });

  it('curries the method call', function() {
    eq(concat2(3)(4)([1, 2]), [1, 2, 3, 4]);
    eq(concat2(3, 4)([1, 2]), [1, 2, 3, 4]);
    eq(concat2(3)(4, [1, 2]), [1, 2, 3, 4]);
  });

});
