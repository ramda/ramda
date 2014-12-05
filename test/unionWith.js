var assert = require('assert');

var R = require('..');


describe('unionWith', function() {
    var Ro = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var So = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    var eqA = function(r, s) { return r.a === s.a; };
    it('combines two lists into the set of all their elements based on the passed-in equality predicate', function() {
        assert.deepEqual(R.unionWith(eqA, Ro, So), [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}, {a: 6}]);
    });
});
