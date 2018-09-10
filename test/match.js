var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('match', function() {
  var re = /[A-Z]\d\d\-[a-zA-Z]+/;
  var matching = 'B17-afn';
  var notMatching = 'B1-afn';

  it('determines whether a string matches a regex', function() {
    eq(R.match(re, matching).length, 1);
    eq(R.match(re, notMatching), []);
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
