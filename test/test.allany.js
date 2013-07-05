var assert = require("assert");
var Lib = require("./../ramda");

describe('all', function() {
    var all = Lib.all;
    var even = function(n) {return n % 2 === 0;};
    var T = function() {return true;};

    it('returns true if all elements satisfy the predicate', function() {
        assert.equal(all(even, [2, 4, 6, 8, 10, 12]), true);
    });

    it('returns false if any element fails to satisfy the predicate', function() {
        assert.equal(all(even, [2, 4, 6, 8, 9, 10]), false);
    });

    it('returns true for an empty list', function() {
        assert.equal(all(T, []), true);
    });

    it('should short-circuit on first false value', function() {
        var count = 0;
        var test = function(n) {count++; return even(n);};
        var result = all(test, [2, 4, 6, 7, 8, 10]);
        assert(!result);
        assert.equal(count, 4);
    });

    it('should be aliased by `every`', function() {
        assert.equal(Lib.every(even, [2, 4, 6, 8, 10]), true);
        assert.strictEqual(Lib.every, all);
    });
});

describe("any", function() {
    var any = Lib.any;
    var odd = function(n) {return n % 2 === 1;};
    var T = function() {return true;};

    it('returns true if any element satisfies the predicate', function() {
        assert.equal(any(odd, [2, 4, 6, 8, 10, 11, 12]), true);
    });

    it('returns false if all elements fails to satisfy the predicate', function() {
        assert.equal(any(odd, [2, 4, 6, 8, 10, 12]), false);
    });

    it('works with more complex objects', function() {
        var people = [{first: 'Paul', last: 'Grenier'}, {first:'Mike', last: 'Hurley'}, {first: 'Will', last: 'Klein'}];
        var alliterative = function(person) {return person.first.charAt(0) === person.last.charAt(0);};
        assert.equal(any(alliterative, people), false);
        people.push({first: 'Scott', last: 'Sauyet'});
        assert.equal(any(alliterative, people), true);
    });

    it('can use a configurable function', function() {
        var teens = [{name: 'Alice', age: 14}, {name: 'Betty', age: 18}, {name: 'Cindy', age: 17}];
        var atLeast = function(age) {return function(person) {return person.age >= age;};};
        assert.equal(any(atLeast(16), teens), true, 'Some can legally drive');
        assert.equal(any(atLeast(21), teens), false, 'None can legally drink');
    });

    it('returns false for an empty list', function() {
        assert.equal(any(T, []), false);
    });

    it('should short-circuit on first true value', function() {
        var count = 0;
        var test = function(n) {count++; return odd(n);};
        var result = any(test, [2, 4, 6, 7, 8, 10]);
        assert(result);
        assert.equal(count, 4);
    });

    it('should be aliased by `some`', function() {
        assert.equal(Lib.some(odd, [2, 4, 6, 8, 10, 11, 12]), true);
        assert.strictEqual(Lib.some, any);
    });
});

