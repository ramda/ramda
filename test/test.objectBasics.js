var assert = require('assert');
var R = require('./../ramda');

describe('prop', function () {
    var prop = R.prop;
    var fred = {name: 'Fred', age: 23};

    it('should return a function that fetches the appropriate property', function () {
        var nm = prop('name');
        assert.equal(typeof nm, 'function');
        assert.equal(nm(fred), 'Fred');
    });

    it('should be aliased by `get`', function () { // TODO: should it?
        assert.equal(R.get('age')(fred), 23);
        assert.strictEqual(R.get, prop);
    });
});

describe('func', function () {
    var func = R.func;

    it('should return a function that applies the appropriate function to the supplied object', function () {
        var fred = {first: 'Fred', last: 'Flintstone', getName: function () {
            return this.first + ' ' + this.last;
        }};
        var barney = {first: 'Barney', last: 'Rubble', getName: function () {
            return this.first + ' ' + this.last;
        }};
        var gName = func('getName');
        assert.equal(typeof gName, 'function');
        assert.equal(gName(fred), 'Fred Flintstone');
        assert.equal(gName(barney), 'Barney Rubble');
    });

    it('should apply additional arguments to the function', function () {
        var Point = function (x, y) {
            this.x = x;
            this.y = y;
        };
        Point.prototype.moveBy = function (dx, dy) {
            this.x += dx;
            this.y += dy;
        };
        var p1 = new Point(10, 20);
        var moveBy = func('moveBy');
        moveBy(p1, 5, 7);
        assert.equal(p1.x, 15);
        assert.equal(p1.y, 27);
    });
});

// TODO: This needs a better home than objectBasics
describe('pluck', function () {
    var pluck = R.pluck;
    var people = [
        {name: 'Fred', age: 23},
        {name: 'Wilma', age: 21} ,
        {name: 'Pebbles', age: 2}
    ];

    it('should return a function that maps the appropriate property over an array', function () {
        var nm = pluck('name');
        assert.equal(typeof nm, 'function');
        assert.deepEqual(nm(people), ['Fred', 'Wilma', 'Pebbles']);
    });
});

describe('props', function () {
    var props = R.props;
    var fred = {name: 'Fred', age: 23, feet: 'large'};

    it('should return a function that fetches the appropriate properties from the initially supplied object', function () {
        var p = props(fred);
        assert.equal(p('name'), 'Fred');
        assert.equal(p('age'), 23);
        assert.equal(p('feet'), 'large');
    });
});

describe('pick', function () {
    var pick = R.pick;
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('should copy the named properties of an object to the new object', function () {
        assert.deepEqual(pick(['a', 'c', 'f'], obj), {a: 1, c: 3, f: 6});
    });
    it('should ignore properties not included', function () {
        assert.deepEqual(pick(['a', 'c', 'g'], obj), {a: 1, c: 3});
    });
    it('should be automatically curried', function () {
        var copyAB = pick(['a', 'b']);
        assert.deepEqual(copyAB(obj), {a: 1, b: 2});
    });
});

describe('omit', function () {
    var omit = R.omit;
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('should copy an object omitting the listed properties', function () {
        assert.deepEqual(omit(['a', 'c', 'f'], obj), {b: 2, d: 4, e: 5});
    });

    it('should be automatically curried', function () {
        var skipAB = omit(['a', 'b']);
        assert.deepEqual(skipAB(obj), {c: 3, d: 4, e: 5, f: 6});
    });
});

describe('pickWith', function() {
    var pickWith = R.pickWith;
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('should create a copy of the object', function() {
        assert.notEqual(pickWith(R.always(true), obj), obj);
    });
    it('returning truthy keeps the key', function() {
        assert.deepEqual(pickWith(R.alwaysTrue, obj), obj);
        assert.deepEqual(pickWith(R.always({}), obj), obj);
        assert.deepEqual(pickWith(R.always(1), obj), obj);
    });
    it('returning falsy keeps the key', function() {
        assert.deepEqual(pickWith(R.always(false), obj), {});
        assert.deepEqual(pickWith(R.always(0), obj), {});
        assert.deepEqual(pickWith(R.always(null), obj), {});
    });
    it('should be called with (val,key,obj)', function() {
        assert.deepEqual(pickWith(function(val, key, _obj) {
            assert.equal(_obj, obj);
            return key === 'd' && val === 4;
        }, obj), {d: 4});
    });
    it('should be automatically curried', function () {
        var copier = pickWith(R.alwaysTrue);
        assert.deepEqual(copier(obj), obj);
    });
});


describe('pickAll', function () {
    var pickAll = R.pickAll;
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};
    it('should copy the named properties of an object to the new object', function () {
        assert.deepEqual(pickAll(['a', 'c', 'f'], obj), {a: 1, c: 3, f: 6});
    });
    it('should include properties not present on the input object', function () {
        assert.deepEqual(pickAll(['a', 'c', 'g'], obj), {a: 1, c: 3, g: undefined});
    });
    it('should be automatically curried', function () {
        var copyAB = pickAll(['a', 'b']);
        assert.deepEqual(copyAB(obj), {a: 1, b: 2});
    });
});

describe('eqProps', function () {
    var eqProps = R.eqProps;
    it('reports whether two objects have the same value for a given property', function () {
        assert.equal(eqProps('name', {name: 'fred', age: 10}, {name: 'fred', age: 12}), true);
        assert.equal(eqProps('name', {name: 'fred', age: 10}, {name: 'franny', age: 10}), false);
    });
    it('should be automatically curried', function () {
        var sameName = eqProps('name');
        assert.equal(sameName({name: 'fred', age: 10}, {name: 'fred', age: 12}), true);
    });
});

describe('where', function () {
    var where = R.where;
    it('takes a spec and a test object and returns true if the test object satisfies the spec', function () {

        var spec = {x: 1, y: 2};
        var test1 = {x: 0, y: 200};
        var test2 = {x: 0, y: 10};
        var test3 = {x: 1, y: 101};
        var test4 = {x: 1, y: 2};
        assert.equal(where(spec, test1), false);
        assert.equal(where(spec, test2), false);
        assert.equal(where(spec, test3), false);
        assert.equal(where(spec, test4), true);
    });

    it('calls any functions in the spec against the test object value for that property', function () {
        var spec = {
            a: function (a, obj) {
                return a < obj.b + obj.c;
            },
            b: function (b, obj) {
                return b < obj.a + obj.c;
            },
            c: function (c, obj) {
                return c < obj.a + obj.b;
            }
        };
        var test1 = {a: 3, b: 4, c: 5};
        var test2 = {a: 6, b: 8, c: 9};
        var test3 = {a: 2, b: 8, c: 12};
        var test4 = {a: 3, b: 11, c: 5};

        assert.equal(where(spec, test1), true);
        assert.equal(where(spec, test2), true);
        assert.equal(where(spec, test3), false);
        assert.equal(where(spec, test4), false);
    });

    it('does not need the spec and the test object to have the same interface (the test object will have a superset of the specs properties)', function () {
        var spec = {x: 100};
        var test1 = {x: 20, y: 100, z: 100};
        var test2 = {w: 1, x: 100, y: 100, z: 100};

        assert.equal(where(spec, test1), false);
        assert.equal(where(spec, test2), true);
    });

    it('is false if the test object is null-ish', function () {
        var spec = {x: 200};
        var testN = null;
        var testU = undefined;
        var testF = false;
        assert.equal(where(spec, testN), false);
        assert.equal(where(spec, testU), false);
        assert.equal(where(spec, testF), false);
    });

    it('matches specs that have undefined properties', function () {
        var spec = {x: undefined};
        var test1 = {};
        var test2 = {x: null};
        var test3 = {x: undefined};
        var test4 = {x: 1};
        //assert.equal(where(spec, test1), false);    // TODO: discuss Scott's objections
        assert.equal(where(spec, test2), false);
        assert.equal(where(spec, test3), true);
        assert.equal(where(spec, test4), false);
    });

    it('is automatically curried', function () {
        var predicate = where({x: 1, y: 2});
        assert.equal(predicate({x: 1, y: 2, z: 3}), true);
        assert.equal(predicate({x: 3, y: 2, z: 1}), false);
    });

    it('empty spec is true', function() {
        assert.equal(where({}, {a: 1}), true);
        assert.equal(where(null, {a: 1}), true);
    });

    it('equal objects are true', function() {
        assert.equal(where(R, R), true);
    });

    function Parent() {
        this.y = 6;
    }
    Parent.prototype.a = undefined;
    Parent.prototype.x = 5;
    var parent = new Parent();

    it('matches inherited functions', function () {
        var spec = {
            toString: R.alwaysTrue
        };
        assert.equal(where(spec, {}), true);
        assert.equal(where(spec, {a: 1}), true);
        assert.equal(where(spec, {toString: 1}), true);
        assert.equal(where({a: R.alwaysTrue}, {x: 1}), false);
    });

    it('matches inherited props', function () {
        assert.equal(where({y: 6}, parent), true);
        assert.equal(where({x: 5}, parent), true);
        assert.equal(where({x: 5, y: 6}, parent), true);
        assert.equal(where({x: 4, y: 6}, parent), false);
    });

    it('doesnt match inherited spec', function() {
        assert.equal(where(parent, {y: 6}), true);
        assert.equal(where(parent, {x: 5}), false);
    });

});

describe('mixin', function () {
    var mixin = R.mixin;

    it('takes two objects, merges their own properties and returns a new object', function () {
        var a = {w: 1, x: 2};
        var b = {y: 3, z: 4};
        assert.deepEqual(mixin(a, b), {w: 1, x: 2, y: 3, z: 4});
    });

    it('overrides properties in the first object with properties in the second object', function () {
        var a = {w: 1, x: 2};
        var b = {w: 100, y: 3, z: 4};
        assert.deepEqual(mixin(a, b), {w: 100, x: 2, y: 3, z: 4});
    });

    it('should not be destructive', function() {
        var a = {w: 1, x: 2};
        var res = mixin(a, {x: 5});
        assert.notEqual(a, res);
        assert.deepEqual(res, {w: 1, x: 5});
    });

    it('only own properties', function() {
        var a = {w: 1, x: 2};
        function Cla() {}
        Cla.prototype.x = 5;
        assert.deepEqual(mixin(new Cla, a), {w: 1, x: 2});
        assert.deepEqual(mixin(a, new Cla), {w: 1, x: 2});
    });

    it('outta be curried', function () {
        var curried = mixin({w: 1, x: 2});
        var b = {y: 3, z: 4};
        assert.deepEqual(curried(b), {w: 1, x: 2, y: 3, z: 4});
    });
});
