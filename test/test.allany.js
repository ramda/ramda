var assert = require('assert');
var R = require('..');

describe('every', function() {
    var even = function(n) {return n % 2 === 0;};
    var T = function() {return true;};

    it('returns true if all elements satisfy the predicate', function() {
        assert.equal(R.every(even, [2, 4, 6, 8, 10, 12]), true);
    });

    it('returns false if any element fails to satisfy the predicate', function() {
        assert.equal(R.every(even, [2, 4, 6, 8, 9, 10]), false);
    });

    it('returns true for an empty list', function() {
        assert.equal(R.every(T, []), true);
    });

    it('short-circuits on first false value', function() {
        var count = 0;
        var test = function(n) {count++; return even(n);};
        var result = R.every(test, [2, 4, 6, 7, 8, 10]);
        assert(!result);
        assert.equal(count, 4);
    });

    it('works with more complex objects', function() {
        var xs = [{x: 'abc'}, {x: 'ade'}, {x: 'fghiajk'}];
        function len3(o) { return o.x.length === 3; }
        function hasA(o) { return o.x.indexOf('a') > -1; }
        assert.equal(R.every(len3, xs), false);
        assert.equal(R.every(hasA, xs), true);
    });

    it('is automatically curried', function() {
        var count = 0;
        var test = function(n) {count++; return even(n);};
        assert(R.every(test)([2, 4, 6, 7, 8, 10]) === false);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.every, TypeError);
    });
});

describe('some', function() {
    var odd = function(n) {return n % 2 === 1;};
    var T = function() {return true;};

    it('returns true if any element satisfies the predicate', function() {
        assert.equal(R.some(odd, [2, 4, 6, 8, 10, 11, 12]), true);
    });

    it('returns false if all elements fails to satisfy the predicate', function() {
        assert.equal(R.some(odd, [2, 4, 6, 8, 10, 12]), false);
    });

    it('works with more complex objects', function() {
        var people = [{first: 'Paul', last: 'Grenier'}, {first:'Mike', last: 'Hurley'}, {first: 'Will', last: 'Klein'}];
        var alliterative = function(person) {return person.first.charAt(0) === person.last.charAt(0);};
        assert.equal(R.some(alliterative, people), false);
        people.push({first: 'Scott', last: 'Sauyet'});
        assert.equal(R.some(alliterative, people), true);
    });

    it('can use a configurable function', function() {
        var teens = [{name: 'Alice', age: 14}, {name: 'Betty', age: 18}, {name: 'Cindy', age: 17}];
        var atLeast = function(age) {return function(person) {return person.age >= age;};};
        assert.equal(R.some(atLeast(16), teens), true, 'Some can legally drive');
        assert.equal(R.some(atLeast(21), teens), false, 'None can legally drink');
    });

    it('returns false for an empty list', function() {
        assert.equal(R.some(T, []), false);
    });

    it('short-circuits on first true value', function() {
        var count = 0;
        var test = function(n) {count++; return odd(n);};
        var result = R.some(test, [2, 4, 6, 7, 8, 10]);
        assert(result);
        assert.equal(count, 4);
    });

    it('is automatically curried', function() {
        var count = 0;
        var test = function(n) {count++; return odd(n);};
        assert(R.some(test)([2, 4, 6, 7, 8, 10]) === true);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.some, TypeError);
    });
});
