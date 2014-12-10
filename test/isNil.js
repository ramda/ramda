var assert = require('assert');
var R = require('..');

describe('isNil', function() {
    it('tests a value for `null` or `undefined`', function() {
        assert.strictEqual(R.isNil(void 0), true);
        assert.strictEqual(R.isNil(null), true);
        assert.strictEqual(R.isNil([]), false);
        assert.strictEqual(R.isNil({}), false);
        assert.strictEqual(R.isNil(0), false);
        assert.strictEqual(R.isNil(''), false);
    });

});
