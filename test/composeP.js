var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('composeP', function() {

  it('is a variadic function', function() {
    eq(typeof R.composeP, 'function');
    eq(R.composeP.length, 0);
  });

  it('performs right-to-left composition of Promise-returning functions', function(done) {
    var f = function(a) { return new Promise(function(res) { res([a]); }); };
    var g = function(a, b) { return new Promise(function(res) { res([a, b]); }); };

    eq(R.composeP(f).length, 1);
    eq(R.composeP(g).length, 2);
    eq(R.composeP(f, f).length, 1);
    eq(R.composeP(f, g).length, 2);
    eq(R.composeP(g, f).length, 1);
    eq(R.composeP(g, g).length, 2);

    R.composeP(f, g)(1).then(function(result) {
      eq(result, [[1, undefined]]);

      R.composeP(g, f)(1).then(function(result) {
        eq(result, [[1], undefined]);

        R.composeP(f, g)(1, 2).then(function(result) {
          eq(result, [[1, 2]]);

          R.composeP(g, f)(1, 2).then(function(result) {
            eq(result, [[1], undefined]);

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
