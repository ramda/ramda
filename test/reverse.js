var assert = require('assert');

var R = require('..');


describe('reverse', function() {

  it('reverses arrays', function() {
    assert.deepEqual(R.reverse([]), []);
    assert.deepEqual(R.reverse([1]), [1]);
    assert.deepEqual(R.reverse([1, 2]), [2, 1]);
    assert.deepEqual(R.reverse([1, 2, 3]), [3, 2, 1]);
  });

  it('reverses strings', function() {
    assert.strictEqual(R.reverse(''), '');
    assert.strictEqual(R.reverse('a'), 'a');
    assert.strictEqual(R.reverse('ab'), 'ba');
    assert.strictEqual(R.reverse('abc'), 'cba');
  });

});
