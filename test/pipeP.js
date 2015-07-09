var assert = require('assert');

var Q = require('q');

var R = require('..');


describe('pipeP', function() {

  it('is a variadic function', function() {
    assert.strictEqual(typeof R.pipeP, 'function');
    assert.strictEqual(R.pipeP.length, 0);
  });

  it('performs left-to-right composition of Promise-returning functions', function() {
    var f = function(a) { return Q.Promise(function(res) { res([a]); }); };
    var g = function(a, b) { return Q.Promise(function(res) { res([a, b]); }); };
    var h = function(a, b, c) { return Q.Promise(function(res) { res([a, b, c]); }); };

    assert.strictEqual(R.pipeP(f, f, f).length, 1);
    assert.strictEqual(R.pipeP(g, f, f).length, 2);
    assert.strictEqual(R.pipeP(h, f, f).length, 3);

    R.pipeP(f, f, f)(1).then(function(result) {
      assert.deepEqual(result, [[[1]]]);
    });

    R.pipeP(g, f, f)(1)(2).then(function(result) {
      assert.deepEqual(result, [[[1, 2]]]);
    });

    R.pipeP(h, f, f)(1)(2)(3).then(function(result) {
      assert.deepEqual(result, [[[1, 2, 3]]]);
    });
  });

  it('throws if given no arguments', function() {
    assert.throws(
      function() { R.pipeP(); },
      function(err) {
        return err.constructor === Error &&
               err.message === 'pipeP requires at least one argument';
      }
    );
  });

});
