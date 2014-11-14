var assert = require('assert');
var R = require('..');

describe('ifElse', function() {
    var t = function(a) { return a + 1; };
    var identity = function(a) { return a; };
    var isArray = function(a) { return Object.prototype.toString.call(a) === '[object Array]'; };

    it('calls the truth case function if the validator returns a truthy value', function() {
        var v = function(a) { return typeof a === 'number'; };
        assert.equal(R.ifElse(v, t, identity)(10), 11);
    });

    it('calls the false case function if the validator returns a falsey value', function() {
        var v = function(a) { return typeof a === 'number'; };
        assert.equal(R.ifElse(v, t, identity)('hello'), 'hello');
    });

    it('calls the true case on array items and the false case on non array items', function() {
        var list = [[1, 2, 3, 4, 5], 10, [0, 1], 15];
        var arrayToLength = R.map(R.ifElse(isArray, R.prop('length'), identity));
        assert.deepEqual(arrayToLength(list), [5, 10, 2, 15]);
    });

    it('passes the arguments to the true case function', function() {
        var v = function() { return true; };
        var onTrue = function(a, b) {
            assert.equal(a, 123);
            assert.equal(b, 'abc');
        };
        R.ifElse(v, onTrue, identity)(123, 'abc');
    });

    it('passes the arguments to the false case function', function() {
        var v = function() { return false; };
        var onFalse = function(a, b) {
            assert.equal(a, 123);
            assert.equal(b, 'abc');
        };
        R.ifElse(v, identity, onFalse)(123, 'abc');
    });

    it('returns a curried function', function() {
        var v = function(a) { return typeof a === 'number'; };
        var ifIsNumber = R.ifElse(v);
        assert.equal(ifIsNumber(t, identity)(15), 16);
        assert.equal(ifIsNumber(t, identity)('hello'), 'hello');
    });

    it('is aliased by `if`', function() {
        assert.strictEqual(R['if'], R.ifElse);
    });
});

describe('cond', function() {
    it('returns a function', function() {
        assert.strictEqual(typeof R.cond(), 'function');
    });

    it('returns a conditional function', function() {
        var fn = R.cond(
            [R.eq(0),      R.always('water freezes at 0°C')],
            [R.eq(100),    R.always('water boils at 100°C')],
            [R.alwaysTrue, function(temp) { return 'nothing special happens at ' + temp + '°C'; }]
        );
        assert.strictEqual(fn(0), 'water freezes at 0°C');
        assert.strictEqual(fn(50), 'nothing special happens at 50°C');
        assert.strictEqual(fn(100), 'water boils at 100°C');
    });

    it('returns a function which returns undefined if none of the predicates matches', function() {
        var fn = R.cond(
            [R.eq('foo'), R.always(1)],
            [R.eq('bar'), R.always(2)]
        );
        assert.strictEqual(fn('quux'), undefined);
    });

    it('predicates are tested in order', function() {
        var fn = R.cond(
            [R.alwaysTrue, R.always('foo')],
            [R.alwaysTrue, R.always('bar')],
            [R.alwaysTrue, R.always('baz')]
        );
        assert.strictEqual(fn(), 'foo');
    });

    it('forwards all arguments to predicates and to transformers', function() {
        var fn = R.cond(
            [function(_, x) { return x == 42; }, function() { return arguments.length; }]
        );
        assert.strictEqual(fn(21, 42, 84), 3);
    });
});
