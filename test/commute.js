var assert = require('assert');

var R = require('..');


var as = [[1], [3, 4]];
var bs = [[1, 2], [3]];
var cs = [[1, 2], [3, 4]];


describe('commute', function() {
    it('"pivots" a list (list of functors => functor of a list)', function() {
        assert.deepEqual(R.commute(R.of, as), [[1, 3], [1, 4]]);
        assert.deepEqual(R.commute(R.of, bs), [[1, 3], [2, 3]]);
        assert.deepEqual(R.commute(R.of, cs), [[1, 3], [2, 3], [1, 4], [2, 4]]);
    });

    it('is curried', function() {
        var cmtArr = R.commute(R.of);
        assert(typeof cmtArr === 'function');
        assert.deepEqual(cmtArr(as), [[1, 3], [1, 4]]);
        assert.deepEqual(cmtArr(bs), [[1, 3], [2, 3]]);
        assert.deepEqual(cmtArr(cs), [[1, 3], [2, 3], [1, 4], [2, 4]]);

    });
});
