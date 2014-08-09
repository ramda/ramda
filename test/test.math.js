var assert = require("assert");
var R = require("..");

describe('add', function() {
    it('should add together two numbers', function() {
        assert.equal(10, R.add(3, 7));
    });

    it('should be automatically curried', function() {
        var incr = R.add(1);
        assert.equal(43, incr(42));
    });
});

describe('multiply', function() {
    it('should add together two numbers', function() {
        assert.equal(42, R.multiply(6, 7));
    });

    it('should be automatically curried', function() {
        var dbl = R.multiply(2);
        assert.equal(30, dbl(15));
    });
});

describe('subtract', function() {
    it('should subtract two numbers', function() {
        assert.equal(15, R.subtract(22, 7));
    });

    it('should be automatically curried', function() {
        var ninesCompl = R.subtract(9);
        assert.equal(3, ninesCompl(6));
    });
});

describe('subtractN', function() {
    it('should subtract two numbers', function() {
        assert.equal(15, R.subtractN(7,22));
    });

    it('should be automatically curried', function() {
        var minus6 = R.subtractN(6);
        assert.equal(3, minus6(9));
    });
});

describe('divide', function() {
    it('should divide two numbers', function() {
        assert.equal(4, R.divide(28, 7));
    });

    it('should be automatically curried', function() {
        var divideInto120 = R.divide(120);
        assert.equal(3, divideInto120(40));
    });
});

describe('divideBy', function() {
    it('should divide two numbers', function() {
        assert.equal(4, R.divideBy(7, 28));
    });

    it('should be automatically curried', function() {
        var half = R.divideBy(2);
        assert.equal(20, half(40));

    });
});

describe('modulo', function() {
  it('divides the first param by the second and returns the remainder', function() {
    assert.equal(R.modulo(100, 2), 0);
    assert.equal(R.modulo(100, 3), 1);
    assert.equal(R.modulo(100, 17), 15);
  });

  it('is automatically curried', function() {
    var modOf120by = R.modulo(120);
    assert.equal(typeof modOf120by, 'function');
    assert.equal(modOf120by(3), 0);
    assert.equal(modOf120by(19), 6);
  });

  it('preserves javascript-style modulo evaluation for negative numbers', function() {
    assert.equal(R.modulo(-5, 4), -1);
  });
});

describe('moduloBy', function() {
  it('divides the second param by the first and returns the remainder', function() {
    assert.equal(R.moduloBy(2, 100), 0);
    assert.equal(R.moduloBy(3, 100), 1);
    assert.equal(R.moduloBy(17, 100), 15);
  });

  it('is automatically curried', function() {
    var isOdd = R.moduloBy(2);
    assert.equal(typeof isOdd, 'function');
    assert.equal(isOdd(3), 1);
    assert.equal(isOdd(198), 0);
  });

  it('preserves javascript-style modulo evaluation for negative numbers', function() {
    assert.equal(R.moduloBy(4, -5), -1);
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

  it('is curried', function() {
    var f = R.mathMod(29);
    assert.equal(f(6), 5);
  });

});

describe('sum', function() {
    it('should add together the array of numbers supplied', function() {
        assert.equal(10, R.sum([1, 2, 3, 4]));
    });

    it('does not save the state of the accumulator', function() {
        assert.equal(10, R.sum([1,2,3,4]));
        assert.equal(1, R.sum([1]));
        assert.equal(25, R.sum([5,5,5,5,5]));
    });
});

describe('product', function() {
    it('should multiply together the array of numbers supplied', function() {
        assert.equal(24, R.product([1, 2, 3, 4]));
    });
});

describe('lt', function() {
    it('should report whether one item is less than another', function() {
        assert(R.lt(3, 5));
        assert(!R.lt(6, 4));
        assert(!R.lt(7.0, 7.0));
        assert(R.lt('abc', 'xyz'));
        assert(!R.lt('abcd', 'abc'));
    });

    it('should be automatically curried', function() {
        var atLeast20 = R.lt(20);
        assert(!atLeast20(10));
        assert(!atLeast20(20));
        assert(atLeast20(25));
    });
});

describe('lte', function() {
    it('should report whether one item is less than another', function() {
        assert(R.lte(3, 5));
        assert(!R.lte(6, 4));
        assert(R.lte(7.0, 7.0));
        assert(R.lte('abc', 'xyz'));
        assert(!R.lte('abcd', 'abc'));
    });

    it('should be automatically curried', function() {
        var greaterThan20 = R.lte(20);
        assert(!greaterThan20(10));
        assert(greaterThan20(20));
        assert(greaterThan20(25));
    });
});

describe('gt', function() {
    it('should report whether one item is less than another', function() {
        assert(!R.gt(3, 5));
        assert(R.gt(6, 4));
        assert(!R.gt(7.0, 7.0));
        assert(!R.gt('abc', 'xyz'));
        assert(R.gt('abcd', 'abc'));
    });

    it('should be automatically curried', function() {
        var lessThan20 = R.gt(20);
        assert(lessThan20(10));
        assert(!lessThan20(20));
        assert(!lessThan20(25));
    });
});

describe('gte', function() {
    it('should report whether one item is less than another', function() {
        assert(!R.gte(3, 5));
        assert(R.gte(6, 4));
        assert(R.gte(7.0, 7.0));
        assert(!R.gte('abc', 'xyz'));
        assert(R.gte('abcd', 'abc'));
    });

    it('should be automatically curried', function() {
        var upTo20 = R.gte(20);
        assert(upTo20(10));
        assert(upTo20(20));
        assert(!upTo20(25));
    });
});

describe('max', function() {
    it('calculates the largest value of a list', function() {
        assert.equal(R.max([2, 1, 2, 8, 6, 7, 5, 3, 0, 9]), 9);
        assert.equal(R.max([7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1]), 52);
    });

    it('accepts negative numbers, decimals, and even strings', function() {
        assert.equal(R.max([-6, -2, -4.3, -1.1, -5]), -1.1);
        assert.equal(R.max([7, "22", 11, 34, 17, "52", 26, 13, 40, 20, "10", 5, 16, 8, 4, "2", "1"]), 52);
    });
});

describe('min', function() {
    it('calculates the smallest value of a list', function() {
        assert.equal(R.min([2, 1, 2, 8, 6, 7, 5, 3, 0, 9]), 0);
        assert.equal(R.min([7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1]), 1);
    });

    it('accepts negative numbers, decimals, and even strings', function() {
        assert.equal(R.min([-6, -2, -4.3, -1.1, -5]), -6);
        assert.equal(R.min([7, "22", 11, 34, 17, "52", 26, 13, 40, 20, "10", 5, 16, 8, 4, "2", "1"]), 1);
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
        assert.equal(typeof(R.minWith(R.prop('x'), [])), "undefined");
    });

    it('is properly curried', function() {
        var lowestX = R.minWith(R.prop('x'));
        assert.deepEqual(lowestX([{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: -2, y: 0});
    });
});
