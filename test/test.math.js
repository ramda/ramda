var assert = require("assert");
var Lib = require("./../ramda");

describe('add', function() {
    var add = Lib.add;

    it('should add together two numbers', function() {
        assert.equal(10, add(3, 7));
    });

    it('should be automatically curried', function() {
        var incr = add(1);
        assert.equal(43, incr(42));
    });
});

describe('multiply', function() {
    var multiply = Lib.multiply;

    it('should add together two numbers', function() {
        assert.equal(42, multiply(6, 7));
    });

    it('should be automatically curried', function() {
        var dbl = multiply(2);
        assert.equal(30, dbl(15));
    });
});

describe('subtract', function() {
    var subtract = Lib.subtract;

    it('should subtract two numbers', function() {
        assert.equal(15, subtract(22, 7));
    });

    it('should be automatically curried', function() {
        var ninesCompl = subtract(9);
        assert.equal(3, ninesCompl(6));
    });
});

describe('subtractN', function() {
    var subtractN = Lib.subtractN;

    it('should subtract two numbers', function() {
        assert.equal(15, subtractN(7,22));
    });

    it('should be automatically curried', function() {
        var minus6 = subtractN(6);
        assert.equal(3, minus6(9));
    });
});

describe('divide', function() {
    var divide = Lib.divide;

    it('should divide two numbers', function() {
        assert.equal(4, divide(28, 7));
    });

    it('should be automatically curried', function() {
        var divideInto120 = divide(120);
        assert.equal(3, divideInto120(40));
    });
});

describe('divideBy', function() {
    var divideBy = Lib.divideBy;

    it('should divide two numbers', function() {
        assert.equal(4, divideBy(7, 28));
    });

    it('should be automatically curried', function() {
        var half = divideBy(2);
        assert.equal(20, half(40));

    });
});

describe('modulo', function() {
  var modulo = Lib.modulo;
  it('divides the first param by the second and returns the remainder', function() {
    assert.equal(modulo(100, 2), 0);
    assert.equal(modulo(100, 3), 1);
    assert.equal(modulo(100, 17), 15);
  });

  it('is automatically curried', function() {
    var modOf120by = modulo(120);
    assert.equal(typeof modOf120by, 'function');
    assert.equal(modOf120by(3), 0);
    assert.equal(modOf120by(19), 6);
  });

  it('preserves javascript-style modulo evaluation for negative numbers', function() {
    assert.equal(modulo(-5, 4), -1);
  });
});

describe('sum', function() {
    var sum = Lib.sum;

    it('should add together the array of numbers supplied', function() {
        assert.equal(10, sum([1, 2, 3, 4]));
    });
});

describe('product', function() {
    var product = Lib.product;

    it('should multiply together the array of numbers supplied', function() {
        assert.equal(24, product([1, 2, 3, 4]));
    });
});

describe('lt', function() {
    var lt = Lib.lt;

    it('should report whether one item is less than another', function() {
        assert(lt(3, 5));
        assert(!lt(6, 4));
        assert(!lt(7.0, 7.0));
        assert(lt('abc', 'xyz'));
        assert(!lt('abcd', 'abc'));
    });

    it('should be automatically curried', function() {
        var atLeast20 = lt(20);
        assert(!atLeast20(10));
        assert(!atLeast20(20));
        assert(atLeast20(25));
    });
});

describe('lte', function() {
    var lte = Lib.lte;

    it('should report whether one item is less than another', function() {
        assert(lte(3, 5));
        assert(!lte(6, 4));
        assert(lte(7.0, 7.0));
        assert(lte('abc', 'xyz'));
        assert(!lte('abcd', 'abc'));
    });

    it('should be automatically curried', function() {
        var greaterThan20 = lte(20);
        assert(!greaterThan20(10));
        assert(greaterThan20(20));
        assert(greaterThan20(25));
    });
});

describe('gt', function() {
    var gt = Lib.gt;

    it('should report whether one item is less than another', function() {
        assert(!gt(3, 5));
        assert(gt(6, 4));
        assert(!gt(7.0, 7.0));
        assert(!gt('abc', 'xyz'));
        assert(gt('abcd', 'abc'));
    });

    it('should be automatically curried', function() {
        var lessThan20 = gt(20);
        assert(lessThan20(10));
        assert(!lessThan20(20));
        assert(!lessThan20(25));
    });
});

describe('gte', function() {
    var gte = Lib.gte;

    it('should report whether one item is less than another', function() {
        assert(!gte(3, 5));
        assert(gte(6, 4));
        assert(gte(7.0, 7.0));
        assert(!gte('abc', 'xyz'));
        assert(gte('abcd', 'abc'));
    });

    it('should be automatically curried', function() {
        var upTo20 = gte(20);
        assert(upTo20(10));
        assert(upTo20(20));
        assert(!upTo20(25));
    });
});

describe('max', function() {
    var max = Lib.max;

    it('calculates the largest value of a list', function() {
        assert.equal(max([2, 1, 2, 8, 6, 7, 5, 3, 0, 9]), 9);
        assert.equal(max([7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1]), 52);
    });

    it('accepts negative numbers, decimals, and even strings', function() {
        assert.equal(max([-6, -2, -4.3, -1.1, -5]), -1.1);
        assert.equal(max([7, "22", 11, 34, 17, "52", 26, 13, 40, 20, "10", 5, 16, 8, 4, "2", "1"]), 52);
    });
});

describe('min', function() {
    var min = Lib.min;

    it('calculates the largest value of a list', function() {
        assert.equal(min([2, 1, 2, 8, 6, 7, 5, 3, 0, 9]), 0);
        assert.equal(min([7, 22, 11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1]), 1);
    });

    it('accepts negative numbers, decimals, and even strings', function() {
        assert.equal(min([-6, -2, -4.3, -1.1, -5]), -6);
        assert.equal(min([7, "22", 11, 34, 17, "52", 26, 13, 40, 20, "10", 5, 16, 8, 4, "2", "1"]), 1);
    });
});

describe('maxWith', function() {
    var maxWith = Lib.maxWith;
    var comparator = function(a, b) {return a.x - b.x;};

    it('calculates the largest value of a list using the supplied comparator', function() {
        assert.deepEqual(maxWith(comparator, [{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: 5, y: 10});
    });

    it('returns null for the empty list', function() {
        assert.equal(maxWith(comparator, []), null);
    });

    it('is properly curried', function() {
        var highestX = maxWith(comparator);
        assert.deepEqual(highestX([{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: 5, y: 10});
    });
});

describe('minWith', function() {
    var minWith = Lib.minWith;
    var comparator = function(a, b) {return a.x - b.x;};

    it('calculates the largest value of a list using the supplied comparator', function() {
        assert.deepEqual(minWith(comparator, [{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: -2, y: 0});
    });

    it('returns null for the empty list', function() {
        assert.equal(minWith(comparator, []), null);
    });

    it('is properly curried', function() {
        var lowestX = minWith(comparator);
        assert.deepEqual(lowestX([{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: -2, y: 0});
    });
});
