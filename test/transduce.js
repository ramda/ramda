var assert = require('assert');

var R = require('..');


describe('transduce', function() {
    var add = R.add;
    var mult = function(a, b) {return a * b;};
    var isOdd = function(b) {return b % 2 === 1;};
    var addxf = {
        step: function(acc, x) { return acc + x; },
        init: function() { return 0; },
        result: function(x) { return x; }
    };

    var listxf = {
        step: function(acc, x) { return acc.concat([x]); },
        init: function() { return []; },
        result: function(x) { return x; }
    };

    var multxf = {
        step: function(acc, x) { return acc * x; },
        init: function() { return 1; },
        result: function(x) { return x; }
    };

    var toxf = function(fn) {
        return function(xf) {
            return {
                f: fn,
                step: xf.step,
                result: xf.result,
                xf: xf
            };
        };
    };

    it('transduces into arrays', function() {
        assert.deepEqual(R.transduce(R.map(add(1)), R.appendTo, [], [1, 2, 3, 4]), [2, 3, 4, 5]);
        assert.deepEqual(R.transduce(R.filter(isOdd), R.appendTo, [],  [1, 2, 3, 4]), [1, 3]);
        assert.deepEqual(R.transduce(R.compose(R.map(add(1)), R.take(2)), R.appendTo, [],  [1, 2, 3, 4]), [2, 3]);
    });

    it('transduces into strings', function() {
        assert.deepEqual(R.transduce(R.map(add(1)), add, '', [1, 2, 3, 4]), '2345');
        assert.deepEqual(R.transduce(R.filter(isOdd), add, '', [1, 2, 3, 4]), '13');
        assert.deepEqual(R.transduce(R.compose(R.map(add(1)), R.take(2)), add, '', [1, 2, 3, 4]), '23');
    });

    it('transduces into objects', function() {
        assert.deepEqual(R.transduce(R.map(R.identity), R.merge, {}, [{a: 1}, {b: 2, c: 3}]), {a: 1, b: 2, c: 3});
    });

    it('folds transformer objects over a collection with the supplied accumulator', function() {
        assert.strictEqual(R.transduce(toxf(add), addxf, 0, [1, 2, 3, 4]), 10);
        assert.strictEqual(R.transduce(toxf(mult), multxf, 1, [1, 2, 3, 4]), 24);
        assert.deepEqual(R.transduce(toxf(R.concat), listxf, [0], [1, 2, 3, 4]), [0, 1, 2, 3, 4]);
        assert.strictEqual(R.transduce(toxf(add), add, 0, [1, 2, 3, 4]), 10);
        assert.strictEqual(R.transduce(toxf(mult), mult, 1, [1, 2, 3, 4]), 24);
    });

    it('returns the accumulator for an empty collection', function() {
        assert.strictEqual(R.transduce(toxf(add), addxf, 0, []), 0);
        assert.strictEqual(R.transduce(toxf(mult), multxf, 1, []), 1);
        assert.deepEqual(R.transduce(toxf(R.concat), listxf, [], []), []);
    });

    it('is automatically curried', function() {
        var addOrCat1 = R.transduce(toxf(add));
        var addOrCat2 = addOrCat1(addxf);
        var sum = addOrCat2(0);
        var cat = addOrCat2('');
        assert.strictEqual(sum([1, 2, 3, 4]), 10);
        assert.strictEqual(cat(['1', '2', '3', '4']), '1234');
    });

    it('correctly reports the arity of curried versions', function() {
        var sum = R.transduce(toxf(add), addxf, 0);
        assert.strictEqual(sum.length, 1);
    });
});
