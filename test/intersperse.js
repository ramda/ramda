var assert = require('assert');

var R = require('..');


describe('intersperse', function() {
  it('interposes a separator between list items', function() {
    assert.deepEqual(R.intersperse('n', ['ba', 'a', 'a']), ['ba', 'n', 'a', 'n', 'a']);
    assert.deepEqual(R.intersperse('bar', ['foo']), ['foo']);
    assert.deepEqual(R.intersperse('bar', []), []);
  });

  it('dispatches', function() {
    var obj = {intersperse: function(x) { return 'override ' + x; }};
    assert.strictEqual(R.intersperse('x', obj), 'override x');
  });

  it('is curried', function() {
    assert.deepEqual(R.intersperse('n')(['ba', 'a', 'a']), ['ba', 'n', 'a', 'n', 'a']);
  });
});
