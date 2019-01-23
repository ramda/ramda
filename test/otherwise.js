var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('otherwise', function() {
  it('catches failed promises', function(done) {
    R.otherwise(
      function(n) {
        eq(n, 1);
        done();
      },
      Promise.reject(1)
    );
  });

  it('does nothing to successfully resolved promises', function(done) {
    var asyncAddTwo = R.pipe(Promise.resolve.bind(Promise), R.andThen(R.inc), R.otherwise(R.multiply(0)), R.andThen(R.inc));

    R.andThen(function(result) {
      eq(result, 3);
      done();
    })(asyncAddTwo(1));
  });

  it('throws a typeError if the then method does not exist', function() {
    assert.throws(
      function() { R.otherwise(R.inc, 1); },
      function(err) {
        return err.constructor === TypeError &&
               err.message === '`otherwise` expected a Promise, received 1';
      }
    );
  });
});
