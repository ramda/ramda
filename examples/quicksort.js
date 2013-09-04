var defaultComparator = function (a, b) {
    return (a < b) ? -1 : (a > b) ? 1 : 0;
};

// Imperative:

var quickSortImper = (function () {
    var swap = function (arr, a, b) {
        var tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    };

    var partition = function (array, begin, end, pivot, comparator) {
        var piv = array[pivot];
        swap(array, pivot, end - 1);
        var store = begin;
        var ix;
        for (ix = begin; ix < end - 1; ++ix) {
            if (piv != undefined && comparator(piv, array[ix]) >= 0) {
                swap(array, store, ix);
                ++store;
            }
        }
        swap(array, end - 1, store);

        return store;
    };

    var qsort = function (array, begin, end, comparator) {
        if (end - 1 > begin) {
            var pivot = begin + Math.floor(Math.random() * (end - begin));

            pivot = partition(array, begin, end, pivot, comparator);

            qsort(array, begin, pivot, comparator);
            qsort(array, pivot + 1, end, comparator);
        }
    };

    return function (array, comparator) {
        qsort(array, 0, array.length, comparator || defaultComparator);
        return array;
    };
}());

console.log(quickSortImper([2, 1, 2, 8, 6, 7, 5, 3, 0, 9]));

// Functional:


var combine = function() {
    return [].concat([].slice.call(arguments));;
};

var quickSortFunc = function(list, comparator) {
    if (list.length === 0) {return clone(list);}
    var first = head(list), rest = tail(list), compare = lPartial(comparator || defaultComparator, first);
    return combine( quickSortFunc(filter(compose(lte(0), compare), rest)),
                    first,
                    quickSortFunc(filter(compose(gt(0), compare), rest))
                  );
};

console.log(quickSortFunc([2, 1, 2, 8, 6, 7, 5, 3, 0, 9]));
