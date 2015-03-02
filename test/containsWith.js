var assert = require('assert');

var R = require('..');


describe('containsWith', function() {
    var Ro = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var So = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    var eqA = function(r, s) { return r.a === s.a; };

    it('determines if an element is the list based on the predicate', function() {
        assert(R.containsWith(eqA, {a: 3}, So));
        assert.strictEqual(R.containsWith(eqA, {a: 3000}, So), false);
    });
    it('is curried', function() {
        assert.strictEqual(typeof R.containsWith(eqA), 'function');
        assert.strictEqual(typeof R.containsWith(eqA)({a: 3}), 'function');
        assert(R.containsWith(eqA)({a: 3})(Ro));
    });
});
