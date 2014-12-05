var assert = require('assert');

var R = require('..');


describe('zipObj', function() {
    it('combines an array of keys with an arrau of values into a single object', function() {
        assert.deepEqual(R.zipObj(['a', 'b', 'c'], [1, 2, 3]), {a: 1, b: 2, c: 3});
    });
    it('ignores extra values', function() {
        assert.deepEqual(R.zipObj(['a', 'b', 'c'], [1, 2, 3, 4, 5, 6, 7]), {a: 1, b: 2, c: 3});
    });
    it('extra keys are undefined', function() {
        assert.deepEqual(R.zipObj(['a', 'b', 'c', 'd', 'e', 'f'], [1, 2, 3]),
          {a: 1, b: 2, c: 3, d: undefined, e: undefined, f: undefined});
    });
    it('last one in wins when there are duplicate keys', function() {
        assert.deepEqual(R.zipObj(['a', 'b', 'c', 'a'], [1, 2, 3, 'LAST']), {a: 'LAST', b: 2, c: 3});
    });
});
