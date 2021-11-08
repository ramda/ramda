var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('max', function() {

  it('returns the larger of its two arguments', function() {
    eq(R.max(-7, 7), 7);
    eq(R.max(7, -7), 7);
  });

  it('works for any orderable type', function() {
    var d1 = new Date('2001-01-01');
    var d2 = new Date('2002-02-02');

    eq(R.max(d1, d2), d2);
    eq(R.max(d2, d1), d2);
    eq(R.max('a', 'b'), 'b');
    eq(R.max('b', 'a'), 'b');
  });

  it('returns the second argument if both arguments are equal', function() {
    eq(R.max(7, 7), 7);
    eq(R.max(undefined, undefined), undefined);
  });

  it('throws a typeError if the arguments cannot be compared', function() {
    assert.throws(
      function() { R.max(1, 'a'); },
      function(err) {
        return err.constructor === TypeError &&
          err.message === 'cannot compare 1 with "a"';
      }
    );
  });
});
