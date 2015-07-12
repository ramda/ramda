var assert = require('assert');

var Q = require('q');

var R = require('..');


describe('composeP', function() {

  it('is a variadic function', function() {
    assert.strictEqual(typeof R.composeP, 'function');
    assert.strictEqual(R.composeP.length, 0);
  });

  it('performs right-to-left composition of Promise-returning functions', function() {
    var f = function(a) { return Q.Promise(function(res) { res([a]); }); };
    var g = function(a, b) { return Q.Promise(function(res) { res([a, b]); }); };
    var h = function(a, b, c) { return Q.Promise(function(res) { res([a, b, c]); }); };

    assert.strictEqual(R.composeP(f, f, f).length, 1);
    assert.strictEqual(R.composeP(f, f, g).length, 2);
    assert.strictEqual(R.composeP(f, f, h).length, 3);

    R.composeP(f, f, f)(1).then(function(result) {
      assert.deepEqual(result, [[[1]]]);
    });

    R.composeP(f, f, g)(1)(2).then(function(result) {
      assert.deepEqual(result, [[[1, 2]]]);
    });

    R.composeP(f, f, h)(1)(2)(3).then(function(result) {
      assert.deepEqual(result, [[[1, 2, 3]]]);
    });
  });

  it('throws if given no arguments', function() {
    assert.throws(
      function() { R.composeP(); },
      function(err) {
        return err.constructor === Error &&
               err.message === 'composeP requires at least one argument';
      }
    );
  });

});
