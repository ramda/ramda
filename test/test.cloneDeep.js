var assert = require('assert');
var R = require('..');

describe('deep clone integers, strings and booleans', function() {
    it('clone integers', function() {
        assert.equal(-4, R.cloneDeep(-4));
        assert.equal(9007199254740991, R.cloneDeep(9007199254740991));
    });

    it('clone floats', function() {
        assert.equal(-4.5, R.cloneDeep(-4.5));
        assert.equal(0.0, R.cloneDeep(0.0));
    });

    it('clone strings', function() {
        assert.equal('ramda', R.cloneDeep('ramda'));
    });

    it('clone booleans', function() {
        assert.equal(true, R.cloneDeep(true));
    });
});

describe('deep clone objects', function() {
    it('clone shallow object', function() {
        var obj = {a: 1, b: 'ramda', c: true, d: new Date(2013, 11, 25)};
        var clone = R.cloneDeep(obj);
        obj.c = false;
        obj.d.setDate(31);
        assert.deepEqual({a: 1, b: 'ramda', c: true, d: new Date(2013, 11, 25)}, clone);
    });

    it('clone deep object', function() {
        var obj = {a: {b: {c: 'ramda'}}};
        var clone = R.cloneDeep(obj);
        obj.a.b.c = null;
        assert.deepEqual({a: {b: {c: 'ramda'}}}, clone);
    });

    it('clone objects with circular references', function() {
        var x = {c: null};
        var y = {a: x};
        var z = {b: y};
        x.c = z;
        var clone = R.cloneDeep(x);
        assert.ok(x !== clone);
        assert.ok(x.c !== clone.c);
        assert.ok(x.c.b !== clone.c.b);
        assert.ok(x.c.b.a !== clone.c.b.a);
        assert.ok(x.c.b.a.c !== clone.c.b.a.c);
        assert.deepEqual(R.keys(x), R.keys(clone));
        assert.deepEqual(R.keys(x.c), R.keys(clone.c));
        assert.deepEqual(R.keys(x.c.b), R.keys(clone.c.b));
        assert.deepEqual(R.keys(x.c.b.a), R.keys(clone.c.b.a));
        assert.deepEqual(R.keys(x.c.b.a.c), R.keys(clone.c.b.a.c));

        x.c.b = 1;
        assert.notDeepEqual(R.keys(x.c.b), R.keys(clone.c.b));
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
        assert.equal(obj.get(), 10);

        var clone = R.cloneDeep(obj);
        assert.equal(clone.get(), 10);

        assert.ok(obj !== clone);

        obj.set(11);
        assert.equal(obj.get(), 11);
        assert.equal(clone.get(), 10);
    });
});

describe('deep clone arrays', function() {
    it('clone shallow arrays', function() {
        var list = [1, 2, 3];
        var clone = R.cloneDeep(list);
        list.pop();
        assert.deepEqual([1, 2, 3], clone);
    });

    it('clone deep arrays', function() {
        var list = [1, [1, 2, 3], [[[5]]]];
        var clone = R.cloneDeep(list);

        assert.ok(list !== clone);
        assert.ok(list[2] !== clone[2]);
        assert.ok(list[2][0] !== clone[2][0]);

        assert.deepEqual([1, [1, 2, 3], [[[5]]]], clone);
    });
});

describe('deep `clone` functions', function() {
    it('keep reference to function', function() {
        var fn = function(x) { return x + x;};
        var list = [{a: fn}];

        var clone = R.cloneDeep(list);

        assert.equal(clone[0].a(10), 20);
        assert.ok(list[0].a === clone[0].a);
    });
});

describe('deep clone Dates', function() {
    it('clone date', function() {
        var date = new Date(2014, 10, 14, 23, 59, 59, 999);

        var clone = R.cloneDeep(date);

        assert.ok(date !== clone);
        assert.deepEqual(new Date(2014, 10, 14, 23, 59, 59, 999).toString(), clone.toString());

        assert.equal(5, clone.getDay()); // friday
    });
});

describe('deep clone deep nested mixed objects', function() {
    it('clone array with objects', function() {
        var list = [{a: {b: 1}}, [{c: {d: 1}}]];
        var clone = R.cloneDeep(list);
        list[1][0] = null;
        assert.deepEqual([{a: {b: 1}}, [{c: {d: 1}}]], clone);
    });

    it('clone array with arrays', function() {
        var list = [[1], [[3]]];
        var clone = R.cloneDeep(list);
        list[1][0] = null;
        assert.deepEqual([[1], [[3]]], clone);
    });

    it('clone array with mutual ref object', function() {
        var obj = {a: 1};
        var list = [{b: obj}, {b: obj}];
        var clone = R.cloneDeep(list);

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
        assert.strictEqual(R.cloneDeep(null), null);
        assert.strictEqual(R.cloneDeep(undefined), undefined);
        assert.strictEqual(R.cloneDeep(), undefined);
        assert.notStrictEqual(R.cloneDeep(undefined), null);

        var obj = {};
        assert.notStrictEqual(obj, R.cloneDeep(obj));

        var list = [];
        assert.notStrictEqual(list, R.cloneDeep(list));
    });
});
