var assert = require('assert');
var R = require('..');

describe('prop', function() {
    var fred = {name: 'Fred', age: 23};

    it('returns a function that fetches the appropriate property', function() {
        var nm = R.prop('name');
        assert.equal(typeof nm, 'function');
        assert.equal(nm(fred), 'Fred');
    });

    it('is aliased by `get`', function() { // TODO: should it?
        assert.strictEqual(R.get, R.prop);
    });

    it('throws when called with no arguments', function() {
        assert.throws(R.prop, TypeError);
    });
});

describe('propOr', function() {
    var fred = {name: 'Fred', age: 23};
    var anon = {age: 99};

    var nm = R.propOr('name', 'Unknown');

    it('returns a function that fetches the appropriate property', function() {
        assert.equal(typeof nm, 'function');
        assert.equal(nm(fred), 'Fred');
    });

    it('returns the default value when the property does not exist', function() {
        assert.equal(nm(anon), 'Unknown');
    });

    it('does not return properties from the prototype chain', function() {
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

    it('returns a function that checks the appropriate property', function() {
        var nm = R.has('name');
        assert.equal(typeof nm, 'function');
        assert.equal(nm(fred), true);
        assert.equal(nm(anon), false);
    });

    it('does not check properties from the prototype chain', function() {
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

    it('returns a function that checks the appropriate property', function() {
        var nm = R.hasIn('name');
        assert.equal(typeof nm, 'function');
        assert.equal(nm(fred), true);
        assert.equal(nm(anon), false);
    });

    it('checks properties from the prototype chain', function() {
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
    it('returns a function that applies the appropriate function to the supplied object', function() {
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

    it('applies additional arguments to the function', function() {
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

    it('returns a function that maps the appropriate property over an array', function() {
        var nm = R.pluck('name');
        assert.equal(typeof nm, 'function');
        assert.deepEqual(nm(people), ['Fred', 'Wilma', 'Pebbles']);
    });
});

describe('propOf', function() {
    var fred = {name: 'Fred', age: 23, feet: 'large'};

    it('returns a function that fetches the appropriate properties from the initially supplied object', function() {
        var p = R.propOf(fred);

        assert.equal(p('name'), 'Fred');
        assert.equal(p('age'), 23);
        assert.equal(p('feet'), 'large');
        assert.equal(p('nonexistent'), undefined);
    });
});

describe('props', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('throws when called with no arguments', function() {
        assert.throws(R.props, TypeError);
    });

    it('returns empty array if no properties requested', function() {
        assert.deepEqual(R.props([], obj), []);
    });

    it('returns values for requested properties', function() {
        assert.deepEqual(R.props(['a', 'e'], obj), [1, 5]);
    });

    it('preserves order', function() {
        assert.deepEqual(R.props(['f', 'c', 'e'], obj), [6, 3, 5]);
    });

    it('returns undefined for nonexistent properties', function() {
        var ps = R.props(['a', 'nonexistent'], obj);
        assert.equal(ps.length, 2);
        assert.equal(ps[0], 1);
        assert.equal(ps[1], void 0);
    });

    it('is automatically curried', function() {
        assert.deepEqual(R.props(['a', 'b'])(obj), [1, 2]);
    });
});

describe('pick', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('copies the named properties of an object to the new object', function() {
        assert.deepEqual(R.pick(['a', 'c', 'f'], obj), {a: 1, c: 3, f: 6});
    });

    it('ignores properties not included', function() {
        assert.deepEqual(R.pick(['a', 'c', 'g'], obj), {a: 1, c: 3});
    });

    it('retrieves prototype properties', function() {
        var F = function(param) {this.x = param;};
        F.prototype.y = 40; F.prototype.z = 50;
        var obj = new F(30);
        obj.v = 10; obj.w = 20;
        assert.deepEqual(R.pick(['w', 'x', 'y'], obj), {w: 20, x: 30, y: 40});
    });

    it('is automatically curried', function() {
        var copyAB = R.pick(['a', 'b']);
        assert.deepEqual(copyAB(obj), {a: 1, b: 2});
    });
});

describe('omit', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('copies an object omitting the listed properties', function() {
        assert.deepEqual(R.omit(['a', 'c', 'f'], obj), {b: 2, d: 4, e: 5});
    });

    it('includes prototype properties', function() {
        var F = function(param) {this.x = param;};
        F.prototype.y = 40; F.prototype.z = 50;
        var obj = new F(30);
        obj.v = 10; obj.w = 20;
        assert.deepEqual(R.omit(['w', 'x', 'y'], obj), {v: 10, z: 50});
    });

    it('is automatically curried', function() {
        var skipAB = R.omit(['a', 'b']);
        assert.deepEqual(skipAB(obj), {c: 3, d: 4, e: 5, f: 6});
    });
});

describe('pickBy', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('creates a copy of the object', function() {
        assert.notEqual(R.pickBy(R.always(true), obj), obj);
    });

    it('when returning truthy, keeps the key', function() {
        assert.deepEqual(R.pickBy(R.alwaysTrue, obj), obj);
        assert.deepEqual(R.pickBy(R.always({}), obj), obj);
        assert.deepEqual(R.pickBy(R.always(1), obj), obj);
    });

    it('when returning falsy, keeps the key', function() {
        assert.deepEqual(R.pickBy(R.always(false), obj), {});
        assert.deepEqual(R.pickBy(R.always(0), obj), {});
        assert.deepEqual(R.pickBy(R.always(null), obj), {});
    });

    it('is called with (val,key,obj)', function() {
        assert.deepEqual(R.pickBy(function(val, key, _obj) {
            assert.equal(_obj, obj);
            return key === 'd' && val === 4;
        }, obj), {d: 4});
    });

    it('retrieves prototype properties', function() {
        var F = function(param) {this.x = param;};
        F.prototype.y = 40; F.prototype.z = 50;
        var obj = new F(30);
        obj.v = 10; obj.w = 20;
        assert.deepEqual(R.pickBy(function(val) {return val < 45;}, obj), {v: 10, w: 20, x: 30, y: 40});
    });


    it('is automatically curried', function() {
        var copier = R.pickBy(R.alwaysTrue);
        assert.deepEqual(copier(obj), obj);
    });
});


describe('pickAll', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};
    it('copies the named properties of an object to the new object', function() {
        assert.deepEqual(R.pickAll(['a', 'c', 'f'], obj), {a: 1, c: 3, f: 6});
    });

    it('includes properties not present on the input object', function() {
        assert.deepEqual(R.pickAll(['a', 'c', 'g'], obj), {a: 1, c: 3, g: undefined});
    });

    it('is automatically curried', function() {
        var copyAB = R.pickAll(['a', 'b']);
        assert.deepEqual(copyAB(obj), {a: 1, b: 2});
    });
});

describe('eqProps', function() {
    it('reports whether two objects have the same value for a given property', function() {
        assert.equal(R.eqProps('name', {name: 'fred', age: 10}, {name: 'fred', age: 12}), true);
        assert.equal(R.eqProps('name', {name: 'fred', age: 10}, {name: 'franny', age: 10}), false);
    });

    it('is automatically curried', function() {
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

    it('is true for an empty spec', function() {
        assert.equal(R.where({}, {a: 1}), true);
        assert.equal(R.where(null, {a: 1}), true);
    });

    it('reports true when the object equals the spec', function() {
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

    it('is not destructive', function() {
        var a = {w: 1, x: 2};
        var res = R.mixin(a, {x: 5});
        assert.notEqual(a, res);
        assert.deepEqual(res, {w: 1, x: 5});
    });

    it('reports only own properties', function() {
        var a = {w: 1, x: 2};
        function Cla() {}
        Cla.prototype.x = 5;
        assert.deepEqual(R.mixin(new Cla(), a), {w: 1, x: 2});
        assert.deepEqual(R.mixin(a, new Cla()), {w: 1, x: 2});
    });

    it('is curried', function() {
        var curried = R.mixin({w: 1, x: 2});
        var b = {y: 3, z: 4};
        assert.deepEqual(curried(b), {w: 1, x: 2, y: 3, z: 4});
    });
});

describe('assoc', function() {
    it('makes a shallow clone of an object, overriding only the specified property', function() {
        var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
        var obj2 = R.assoc('e', {x: 42}, obj1);
        assert.deepEqual(obj2, {a: 1, b: {c: 2, d: 3}, e: {x: 42}, f: 5});
        // Note: reference equality below!
        assert.equal(obj2.a, obj1.a);
        assert.equal(obj2.b, obj1.b);
        assert.equal(obj2.f, obj1.f);
    });

    it('is the equivalent of clone and set if the property is not on the original', function() {
        var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
        var obj2 = R.assoc('z', {x: 42}, obj1);
        assert.deepEqual(obj2, {a: 1, b: {c: 2, d: 3}, e: 4, f: 5, z: {x: 42}});
        // Note: reference equality below!
        assert.equal(obj2.a, obj1.a);
        assert.equal(obj2.b, obj1.b);
        assert.equal(obj2.f, obj1.f);
    });

    it('is properly curried', function() {
        var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
        var expected = {a: 1, b: {c: 2, d: 3}, e: {x: 42}, f: 5};
        var f = R.assoc('e');
        var g = f({x: 42});
        assert.deepEqual(f({x: 42}, obj1), expected);
        assert.deepEqual(g(obj1), expected);
    });
});

describe('assocPath', function() {
    it('makes a shallow clone of an object, overriding only what is necessary for the path', function() {
        var obj1 = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: 5, j: {k: 6, l: 7}}}, m: 8};
        var obj2 = R.assocPath('f.g.i', {x: 42}, obj1);
        assert.deepEqual(obj2,
            {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: {x: 42}, j: {k: 6, l: 7}}}, m: 8}
        );
        // Note: reference equality below!
        assert.equal(obj2.a, obj1.a);
        assert.equal(obj2.m, obj1.m);
        assert.equal(obj2.f.g.h, obj1.f.g.h);
        assert.equal(obj2.f.g.j, obj1.f.g.j);
    });

    it('is the equivalent of clone and setPath if the property is not on the original', function() {
        var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
        var obj2 = R.assocPath('x.y.z', {w: 42}, obj1);
        assert.deepEqual(obj2, {a: 1, b: {c: 2, d: 3}, e: 4, f: 5, x: {y: {z: {w: 42}}}});
        // Note: reference equality below!
        assert.equal(obj2.a, obj1.a);
        assert.equal(obj2.b, obj1.b);
        assert.equal(obj2.f, obj1.f);
    });

    it('is properly curried', function() {
        var obj1 = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: 5, j: {k: 6, l: 7}}}, m: 8};
        var expected = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: {x: 42}, j: {k: 6, l: 7}}}, m: 8};
        var f = R.assocPath('f.g.i');
        var g = f({x: 42});
        assert.deepEqual(f({x: 42}, obj1), expected);
        assert.deepEqual(g(obj1), expected);
    });
});
