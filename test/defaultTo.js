var assert = require('assert');

var R = require('..');

describe('defaultTo', function() {

    var defaultTo42 = R.defaultTo(42);

    it('returns the default value if input is null/undefined', function() {
      assert.strictEqual(42, defaultTo42(null));
      assert.strictEqual(42, defaultTo42(undefined));
    });

    it('returns the input value if it is not null/undefined', function() {
      assert.strictEqual('a real value', defaultTo42('a real value'));
    });

    it('returns the input value even if it is considered falsy', function() {
      assert.strictEqual('', defaultTo42(''));
      assert.strictEqual(0, defaultTo42(0));
      assert.strictEqual(false, defaultTo42(false));
      assert.deepEqual([], defaultTo42([]));
    });

    it('can be called with both arguments directly', function() {
      assert.strictEqual(42, R.defaultTo(42, null));
      assert.strictEqual('a real value', R.defaultTo(42, 'a real value'));
    });

});
