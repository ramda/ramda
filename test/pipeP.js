var assert = require('assert');

var Q = require('q');

var R = require('..');


describe('pipeP', function() {

  it('is a variadic function', function() {
    assert.strictEqual(typeof R.pipeP, 'function');
    assert.strictEqual(R.pipeP.length, 0);
  });

  it('performs left-to-right composition of Promise-returning functions', function(done) {
    var f = function(a) { return Q.Promise(function(res) { res([a]); }); };
    var g = function(a, b) { return Q.Promise(function(res) { res([a, b]); }); };

    assert.strictEqual(R.pipeP(f).length, 1);
    assert.strictEqual(R.pipeP(g).length, 2);
    assert.strictEqual(R.pipeP(f, f).length, 1);
    assert.strictEqual(R.pipeP(f, g).length, 1);
    assert.strictEqual(R.pipeP(g, f).length, 2);
    assert.strictEqual(R.pipeP(g, g).length, 2);

    R.pipeP(f, g)(1).then(function(result) {
      assert.deepEqual(result, [[1], undefined]);

      R.pipeP(g, f)(1).then(function(result) {
        assert.deepEqual(result, [[1, undefined]]);

        R.pipeP(f, g)(1, 2).then(function(result) {
          assert.deepEqual(result, [[1], undefined]);

          R.pipeP(g, f)(1, 2).then(function(result) {
            assert.deepEqual(result, [[1, 2]]);

            done();
          })['catch'](done);
        })['catch'](done);
      })['catch'](done);
    })['catch'](done);
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
