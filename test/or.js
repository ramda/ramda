var assert = require('assert');

var R = require('..');


describe('or', function() {
  it('compares two values with js &&', function() {
    var someAr = [];
    assert.strictEqual(R.or(1, 0), 1);
    assert.strictEqual(R.or(0, 1), 1);
    assert.strictEqual(R.or(someAr, false), someAr);
    assert.strictEqual(R.or('', 0), 0);
  });

  it('dispatches to `or` method', function() {
    function Nothing() {}
    Nothing.prototype.or = R.identity;

    function Just(x) { this.value = x; }
    Just.prototype.or = function() { return this; };

    var n1 = new Nothing();
    var n2 = new Nothing();
    var j1 = new Just(1);
    var j2 = new Just(2);

    assert.strictEqual(R.or(n1, n2), n2);
    assert.strictEqual(R.or(n2, n1), n1);
    assert.strictEqual(R.or(n1, j2), j2);
    assert.strictEqual(R.or(j2, n1), j2);
    assert.strictEqual(R.or(j1, j2), j1);
    assert.strictEqual(R.or(j2, j1), j2);
  });

  it('is curried', function() {
    assert.strictEqual(R.or('lie')(false), 'lie');
    assert.strictEqual(R.or(false)(true), true);
    assert.strictEqual(R.or('')(0), 0);
  });
});
