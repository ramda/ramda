var _symbolIterator = require('./_symbolIterator');
var isArrayLike = require('../isArrayLike');
var keys = require('../keys');

module.exports = (function() {
    function ListIterable(list) {
        this.list = list;
    }
    ListIterable.prototype[_symbolIterator] = function() {
        var idx = -1;
        var list = this.list;
        return {
            next: function() {
                idx += 1;
                return idx >= list.length ? {done: true}
                                          : {done: false, value: list[idx]};
            }
        };
    };

    function ObjectIterable(obj) {
        this.obj = obj;
        this.keys = keys(obj).sort();
    }
    ObjectIterable.prototype[_symbolIterator] = function() {
        var idx = -1;
        var obj = this.obj;
        var keys = this.keys;
        return {
            next: function() {
                idx += 1;
                if (idx >= keys.length) {
                    return {done: true};
                }
                var key = keys[idx];
                return {done: false, value: [key, obj[key]]};
            }
        };
    };

    function IteratorIterable(iter) {
        this.iterator = iter;
    }
    IteratorIterable.prototype[_symbolIterator] = function() {
        return this.iterator;
    };

    return function _iterable(list) {
        if (typeof list[_symbolIterator] === 'function') {
            return list;
        }
        if (isArrayLike(list)) {
            return new ListIterable(list);
        }
        if (typeof list.next === 'function') {
            return new IteratorIterable(list);
        }
        return new ObjectIterable(list);
    };
})();
