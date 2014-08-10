var assert = require('assert');
var R = require('../../..');
var curry = R.curry;

describe('curry', function() {
    function source(a, b, c) {
        return a * b * c;
    }
    var curried = curry(source);
/* TODO: restore these for debug build
    it('curry should set the toString value to the original', function() {
        assert.equal(String(source), String(curried));
        assert.equal(String(source), String(curried));
    });

});

describe('internal curry', function() {
    var map = R.map, filter = R.filter;
    it('curry should set the toString value to the original', function() {
        assert.notEqual(String(map), String(filter));
        assert.equal(String(map), String(map.source));
    });
    it('curried function != source', function() {
        assert.notEqual(map, map.source);
    });
*/
});
