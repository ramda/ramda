var assert = require('assert');

var R = require('..');


describe('op', function() {
    function lt(a, b) { return a < b; }
    var olt = R.op(lt);

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
        var lt100 = olt(R.__, 100);
        assert(typeof lt100 === 'function');
        assert(lt100(99));
    });

    it('can take a placeholder for its only arg', function() {
        var ltX = olt(R.__);
        var lt99 = ltX(99);
        assert(typeof ltX === 'function');
        assert(typeof lt99 === 'function');
        assert(lt99(98));
    });

    it('returns functions with the correct arity', function() {
        assert.strictEqual(R.op(lt).length, 2);
        assert.strictEqual(R.op(lt)(R.__).length, 2);
        assert.strictEqual(R.op(lt)(R.__, 1000).length, 1);
        assert.strictEqual(R.op(lt)(1000).length, 1);
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
