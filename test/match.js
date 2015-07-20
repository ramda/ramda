var assert = require('assert');

var R = require('..');


describe('match', function() {
  var re = /[A-Z]\d\d\-[a-zA-Z]+/;
  var matching = 'B17-afn';
  var notMatching = 'B1-afn';

  it('determines whether a string matches a regex', function() {
    assert.strictEqual(R.match(re, matching).length, 1);
    assert.deepEqual(R.match(re, notMatching), []);
  });

  it('is curried', function() {
    var format = R.match(re);
    assert.strictEqual(format(matching).length, 1);
    assert.deepEqual(format(notMatching), []);
  });

  it('defaults to a different empty array each time', function() {
    var first = R.match(re, notMatching);
    var second = R.match(re, notMatching);
    assert.notStrictEqual(first, second);
  });

  it('throws on null input', function() {
    assert.throws(function shouldThrow() { R.match(re, null); }, TypeError);
  });
});
