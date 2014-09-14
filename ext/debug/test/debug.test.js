var R = require('../../..');

describe('curry', function() {
    function source(a, b, c) {
        return a * b * c;
    }
    var curried = R.curry(source);
    void curried;
/* TODO: restore these for debug build
    it('curry should set the toString value to the original', function() {
        assert.equal(String(source), String(curried));
        assert.equal(String(source), String(curried));
    });

});

describe('internal curry', function() {
    it('curry should set the toString value to the original', function() {
        assert.notEqual(String(R.map), String(R.filter));
        assert.equal(String(R.map), String(R.map.source));
    });
    it('curried function != source', function() {
        assert.notEqual(R.map, R.map.source);
    });
*/
});
