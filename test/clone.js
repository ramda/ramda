var assert = require('assert');

var R = require('..');


describe('deep clone integers, strings and booleans', function() {
    it('clone integers', function() {
        assert.strictEqual(R.clone(-4), -4);
        assert.strictEqual(R.clone(9007199254740991), 9007199254740991);
    });

    it('clone floats', function() {
        assert.strictEqual(R.clone(-4.5), -4.5);
        assert.strictEqual(R.clone(0.0), 0.0);
    });

    it('clone strings', function() {
        assert.strictEqual(R.clone('ramda'), 'ramda');
    });

    it('clone booleans', function() {
        assert.strictEqual(R.clone(true), true);
    });
});

describe('deep clone objects', function() {
    it('clone shallow object', function() {
        var obj = {a: 1, b: 'ramda', c: true, d: new Date(2013, 11, 25)};
        var clone = R.clone(obj);
        obj.c = false;
        obj.d.setDate(31);
        assert.deepEqual(clone, {a: 1, b: 'ramda', c: true, d: new Date(2013, 11, 25)});
    });

    it('clone deep object', function() {
        var obj = {a: {b: {c: 'ramda'}}};
        var clone = R.clone(obj);
        obj.a.b.c = null;
        assert.deepEqual(clone, {a: {b: {c: 'ramda'}}});
    });

    it('clone objects with circular references', function() {
        var x = {c: null};
        var y = {a: x};
        var z = {b: y};
        x.c = z;
        var clone = R.clone(x);
        assert.ok(x !== clone);
        assert.ok(x.c !== clone.c);
        assert.ok(x.c.b !== clone.c.b);
        assert.ok(x.c.b.a !== clone.c.b.a);
        assert.ok(x.c.b.a.c !== clone.c.b.a.c);
        assert.deepEqual(R.keys(clone), R.keys(x));
        assert.deepEqual(R.keys(clone.c), R.keys(x.c));
        assert.deepEqual(R.keys(clone.c.b), R.keys(x.c.b));
        assert.deepEqual(R.keys(clone.c.b.a), R.keys(x.c.b.a));
        assert.deepEqual(R.keys(clone.c.b.a.c), R.keys(x.c.b.a.c));

        x.c.b = 1;
        assert.notDeepEqual(R.keys(clone.c.b), R.keys(x.c.b));
    });

    it('clone instances', function() {
        var Obj = function(x) {
            this.x = x;
        };
        Obj.prototype.get = function() {
            return this.x;
        };
        Obj.prototype.set = function(x) {
            this.x = x;
        };

        var obj = new Obj(10);
        assert.strictEqual(obj.get(), 10);

        var clone = R.clone(obj);
        assert.strictEqual(clone.get(), 10);

        assert.ok(obj !== clone);

        obj.set(11);
        assert.strictEqual(obj.get(), 11);
        assert.strictEqual(clone.get(), 10);
    });
});

describe('deep clone arrays', function() {
    it('clone shallow arrays', function() {
        var list = [1, 2, 3];
        var clone = R.clone(list);
        list.pop();
        assert.deepEqual(clone, [1, 2, 3]);
    });

    it('clone deep arrays', function() {
        var list = [1, [1, 2, 3], [[[5]]]];
        var clone = R.clone(list);

        assert.ok(list !== clone);
        assert.ok(list[2] !== clone[2]);
        assert.ok(list[2][0] !== clone[2][0]);

        assert.deepEqual(clone, [1, [1, 2, 3], [[[5]]]]);
    });
});

describe('deep `clone` functions', function() {
    it('keep reference to function', function() {
        var fn = function(x) { return x + x;};
        var list = [{a: fn}];

        var clone = R.clone(list);

        assert.strictEqual(clone[0].a(10), 20);
        assert.ok(list[0].a === clone[0].a);
    });
});

describe('deep clone Dates', function() {
    it('clone date', function() {
        var date = new Date(2014, 10, 14, 23, 59, 59, 999);

        var clone = R.clone(date);

        assert.ok(date !== clone);
        assert.deepEqual(clone.toString(), new Date(2014, 10, 14, 23, 59, 59, 999).toString());

        assert.strictEqual(clone.getDay(), 5); // friday
    });
});

describe('deep clone deep nested mixed objects', function() {
    it('clone array with objects', function() {
        var list = [{a: {b: 1}}, [{c: {d: 1}}]];
        var clone = R.clone(list);
        list[1][0] = null;
        assert.deepEqual(clone, [{a: {b: 1}}, [{c: {d: 1}}]]);
    });

    it('clone array with arrays', function() {
        var list = [[1], [[3]]];
        var clone = R.clone(list);
        list[1][0] = null;
        assert.deepEqual(clone, [[1], [[3]]]);
    });

    it('clone array with mutual ref object', function() {
        var obj = {a: 1};
        var list = [{b: obj}, {b: obj}];
        var clone = R.clone(list);

        assert.ok(list[0].b === list[1].b);
        assert.ok(clone[0].b === clone[1].b);
        assert.ok(clone[0].b !== list[0].b);
        assert.ok(clone[1].b !== list[1].b);

        assert.deepEqual(clone[0].b, {a:1});
        assert.deepEqual(clone[1].b, {a:1});

        obj.a = 2;
        assert.deepEqual(clone[0].b, {a:1});
        assert.deepEqual(clone[1].b, {a:1});
    });
});

describe('deep clone edge cases', function() {
    it('nulls, undefineds and empty objects and arrays', function() {
        assert.strictEqual(R.clone(null), null);
        assert.strictEqual(R.clone(undefined), undefined);
        assert.notStrictEqual(R.clone(undefined), null);

        var obj = {};
        assert.notStrictEqual(R.clone(obj), obj);

        var list = [];
        assert.notStrictEqual(R.clone(list), list);
    });
});
