var assert = require('assert');
var R = require('..');

describe('prop', function() {
    var fred = {name: 'Fred', age: 23};

    it('should return a function that fetches the appropriate property', function() {
        var nm = R.prop('name');
        assert.equal(typeof nm, 'function');
        assert.equal(nm(fred), 'Fred');
    });

    it('should be aliased by `get`', function() { // TODO: should it?
        assert.equal(R.get('age')(fred), 23);
        assert.strictEqual(R.get, R.prop);
    });

    it('should throw when called with no arguments', function() {
        assert.throws(R.prop, TypeError);
    });
});

describe('propOr', function() {
    var fred = {name: 'Fred', age: 23};
    var anon = {age: 99};

    var nm = R.propOr('name', 'Unknown');

    it('should return a function that fetches the appropriate property', function() {
        assert.equal(typeof nm, 'function');
        assert.equal(nm(fred), 'Fred');
    });

    it('should return the default value when the property does not exist', function() {
        assert.equal(nm(anon), 'Unknown');
    });

    it('should not return properties from the prototype chain', function() {
        var Person = function() {};
        Person.prototype.age = function() {};

        var bob = new Person();
        assert.equal(R.propOr('age', 100, bob), 100);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.propOr, TypeError);
    });
});

describe('has', function() {
    var fred = {name: 'Fred', age: 23};
    var anon = {age: 99};

    it('should return a function that checks the appropriate property', function() {
        var nm = R.has('name');
        assert.equal(typeof nm, 'function');
        assert.equal(nm(fred), true);
        assert.equal(nm(anon), false);
    });

    it('should not check properties from the prototype chain', function() {
        var Person = function() {};
        Person.prototype.age = function() {};

        var bob = new Person();
        assert.equal(R.has('age', bob), false);
    });

    it('works properly when called with two arguments', function() {
        assert.equal(R.has('name', fred), true);
        assert.equal(R.has('name', anon), false);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.has, TypeError);
    });
});

describe('hasIn', function() {
    var fred = {name: 'Fred', age: 23};
    var anon = {age: 99};

    it('should return a function that checks the appropriate property', function() {
        var nm = R.hasIn('name');
        assert.equal(typeof nm, 'function');
        assert.equal(nm(fred), true);
        assert.equal(nm(anon), false);
    });

    it('should check properties from the prototype chain', function() {
        var Person = function() {};
        Person.prototype.age = function() {};

        var bob = new Person();
        assert.equal(R.hasIn('age', bob), true);
    });

    it('works properly when called with two arguments', function() {
        assert.equal(R.hasIn('name', fred), true);
        assert.equal(R.hasIn('name', anon), false);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.hasIn, TypeError);
    });
});

describe('func', function() {
    it('should return a function that applies the appropriate function to the supplied object', function() {
        var fred = {first: 'Fred', last: 'Flintstone', getName: function() {
            return this.first + ' ' + this.last;
        }};
        var barney = {first: 'Barney', last: 'Rubble', getName: function() {
            return this.first + ' ' + this.last;
        }};
        var gName = R.func('getName');
        assert.equal(typeof gName, 'function');
        assert.equal(gName(fred), 'Fred Flintstone');
        assert.equal(gName(barney), 'Barney Rubble');
    });

    it('passes arguments appropriately when not curried', function() {
        assert.equal(R.func('add', R, 3, 6), 9);
    });

    it('invokes the function with no arguments when no extra params are supplied', function() {
        var obj = {f: function() { return 'called f'; }};
        assert.equal(R.func('f', obj), 'called f');
    });

    it('should apply additional arguments to the function', function() {
        var Point = function(x, y) {
            this.x = x;
            this.y = y;
        };
        Point.prototype.moveBy = function(dx, dy) {
            this.x += dx;
            this.y += dy;
        };
        var p1 = new Point(10, 20);


        var moveBy = R.func('moveBy');
        moveBy(p1, 5, 7);
        assert.equal(p1.x, 15);
        assert.equal(p1.y, 27);
    });

    it('throws if given no arguments', function() {
        assert.throws(function() { R.func(); });
    });
});

// TODO: This needs a better home than objectBasics
describe('pluck', function() {
    var people = [
        {name: 'Fred', age: 23},
        {name: 'Wilma', age: 21} ,
        {name: 'Pebbles', age: 2}
    ];

    it('should return a function that maps the appropriate property over an array', function() {
        var nm = R.pluck('name');
        assert.equal(typeof nm, 'function');
        assert.deepEqual(nm(people), ['Fred', 'Wilma', 'Pebbles']);
    });
});

describe('props', function() {
    var fred = {name: 'Fred', age: 23, feet: 'large'};

    it('should return a function that fetches the appropriate properties from the initially supplied object', function() {
        var p = R.props(fred);
        assert.equal(p('name'), 'Fred');
        assert.equal(p('age'), 23);
        assert.equal(p('feet'), 'large');
    });
});

describe('pick', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('should copy the named properties of an object to the new object', function() {
        assert.deepEqual(R.pick(['a', 'c', 'f'], obj), {a: 1, c: 3, f: 6});
    });
    it('should ignore properties not included', function() {
        assert.deepEqual(R.pick(['a', 'c', 'g'], obj), {a: 1, c: 3});
    });
    it('should be automatically curried', function() {
        var copyAB = R.pick(['a', 'b']);
        assert.deepEqual(copyAB(obj), {a: 1, b: 2});
    });
});

describe('omit', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('should copy an object omitting the listed properties', function() {
        assert.deepEqual(R.omit(['a', 'c', 'f'], obj), {b: 2, d: 4, e: 5});
    });

    it('should be automatically curried', function() {
        var skipAB = R.omit(['a', 'b']);
        assert.deepEqual(skipAB(obj), {c: 3, d: 4, e: 5, f: 6});
    });
});

describe('pickWith', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('should create a copy of the object', function() {
        assert.notEqual(R.pickWith(R.always(true), obj), obj);
    });
    it('returning truthy keeps the key', function() {
        assert.deepEqual(R.pickWith(R.alwaysTrue, obj), obj);
        assert.deepEqual(R.pickWith(R.always({}), obj), obj);
        assert.deepEqual(R.pickWith(R.always(1), obj), obj);
    });
    it('returning falsy keeps the key', function() {
        assert.deepEqual(R.pickWith(R.always(false), obj), {});
        assert.deepEqual(R.pickWith(R.always(0), obj), {});
        assert.deepEqual(R.pickWith(R.always(null), obj), {});
    });
    it('should be called with (val,key,obj)', function() {
        assert.deepEqual(R.pickWith(function(val, key, _obj) {
            assert.equal(_obj, obj);
            return key === 'd' && val === 4;
        }, obj), {d: 4});
    });
    it('should be automatically curried', function() {
        var copier = R.pickWith(R.alwaysTrue);
        assert.deepEqual(copier(obj), obj);
    });
});


describe('pickAll', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};
    it('should copy the named properties of an object to the new object', function() {
        assert.deepEqual(R.pickAll(['a', 'c', 'f'], obj), {a: 1, c: 3, f: 6});
    });
    it('should include properties not present on the input object', function() {
        assert.deepEqual(R.pickAll(['a', 'c', 'g'], obj), {a: 1, c: 3, g: undefined});
    });
    it('should be automatically curried', function() {
        var copyAB = R.pickAll(['a', 'b']);
        assert.deepEqual(copyAB(obj), {a: 1, b: 2});
    });
});

describe('eqProps', function() {
    it('reports whether two objects have the same value for a given property', function() {
        assert.equal(R.eqProps('name', {name: 'fred', age: 10}, {name: 'fred', age: 12}), true);
        assert.equal(R.eqProps('name', {name: 'fred', age: 10}, {name: 'franny', age: 10}), false);
    });
    it('should be automatically curried', function() {
        var sameName = R.eqProps('name');
        assert.equal(sameName({name: 'fred', age: 10}, {name: 'fred', age: 12}), true);
    });
});

describe('where', function() {
    it('takes a spec and a test object and returns true if the test object satisfies the spec', function() {

        var spec = {x: 1, y: 2};
        var test1 = {x: 0, y: 200};
        var test2 = {x: 0, y: 10};
        var test3 = {x: 1, y: 101};
        var test4 = {x: 1, y: 2};
        assert.equal(R.where(spec, test1), false);
        assert.equal(R.where(spec, test2), false);
        assert.equal(R.where(spec, test3), false);
        assert.equal(R.where(spec, test4), true);
    });

    it('calls any functions in the spec against the test object value for that property', function() {
        var spec = {
            a: function(a, obj) {
                return a < obj.b + obj.c;
            },
            b: function(b, obj) {
                return b < obj.a + obj.c;
            },
            c: function(c, obj) {
                return c < obj.a + obj.b;
            }
        };
        var test1 = {a: 3, b: 4, c: 5};
        var test2 = {a: 6, b: 8, c: 9};
        var test3 = {a: 2, b: 8, c: 12};
        var test4 = {a: 3, b: 11, c: 5};

        assert.equal(R.where(spec, test1), true);
        assert.equal(R.where(spec, test2), true);
        assert.equal(R.where(spec, test3), false);
        assert.equal(R.where(spec, test4), false);
    });

    it('does not need the spec and the test object to have the same interface (the test object will have a superset of the specs properties)', function() {
        var spec = {x: 100};
        var test1 = {x: 20, y: 100, z: 100};
        var test2 = {w: 1, x: 100, y: 100, z: 100};

        assert.equal(R.where(spec, test1), false);
        assert.equal(R.where(spec, test2), true);
    });

    it('is false if the test object is null-ish', function() {
        var spec = {x: 200};
        var testN = null;
        var testU;
        var testF = false;
        assert.equal(R.where(spec, testN), false);
        assert.equal(R.where(spec, testU), false);
        assert.equal(R.where(spec, testF), false);
    });

    it('matches specs that have undefined properties', function() {
        var spec = {x: undefined};
//      var test1 = {};
        var test2 = {x: null};
        var test3 = {x: undefined};
        var test4 = {x: 1};
//      assert.equal(R.where(spec, test1), false);    // TODO: discuss Scott's objections
        assert.equal(R.where(spec, test2), false);
        assert.equal(R.where(spec, test3), true);
        assert.equal(R.where(spec, test4), false);
    });

    it('is automatically curried', function() {
        var predicate = R.where({x: 1, y: 2});
        assert.equal(predicate({x: 1, y: 2, z: 3}), true);
        assert.equal(predicate({x: 3, y: 2, z: 1}), false);
    });

    it('empty spec is true', function() {
        assert.equal(R.where({}, {a: 1}), true);
        assert.equal(R.where(null, {a: 1}), true);
    });

    it('equal objects are true', function() {
        assert.equal(R.where(R, R), true);
    });

    function Parent() {
        this.y = 6;
    }
    Parent.prototype.a = undefined;
    Parent.prototype.x = 5;
    var parent = new Parent();

    it('matches inherited functions', function() {
        var spec = {
            toString: R.alwaysTrue
        };
        assert.equal(R.where(spec, {}), true);
        assert.equal(R.where(spec, {a: 1}), true);
        assert.equal(R.where(spec, {toString: 1}), true);
        assert.equal(R.where({a: R.alwaysTrue}, {x: 1}), false);
    });

    it('matches inherited props', function() {
        assert.equal(R.where({y: 6}, parent), true);
        assert.equal(R.where({x: 5}, parent), true);
        assert.equal(R.where({x: 5, y: 6}, parent), true);
        assert.equal(R.where({x: 4, y: 6}, parent), false);
    });

    it('doesnt match inherited spec', function() {
        assert.equal(R.where(parent, {y: 6}), true);
        assert.equal(R.where(parent, {x: 5}), false);
    });

    it('throws if given no arguments', function() {
        assert.throws(R.where, TypeError);
    });

});

describe('mixin', function() {
    it('takes two objects, merges their own properties and returns a new object', function() {
        var a = {w: 1, x: 2};
        var b = {y: 3, z: 4};
        assert.deepEqual(R.mixin(a, b), {w: 1, x: 2, y: 3, z: 4});
    });

    it('overrides properties in the first object with properties in the second object', function() {
        var a = {w: 1, x: 2};
        var b = {w: 100, y: 3, z: 4};
        assert.deepEqual(R.mixin(a, b), {w: 100, x: 2, y: 3, z: 4});
    });

    it('should not be destructive', function() {
        var a = {w: 1, x: 2};
        var res = R.mixin(a, {x: 5});
        assert.notEqual(a, res);
        assert.deepEqual(res, {w: 1, x: 5});
    });

    it('only own properties', function() {
        var a = {w: 1, x: 2};
        function Cla() {}
        Cla.prototype.x = 5;
        assert.deepEqual(R.mixin(new Cla(), a), {w: 1, x: 2});
        assert.deepEqual(R.mixin(a, new Cla()), {w: 1, x: 2});
    });

    it('outta be curried', function() {
        var curried = R.mixin({w: 1, x: 2});
        var b = {y: 3, z: 4};
        assert.deepEqual(curried(b), {w: 1, x: 2, y: 3, z: 4});
    });
});
