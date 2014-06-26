var assert = require("assert");
var Lib = require("./../ramda");

describe('compose', function() {
    var compose = Lib.compose;
    function a(x) {return x + "A";}
    function b(x) {return x + "B";}
    function c(x, y) {return x + "C";}
    function d(x) {return x + "D";}

    it('executes its passed in functions in order from right to left', function() {
        assert.equal(compose(a, b, c, d)(""), "DCBA");
    });

    it('returns equivalent function if only passed one function argument', function() {
        assert.equal(compose(a)(""), a(""));
    });

    it('compose uses last functions arity', function() {
        assert.equal(compose(a, b, c).length, c.length);
    });
});

describe('pipe', function() {
    var pipe = Lib.pipe;
    function a(x, y) {return x + "A";}
    function b(x) {return x + "B";}
    function c(x) {return x + "C";}
    function d(x) {return x + "D";}
    it('executes its passed in functions in order from left to right', function() {
        assert.equal(pipe(a, b, c, d)(""), "ABCD");
    });

    it('returns the equivalent function if only passed one function argument', function() {
        assert.equal(pipe(a)(""), a(""));
    });

    it('compose uses first functions arity', function() {
        assert.equal(pipe(a, b, c).length, a.length);
    });
});

describe('use-over', function() {
    var use = Lib.use;

    function max() { return Math.max.apply(Math, arguments); }
    function add1(x) { return x + 1; }
    function mult2(x) { return x * 2; }
    function div3(x) { return x/3; }
    var f = use(max).over(add1, mult2, div3);

    it('takes a arbitrary number of function arguments and returns a function', function() {
        assert.equal(typeof use(max).over(add1), 'function');
        assert.equal(typeof use(max).over(add1, mult2, div3), 'function');
    });

    it('passes the arguments received to their respective functions', function() {
        assert.equal(f(7, 8, 9), 16); // max(7 + 1, 8 * 2, 9 / 3);
    });

    it('passes additional arguments to the main function', function() {
        assert.equal(f(7, 8, 9, 10), 16);
        assert.equal(f(7, 8, 9, 20), 20);
    });

    it('nonetheless has the correct arity', function() {
        assert.equal(f.length, 3);
    });

});

describe('useWith', function() {
    var useWith = Lib.useWith;
 
    function max() { return Math.max.apply(Math, arguments); }
    function add1(x) { return x + 1; }
    function mult2(x) { return x * 2; }
    function div3(x) { return x/3; }
    var f = useWith(max, add1, mult2, div3);

    it('takes a arbitrary number of function arguments and returns a function', function() {
        assert.equal(typeof useWith(max), 'function');
        assert.equal(typeof useWith(max, add1), 'function');
        assert.equal(typeof useWith(max, add1, mult2, div3), 'function');
    });

    it('passes the arguments received to their respective functions', function() {
        assert.equal(f(7, 8, 9), 16); // max(7 + 1, 8 * 2, 9 / 3);
    });

    it('passes additional arguments to the main function', function() {
        assert.equal(f(7, 8, 9, 10), 16);
        assert.equal(f(7, 8, 9, 20), 20);
    });

    it('nonetheless has the correct arity', function() {
        assert.equal(f.length, 3);
    });

});

describe('fork', function() {
    var fork = Lib.fork, add = Lib.add;
    var mult = function(a, b) {return a * b;};

    it('passes the results of applying the arguments individually to two separate functions into a single one', function() {
        assert.equal(fork(mult, add(1), add(3))(2), 15); // mult(add1(2), add3(2)) = mult(3, 5) = 3 * 15;
    });
});

