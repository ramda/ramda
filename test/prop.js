var assert = require('assert');

var R = require('..');


describe('prop', function() {
  var fred = {name: 'Fred', age: 23};

  it('returns a function that fetches the appropriate property', function() {
    var nm = R.prop('name');
    assert.strictEqual(typeof nm, 'function');
    assert.strictEqual(nm(fred), 'Fred');
  });

  if (typeof Map === 'function') {

    it('supports Map objects', function() {
      var map = new Map([['x', 1], ['y', 2]]);
      assert.strictEqual(R.prop('x', map), 1);
      assert.strictEqual(R.prop('y', map), 2);
      assert.strictEqual(R.prop('z', map), undefined);
    });

  }
});
