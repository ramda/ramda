var assert = require('assert');

var R = require('..');


describe('propIs', function() {

  it('returns true if the specified object property is of the given type', function() {
    assert.strictEqual(R.propIs(Number, 'value', {value: 1}), true);
  });

  it('returns false otherwise', function() {
    assert.strictEqual(R.propIs(String, 'value', {value: 1}), false);
    assert.strictEqual(R.propIs(String, 'value', {}), false);
  });

});
