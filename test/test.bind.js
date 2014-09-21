/* jshint -W053 */

var assert = require('assert');
var R = require('..');

describe('bind', function() {

    function Foo(x) {
        this.x = x;
    }
    function add(x) {
        return this.x + x;
    }
    function Bar(x, y) {
        this.x = x;
        this.y = y;
    }
    Bar.prototype = new Foo();
    Bar.prototype.getX = function() {
        return 'prototype getX';
    };

    it('returns a function', function() {
        assert(typeof R.bind(add, Foo) === 'function');
    });

    it('returns a function bound to the specified context object', function() {
        var f = new Foo(12);
        function isFoo() {
            return this instanceof Foo;
        }
        var isFooBound = R.bind(isFoo, f);
        assert.equal(isFoo(), false);
        assert.equal(isFooBound(), true);
    });

    it('works with built-in types', function() {
        var abc = R.bind(String.prototype.toLowerCase, 'ABCDEFG');
        assert(typeof abc === 'function');
        assert(abc() === 'abcdefg');
    });

    it('works with user-defined types', function() {
        var f = new Foo(12);
        function getX() {
            return this.x;
        }
        var getXFooBound = R.bind(getX, f);
        assert.equal(getXFooBound(), 12);
    });

    it('works with plain objects', function() {
        var pojso = {
            x: 100
        };
        function incThis() {
            return this.x + 1;
        }
        var incPojso = R.bind(incThis, pojso);
        assert(typeof incPojso === 'function');
        assert(incPojso() === 101);
    });

    it('does not interefere with existing object methods', function() {
        var b = new Bar('a', 'b');
        function getX() {
            return this.x;
        }
        var getXBarBound = R.bind(getX, b);
        assert.equal(b.getX(), 'prototype getX');
        assert.equal(getXBarBound(), 'a');
    });

    it('is curried', function() {
        var f = new Foo(1);
        assert(R.bind(add)(f)(10) === 11);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.bind, TypeError);
    });
});
