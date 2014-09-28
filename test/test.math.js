var assert = require('assert');
var R = require('..');

describe('add', function() {
    it('adds together two numbers', function() {
        assert.equal(10, R.add(3, 7));
    });

    it('is automatically curried', function() {
        var incr = R.add(1);
        assert.equal(43, incr(42));
    });

    it('throws if given no arguments', function() {
        assert.throws(R.add, TypeError);
    });
});

describe('multiply', function() {
    it('adds together two numbers', function() {
        assert.equal(42, R.multiply(6, 7));
    });

    it('is automatically curried', function() {
        var dbl = R.multiply(2);
        assert.equal(30, dbl(15));
    });

    it('throws if given no arguments', function() {
        assert.throws(R.multiply, TypeError);
    });
});

describe('subtract', function() {
    it('subtracts two numbers', function() {
        assert.equal(15, R.subtract(22, 7));
    });

    it('is curried', function() {
        var ninesCompl = R.subtract(9);
        assert.equal(3, ninesCompl(6));
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var minus5 = R.subtract(void 0, 5);
        assert.equal(12, minus5(17));
    });

    it('throws if given no arguments', function() {
        assert.throws(R.subtract, TypeError);
    });
});


describe('divide', function() {
    it('divides two numbers', function() {
        assert.equal(4, R.divide(28, 7));
    });

    it('is curried', function() {
        var into28 = R.divide(28);
        assert.equal(4, into28(7));
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var half = R.divide(void 0, 2);
        assert.equal(20, half(40));
    });

    it('throws if given no arguments', function() {
        assert.throws(R.divide, TypeError);
    });
});


describe('modulo', function() {
    it('divides the first param by the second and returns the remainder', function() {
        assert.equal(R.modulo(100, 2), 0);
        assert.equal(R.modulo(100, 3), 1);
        assert.equal(R.modulo(100, 17), 15);
    });

    it('is curried', function() {
        var hundredMod = R.modulo(100);
        assert.equal(typeof hundredMod, 'function');
        assert.equal(hundredMod(2), 0);
        assert.equal(hundredMod(3), 1);
        assert.equal(hundredMod(17), 15);
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var isOdd = R.modulo(void 0, 2);
        assert.equal(typeof isOdd, 'function');
        assert.equal(isOdd(3), 1);
        assert.equal(isOdd(198), 0);
    });

    it('preserves javascript-style modulo evaluation for negative numbers', function() {
        assert.equal(R.modulo(-5, 4), -1);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.modulo, TypeError);
    });
});


describe('mathMod', function() {
    it('requires integer arguments', function() {
        assert.notEqual(R.mathMod('s', 3), R.mathMod('s', 3));
        assert.notEqual(R.mathMod(3, 's'), R.mathMod(3, 's'));
        assert.notEqual(R.mathMod(12.2, 3), R.mathMod(12.2, 3));
        assert.notEqual(R.mathMod(3, 12.2), R.mathMod(3, 12.2));
    });

    it('behaves differently than JS modulo', function() {
        assert.notEqual(R.mathMod(-17, 5), -17 % 5);
        assert.notEqual(R.mathMod(17.2, 5), 17.2 % 5);
        assert.notEqual(R.mathMod(17, -5), 17 % -5);
    });

    it('computes the true modulo function', function() {
        assert.equal(R.mathMod(-17, 5), 3);
        assert.equal(isNaN(R.mathMod(17, -5)), true);
        assert.equal(isNaN(R.mathMod(17, 0)), true);
        assert.equal(isNaN(R.mathMod(17.2, 5)), true);
        assert.equal(isNaN(R.mathMod(17, 5.5)), true);
    });

    it('is curried', function() {
        var f = R.mathMod(29);
        assert.equal(f(6), 5);
    });


    it('behaves right curried when passed `undefined` for its first argument', function() {
        var mod5 = R.modulo(void 0, 5);
        assert.equal(mod5(12), 2);
        assert.equal(mod5(8), 3);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.mathMod);
    });
});

describe('sum', function() {
    it('adds together the array of numbers supplied', function() {
        assert.equal(10, R.sum([1, 2, 3, 4]));
    });

    it('does not save the state of the accumulator', function() {
        assert.equal(10, R.sum([1, 2, 3, 4]));
        assert.equal(1, R.sum([1]));
        assert.equal(25, R.sum([5, 5, 5, 5, 5]));
    });
});

describe('product', function() {
    it('multiplies together the array of numbers supplied', function() {
        assert.equal(24, R.product([1, 2, 3, 4]));
    });
});

describe('lt', function() {
    var __ = void 0;
    it('reports whether one item is less than another', function() {
        assert(R.lt(3, 5));
        assert(!R.lt(6, 4));
        assert(!R.lt(7.0, 7.0));
        assert(R.lt('abc', 'xyz'));
        assert(!R.lt('abcd', 'abc'));
    });

    it('is curried', function() {
        var gt5 = R.lt(5);
        assert(gt5(10));
        assert(!gt5(5));
        assert(!gt5(3));
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var lt5 = R.lt(__, 5);
        assert(!lt5(10));
        assert(!lt5(5));
        assert(lt5(3));
    });

    it('throws when given no arguments', function() {
        assert.throws(R.lt, TypeError);
    });
});

describe('lte', function() {
    var __ = void 0;
    it('reports whether one item is less than another', function() {
        assert(R.lte(3, 5));
        assert(!R.lte(6, 4));
        assert(R.lte(7.0, 7.0));
        assert(R.lte('abc', 'xyz'));
        assert(!R.lte('abcd', 'abc'));
    });

    it('is curried', function() {
        var gte20 = R.lte(20);
        assert(!gte20(10));
        assert(gte20(20));
        assert(gte20(25));
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var upTo20 = R.lte(__, 20);
        assert(upTo20(10));
        assert(upTo20(20));
        assert(!upTo20(25));
    });

    it('throws when given no arguments', function() {
        assert.throws(R.lte, TypeError);
    });
});

describe('gt', function() {
    var __ = void 0;
    it('reports whether one item is less than another', function() {
        assert(!R.gt(3, 5));
        assert(R.gt(6, 4));
        assert(!R.gt(7.0, 7.0));
        assert(!R.gt('abc', 'xyz'));
        assert(R.gt('abcd', 'abc'));
    });

    it('is curried', function() {
        var lt20 = R.gt(20);
        assert(lt20(10));
        assert(!lt20(20));
        assert(!lt20(25));
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var gt20 = R.gt(__, 20);
        assert(!gt20(10));
        assert(!gt20(20));
        assert(gt20(25));
    });

    it('throws when given no arguments', function() {
        assert.throws(R.gt, TypeError);
    });
});

describe('gte', function() {
    it('reports whether one item is less than another', function() {
        assert(!R.gte(3, 5));
        assert(R.gte(6, 4));
        assert(R.gte(7.0, 7.0));
        assert(!R.gte('abc', 'xyz'));
        assert(R.gte('abcd', 'abc'));
    });

    it('is curried', function() {
        var lte20 = R.gte(20);
        assert(lte20(10));
        assert(lte20(20));
        assert(!lte20(25));
    });

    it('behaves right curried when passed `undefined` for its first argument', function() {
        var __ = void 0;
        var gte20 = R.gte(__, 20);
        assert(!gte20(10));
        assert(gte20(20));
        assert(gte20(25));
    });

    it('throws when given no arguments', function() {
        assert.throws(R.gte, TypeError);
    });
});

describe('max', function() {
    it('calculates the largest value of a list', function() {
        assert.equal(R.max([2, 1, 2, 8, 6, 7, 5, 3, 0, 9]), 9);
        assert.equal(R.max([7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1]), 52);
    });

    it('accepts negative numbers, decimals, and even strings', function() {
        assert.equal(R.max([-6, -2, -4.3, -1.1, -5]), -1.1);
        assert.equal(R.max([7, '22', 11, 34, 17, '52', 26, 13, 40, 20, '10', 5, 16, 8, 4, '2', '1']), 52);
    });
});

describe('min', function() {
    it('calculates the smallest value of a list', function() {
        assert.equal(R.min([2, 1, 2, 8, 6, 7, 5, 3, 0, 9]), 0);
        assert.equal(R.min([7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1]), 1);
    });

    it('accepts negative numbers, decimals, and even strings', function() {
        assert.equal(R.min([-6, -2, -4.3, -1.1, -5]), -6);
        assert.equal(R.min([7, '22', 11, 34, 17, '52', 26, 13, 40, 20, '10', 5, 16, 8, 4, '2', '1']), 1);
    });
});

describe('maxWith', function() {
    it('calculates the largest value of a list using the supplied comparator', function() {
        assert.deepEqual(R.maxWith(R.prop('x'), [{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: 5, y: 10});
    });

    it('returns undefined for the empty list', function() {
        assert.equal(R.maxWith(R.prop('x'), []), undefined);
    });

    it('is properly curried', function() {
        var highestX = R.maxWith(R.prop('x'));
        assert.deepEqual(highestX([{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: 5, y: 10});
    });
});

describe('minWith', function() {
    it('calculates the smallest value of a list using the supplied comparator', function() {
        assert.deepEqual(R.minWith(R.prop('x'), [{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: -2, y: 0});
    });

    it('returns null for the empty list', function() {
        assert.equal(typeof(R.minWith(R.prop('x'), [])), 'undefined');
    });

    it('is properly curried', function() {
        var lowestX = R.minWith(R.prop('x'));
        assert.deepEqual(lowestX([{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: -2, y: 0});
    });
});
