/* jshint -W053 */

var assert = require('assert');
var R = require('..');

describe('is', function() {
    it('works with built-in types', function() {
        assert.strictEqual(R.is(Array, []), true);
        assert.strictEqual(R.is(Boolean, new Boolean(false)), true);
        assert.strictEqual(R.is(Date, new Date()), true);
        assert.strictEqual(R.is(Function, function() {}), true);
        assert.strictEqual(R.is(Number, new Number(0)), true);
        assert.strictEqual(R.is(Object, {}), true);
        assert.strictEqual(R.is(RegExp, /(?:)/), true);
        assert.strictEqual(R.is(String, new String('')), true);
    });

    it('works with user-defined types', function() {
        function Foo() {}
        function Bar() {}
        Bar.prototype = new Foo();

        var foo = new Foo();
        var bar = new Bar();

        assert.strictEqual(R.is(Foo, foo), true);
        assert.strictEqual(R.is(Bar, bar), true);
        assert.strictEqual(R.is(Foo, bar), true);
        assert.strictEqual(R.is(Bar, foo), false);
    });

    it('is curried', function() {
        var isArray = R.is(Array);
        assert.strictEqual(isArray([]), true);
        assert.strictEqual(isArray({}), false);
    });

    it('considers almost everything an object', function() {
        function Foo() {}
        var foo = new Foo();
        var isObject = R.is(Object);

        assert.strictEqual(isObject(foo), true);
        assert.strictEqual(isObject(function() { return arguments; }()), true);
        assert.strictEqual(isObject([]), true);
        assert.strictEqual(isObject(new Boolean(false)), true);
        assert.strictEqual(isObject(new Date()), true);
        assert.strictEqual(isObject(function() {}), true);
        assert.strictEqual(isObject(new Number(0)), true);
        assert.strictEqual(isObject(/(?:)/), true);
        assert.strictEqual(isObject(new String('')), true);

        assert.strictEqual(isObject(null), false);
        assert.strictEqual(isObject(undefined), false);
    });

    it('does not coerce', function() {
        assert.strictEqual(R.is(Boolean, 1), false);
        assert.strictEqual(R.is(Number, '1'), false);
        assert.strictEqual(R.is(Number, false), false);
    });

    it('recognizes primitives as their object equivalents', function() {
        assert.strictEqual(R.is(Boolean, false), true);
        assert.strictEqual(R.is(Number, 0), true);
        assert.strictEqual(R.is(String, ''), true);
    });

    it('does not consider primitives to be instances of Object', function() {
        assert.strictEqual(R.is(Object, false), false);
        assert.strictEqual(R.is(Object, 0), false);
        assert.strictEqual(R.is(Object, ''), false);
    });

    it('is curried', function() {
        assert(typeof R.is(String) === 'function');
        assert(R.is(String)('s'));
    });

    it('throws on zero arguments', function() {
        assert.throws(R.is, TypeError);
    });
});

describe('isArrayLike', function() {
    it('is true for Arrays', function() {
        assert(R.isArrayLike([]));
        assert(R.isArrayLike([1, 2, 3, 4]));
        assert(R.isArrayLike([null]));
    });

    it('is true for arguments', function() {
        function test() {
            return R.isArrayLike(arguments);
        }
        assert(test());
        assert(test(1, 2, 3));
        assert(test(null));
    });

    it('is false for Strings', function() {
        assert.equal(R.isArrayLike(''), false);
        assert.equal(R.isArrayLike('abcdefg'), false);
    });

    it('is true for arbitrary objects with numeric length, if extreme indices are defined', function() {
        var obj1 = {length: 0};
        var obj2 = {0: 'something', length: 0};
        var obj3 = {0: void 0, length: 0};
        var obj4 = {0: 'zero', 1: 'one', length: 2};
        var obj5 = {0: 'zero', length: 2};
        var obj6 = {1: 'one', length: 2};
        assert(R.isArrayLike(obj1));
        assert(R.isArrayLike(obj2));
        assert(R.isArrayLike(obj3));
        assert(R.isArrayLike(obj4));
        assert(!R.isArrayLike(obj5));
        assert(!R.isArrayLike(obj6));
    });

    it('is false for everything else', function() {
        assert.equal(R.isArrayLike(), false);
        assert.equal(R.isArrayLike(1), false);
        assert.equal(R.isArrayLike({}), false);
        assert.equal(R.isArrayLike(false), false);
        assert.equal(R.isArrayLike(function() {}), false);
    });
});
