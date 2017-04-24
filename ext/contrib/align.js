var R = require('../..');


/*  Returns a getter function that aligns two arrays as key->value via a match / comparator function
    A comparator function is supplied to extend flexibility for various use cases.
    R.align(comparatorFunction, keyArray, valueArray) => returns a getter function

    // Example 1, humanize numbers via R.lte (less than or equal)

    var speeds = [30, 60, 90, 120, 150];
    var translations = ['slow', 'moderate', 'fast', 'very fast', 'insane'];

    var humanizeSpeed = R.align(R.lte, speeds, translations);

    humanizeSpeed(0)      // slow
    humanizeSpeed(33)     // moderate
    humanizeSpeed(60)     // fast
    humanizeSpeed(100)    // very fast


    // Example 2, key value via R.eq (equal)
    // Also works with null or undefined return values (though in case of undefined it's created by the ifComparator)

    var keys   = ['cookie', 'house', 'police', 'bank', {maybe: 'maybe}];
    var values = ['eat', 'sleep', 911, null, undefined];

    whatToDoWith = R.align(R.eq, keys, values);

    whatToDoWith('cookie')          // => 'eat'
    whatToDoWith('house' )          // => 'sleep'
    whatToDoWith('police')          // => '911'
    whatToDoWith('bank')            // =>  null
    whatToDoWith({maybe: 'maybe})   // =>  undefined

    // Example 3, usage with R.interpolate
    humanizeGrade = R.align(R.lte, R.interpolate(37,100, 5), ['F', 'D', 'C', 'B', 'A']);
    humanizeGrade(10) // => 'F'
    humanizeGrade(90) // => 'A'
*/




R.align = R.curryN(4, function(compareFn, sourceArray, targetArray, value) {
    return R.prop(
        R.findIndex(compareFn(value))(sourceArray)
    )(targetArray);
});


