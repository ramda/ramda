var assert = require('assert');
var Lib = require('./../ramda');

describe('prop', function() {
    var prop = Lib.prop;
    var fred = {name: 'Fred', age:23};

    it('should return a function that fetches the appropriate property', function() {
        var nm = prop('name');
        assert.equal(typeof nm, 'function');
        assert.equal(nm(fred), 'Fred');
    });

    it('should be aliased by `get`', function() { // TODO: should it?
        assert.equal(Lib.get('age')(fred), 23);
        assert.strictEqual(Lib.get, prop);
    });
});

describe('func', function() {
    var func = Lib.func;

    it('should return a function that applies the appropriate function to the supplied object', function() {
        var fred = {first: 'Fred', last: 'Flintstone', getName: function() {return this.first + ' ' + this.last;}};
        var barney = {first: 'Barney', last: 'Rubble', getName: function() {return this.first + ' ' + this.last;}};
        var gName = func('getName');
        assert.equal(typeof gName, 'function');
        assert.equal(gName(fred), 'Fred Flintstone');
        assert.equal(gName(barney), 'Barney Rubble');
    });

    it('should apply additional arguments to the function', function() {
        var Point = function(x, y) {this.x = x; this.y = y;};
        Point.prototype.moveBy = function(dx, dy) {this.x += dx; this.y += dy;};
        var p1 = new Point(10, 20);
        var moveBy = func('moveBy');
        moveBy(p1, 5, 7);
        assert.equal(p1.x, 15);
        assert.equal(p1.y, 27);
    });
});

// TODO: This needs a better home than objectBasics
describe('pluck', function() {
    var pluck = Lib.pluck;
    var people = [{name: 'Fred', age: 23}, {name: 'Wilma', age: 21} , {name: 'Pebbles', age: 2}];

    it('should return a function that maps the appropriate property over an array', function() {
        var nm = pluck('name');
        assert.equal(typeof nm, 'function');
        assert.deepEqual(nm(people), ['Fred', 'Wilma', 'Pebbles']);
    });
});

describe('props', function() {
    var props = Lib.props;
    var fred = {name: 'Fred', age: 23, feet: 'large'};

    it('should return a function that fetches the appropriate properties from the initially supplied object', function() {
        var p = props(fred);
        assert.equal(p('name'), 'Fred');
        assert.equal(p('age'), 23);
        assert.equal(p('feet'), 'large');
    });
});

describe('pick', function() {
    var pick = Lib.pick;
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};
    it('should copy the named properties of an object to the new object', function() {
        assert.deepEqual(pick(['a', 'c', 'f'], obj), {a: 1, c: 3, f: 6});
    });
    it('should ignore properties not included', function() {
        assert.deepEqual(pick(['a', 'c', 'g'], obj), {a: 1, c: 3});
    });
    it('should be automatically curried', function() {
        var copyAB = pick(['a', 'b']);
        assert.deepEqual(copyAB(obj), {a: 1, b: 2});
    });
});


describe('pickAll', function() {
    var pickAll = Lib.pickAll;
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};
    it('should copy the named properties of an object to the new object', function() {
        assert.deepEqual(pickAll(['a', 'c', 'f'], obj), {a: 1, c: 3, f: 6});
    });
    it('should include properties not present on the input object', function() {
        assert.deepEqual(pickAll(['a', 'c', 'g'], obj), {a: 1, c: 3, g: undefined});
    });
    it('should be automatically curried', function() {
        var copyAB = pickAll(['a', 'b']);
        assert.deepEqual(copyAB(obj), {a: 1, b: 2});
    });
});

describe('omit', function() {
    var omit = Lib.omit;
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};
    it('should copy an object omitting the listed properties', function() {
        assert.deepEqual(omit(['a', 'c', 'f'], obj), {b: 2, d: 4, e: 5});
    });
    it('should be automatically curried', function() {
        var skipAB = omit(['a', 'b']);
        assert.deepEqual(skipAB(obj), {c: 3, d: 4, e: 5, f: 6});
    });
});
