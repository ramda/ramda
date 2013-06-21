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

