var assert = require('assert');
var R = require('..');

describe('curry', function() {
    function source(a, b, c) {
        return a * b * c;
    }
    var curried = R.curry(source);
    it('curries', function() {
        assert.equal(curried(1)(2)(3), 6);
        assert.equal(curried(1, 2)(3), 6);
        assert.equal(curried(1)(2, 3), 6);
        assert.equal(curried(1, 2, 3), 6);
        assert.notEqual(curried, source);
    });

    it('produces functions that throw when called with no arguments', function() {
        assert.throws(curried, TypeError);
        assert.throws(curried(1), TypeError);
        assert.throws(curried(1)(1), TypeError);
    });

});

describe('curryN', function() {
    function source(a, b, c, d) {
        void d;
        return a * b * c;
    }
    it('accepts an arity', function() {
        var curried = R.curryN(3, source);
        assert.equal(curried(1)(2)(3), 6);
        assert.equal(curried(1, 2)(3), 6);
        assert.equal(curried(1)(2, 3), 6);
        assert.equal(curried(1, 2, 3), 6);
    });
});

describe('internal curry', function() {
    it('throws an exception given no arguments', function() {
        assert.throws(R.map);
        assert.throws(R.map(R.I));
        // doesnt throw an exception
        R.concat([]);
    });
});

describe('op', function() {
    function lt(a, b) { return a < b; }
    var olt = R.op(lt);
    var placeholder = R.__;

    it('converts a binary function to enable infix-style behavior via placeholder', function() {
        assert(typeof olt === 'function');
    });

    it('is curried', function() {
        var colt = olt(10);
        assert(typeof colt === 'function');
        assert(colt(11));
        assert(!colt(9));
    });

    it('can take a placeholder for the first arg', function() {
        var lt100 = olt(placeholder, 100);
        assert(typeof lt100 === 'function');
        assert(lt100(99));
    });

    it('can take a placeholder for its only arg', function() {
        var ltX = olt(placeholder);
        var lt99 = ltX(99);
        assert(typeof ltX === 'function');
        assert(typeof lt99 === 'function');
        assert(lt99(98));
    });

    it('returns functions with the correct arity', function() {
        assert.equal(R.op(lt).length, 2);
        assert.equal(R.op(lt)(placeholder).length, 2);
        assert.equal(R.op(lt)(placeholder, 1000).length, 1);
        assert.equal(R.op(lt)(1000).length, 1);
    });

    it('can work with methods that may take extra arguments', function() {
        var items = [
            {value: 1},
            {value: 2},
            {value: 3},
            {value: 4},
            {value: 5}
        ];
        var gt = R.op(function(a, b) { return a > b; });
        if (Array.prototype.filter) {
            assert.deepEqual(items.filter(R.where({value: gt(3)})), [{value: 1}, {value: 2}]);
            assert.deepEqual(items.filter(R.where({value: gt(R.__, 3)})), [{value: 4}, {value: 5}]);
            assert.deepEqual(items.filter(R.where({value: gt(R.__)(3)})), [{value: 4}, {value: 5}]);
        }
        assert(gt(R.__, 3)(4));
        assert(gt(R.__, 3)(4, {}));
    });

    it('throws an exception given no arguments', function() {
        assert.throws(R.op);
        assert.throws(olt);
    });
});
