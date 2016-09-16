var assert = require('assert');
var Q = require('q');

var R = require('..');
var eq = require('./shared/eq');


describe('fail', function() {
  it('catches failed promises', function(done) {
    var p = Q.reject(1);

    var f = function(n) {
      eq(n, 1);
      done();
    };

    R.fail(f, p);
  });

  it('does nothing to successfully resolved promises', function(done) {
    var asyncAddTwo = R.pipe(Q, R.then(R.inc), R.fail(R.inc), R.then(R.inc));

    R.then(function(result) {
      eq(result, 3);
      done();
    })(asyncAddTwo(1));
  });

  it('throws a typeError if the then method does not exist', function() {
    assert.throws(
      function() { R.fail(R.inc, 1); },
      function(err) {
        return err.constructor === TypeError &&
               err.message === '1 does not have a method named "then"';
      }
    )

  });
});
