var assert = require('assert');

var Q = require('q');

var R = require('..');


describe('composeP', function() {

  it('is a variadic function', function() {
    assert.strictEqual(typeof R.composeP, 'function');
    assert.strictEqual(R.composeP.length, 0);
  });

  it('performs right-to-left composition of Promise-returning functions', function(done) {
    var f = function(a) { return Q.Promise(function(res) { res([a]); }); };
    var g = function(a, b) { return Q.Promise(function(res) { res([a, b]); }); };

    assert.strictEqual(R.composeP(f).length, 1);
    assert.strictEqual(R.composeP(g).length, 2);
    assert.strictEqual(R.composeP(f, f).length, 1);
    assert.strictEqual(R.composeP(f, g).length, 2);
    assert.strictEqual(R.composeP(g, f).length, 1);
    assert.strictEqual(R.composeP(g, g).length, 2);

    R.composeP(f, g)(1).then(function(result) {
      assert.deepEqual(result, [[1, undefined]]);

      R.composeP(g, f)(1).then(function(result) {
        assert.deepEqual(result, [[1], undefined]);

        R.composeP(f, g)(1, 2).then(function(result) {
          assert.deepEqual(result, [[1, 2]]);

          R.composeP(g, f)(1, 2).then(function(result) {
            assert.deepEqual(result, [[1], undefined]);

            done();
          })['catch'](done);
        })['catch'](done);
      })['catch'](done);
    })['catch'](done);
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
