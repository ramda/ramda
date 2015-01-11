var assert = require('assert');

var R = require('..');


describe('lens', function() {

    function getHead(obj) {
        return obj[0];
    }

    function setHead(val, obj) {
        return [val].concat(obj.slice(1));
    }

    function getPhrase(obj) {
        return obj.catchphrase;
    }

    function setPhrase(val, obj) {
        var out = R.clone(obj);
        out.catchphrase = val;
        return out;
    }

    var headOf = R.lens(getHead, setHead);
    var phraseLens = R.lens(getPhrase, setPhrase);

    it('returns a function with `set` and `map` properties', function() {
        assert(typeof phraseLens === 'function');
        assert(typeof phraseLens.set === 'function');
        assert(typeof phraseLens.map === 'function');
    });

    it('retrieves values from inside an object as defined by the `getter` function', function() {
        assert.strictEqual(headOf([10, 20, 30, 40]), 10);
        assert.strictEqual(headOf(['a', 'b', 'c', 'd']), 'a');
    });

    it('"sets" properties on an object and return the new object', function() {
        assert.deepEqual(headOf.set('cow', [1, 2, 3, 4]), ['cow', 2, 3, 4]);
    });

    it('the setter need not (should not) mutate the object', function() {
        var obj = {x: 100, y: 200, catchphrase: 'zing!'};
        assert.deepEqual(phraseLens.set('kapow!', obj), {x: 100, y: 200, catchphrase: 'kapow!'});
        assert.deepEqual(obj, {x: 100, y: 200, catchphrase: 'zing!'});
    });

    it('maps a property from getter to setter', function() {
        function plus10(x) { return x + 10; }
        assert.deepEqual(headOf.map(plus10, [-9, 2, 3]), [1, 2, 3]);
    });

    it('the modifier need not (should not) mutate the object', function() {
        var obj = {x: 100, y: 200, catchphrase: 'zing!'};
        function uc(s) { return s.toUpperCase(); }
        assert.deepEqual(phraseLens.map(uc, obj), {x: 100, y: 200, catchphrase: 'ZING!'});
        assert.deepEqual(obj, {x: 100, y: 200, catchphrase: 'zing!'});
    });

    it('curries map and set and modifies with composed lens', function() {
        var headPlus3 = R.compose(headOf.map(R.add(1)), headOf.map(R.add(2)));
        assert.deepEqual(headPlus3([-2, 2, 3]), [1, 2, 3]);
        var set0Plus1 = R.compose(headOf.map(R.add(1)), headOf.set(0));
        assert.deepEqual(set0Plus1([-2, 2, 3]), [1, 2, 3]);
        var mapHeadPlus3 = R.map(headPlus3);
        assert.deepEqual(mapHeadPlus3([[-2, 2, 3], [-1, 2, 3]]), [[1, 2, 3], [2, 2, 3]]);
    });

    it('is curried', function() {
        var get1 = function(x) { return x[1]; };
        var set1 = function(val, obj) {
            var out = obj.concat();
            out.splice(1, 1, val);
            return out;
        };
        var x2 = function(x) { return x * 2; };
        var partial = R.lens(get1);
        assert(typeof partial === 'function');
        assert(typeof partial(set1) === 'function');
        assert.deepEqual(partial(set1)(['zeroth', 'first', 'second']), 'first');
        assert.deepEqual(partial(set1)([10, 20, 30]), 20);
        assert.deepEqual(partial(set1).set('zoom', [10, 20, 30]), [10, 'zoom', 30]);
        assert.deepEqual(partial(set1).map(x2, [10, 20, 30]), [10, 40, 30]);
        assert.deepEqual(partial(set1).set('zoom')([10, 20, 30]), [10, 'zoom', 30]);
        assert.deepEqual(partial(set1).map(x2)([10, 20, 30]), [10, 40, 30]);
    });
});
