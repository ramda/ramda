var R = require('..');

var defaultComparator = function(a, b) {
    return (a < b) ? -1 : (a > b) ? 1 : 0;
};

// Imperative:

var quickSortImper = (function() {
    var swap = function(list, a, b) {
        var tmp = list[a];
        list[a] = list[b];
        list[b] = tmp;
    };

    var partition = function(list, begin, end, pivot, comparator) {
        var piv = list[pivot];
        swap(list, pivot, end - 1);
        var store = begin;
        var ix;
        for (ix = begin; ix < end - 1; ++ix) {
            if (piv != null && comparator(piv, list[ix]) >= 0) {
                swap(list, store, ix);
                ++store;
            }
        }
        swap(list, end - 1, store);

        return store;
    };

    var qsort = function(list, begin, end, comparator) {
        if (end - 1 > begin) {
            var pivot = begin + Math.floor(Math.random() * (end - begin));

            pivot = partition(list, begin, end, pivot, comparator);

            qsort(list, begin, pivot, comparator);
            qsort(list, pivot + 1, end, comparator);
        }
    };

    return function(list, comparator) {
        qsort(list, 0, list.length, comparator || defaultComparator);
        return list;
    };
}());

console.log(quickSortImper([2, 1, 2, 8, 6, 7, 5, 3, 0, 9]));

// Functional:


var combine = function() {
    return [].concat([].slice.call(arguments));
};

var quickSortFunc = function(list, comparator) {
    if (list.length === 0) {return R.clone(list);}
    var first = R.head(list), rest = R.tail(list), compare = R.lPartial(comparator || defaultComparator, first);
    return combine(quickSortFunc(R.filter(R.compose(R.lte(0), compare), rest)),
                   first,
                   quickSortFunc(R.filter(R.compose(R.gt(0), compare), rest)));
};

console.log(quickSortFunc([2, 1, 2, 8, 6, 7, 5, 3, 0, 9]));
