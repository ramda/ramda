var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var assert = require('assert');


describe('once', function() {
  it('returns a function that calls the supplied function only the first time called', function() {
    var ctr = 0;
    var fn = R.once(function() {ctr += 1;});
    fn();
    eq(ctr, 1);
    fn();
    eq(ctr, 1);
    fn();
    eq(ctr, 1);
  });

  it('passes along arguments supplied', function() {
    var fn = R.once(function(a, b) {return a + b;});
    var result = fn(5, 10);
    eq(result, 15);
  });

  it('retains and returns the first value calculated, even if different arguments are passed later', function() {
    var ctr = 0;
    var fn = R.once(function(a, b) {ctr += 1; return a + b;});
    var result = fn(5, 10);
    eq(result, 15);
    eq(ctr, 1);
    result = fn(20, 30);
    eq(result, 15);
    eq(ctr, 1);
  });

  it('retains arity', function() {
    var f = R.once(function(a, b) { return a + b; });
    eq(f.length, 2);
  });

  it('rethrows the first error on every call without invoking the function again', function() {
    var calls = 0;
    var error = new Error('failed');
    var fn = R.once(function() { calls += 1; throw error; });

    assert.throws(fn, function(actual) { return actual === error; });
    assert.throws(fn, function(actual) { return actual === error; });
    eq(calls, 1);
  });

  it('rethrows a non-Error value from the first call', function() {
    var calls = 0;
    var fn = R.once(function() { calls += 1; throw null; });

    for (var i = 0; i < 2; i += 1) {
      try {
        fn();
        assert.fail('expected the first thrown value');
      } catch (error) {
        eq(error, null);
      }
    }
    eq(calls, 1);
  });

});
