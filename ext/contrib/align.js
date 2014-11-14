var R = require('../..');


/*  Returns a getter function that aligns two arrays as key->value via a match / comparator function
    A comparator function is supplied to extend flexibility for various use cases.

    // Example 1, humanize numbers via R.lte (less than or equal)
    
    var speeds = [30, 60, 90, 120, 150];
    var excitements = ['slow', 'moderate', 'fast', 'very fast', 'insane'];
    
    var humanizeSpeed = R.align(R.lte, speeds, excitements);
    
    humanizeSpeed(0)      // slow
    humanizeSpeed(33)     // moderate
    humanizeSpeed(60)     // fast
    humanizeSpeed(100)    // very fast
    
    
    // Example 2, key value via R.eq (equal)
    
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



R.align = function (compareFn, sourceArray, targetArray) {
    
  
    // Second Identity function, to be replaced by R.argN(2)
    function I2(x,y) { 
        return y; // return second arg
    };
    
    
    // IfComparator function builder
    //      Returns the value of 2nd array if comparator(*value of first array*) evaluates to true
    //      Otherwise returns undefined
         
    function returnIf(comparator) {
        return function(val) {
            return R.cond(comparator(val), I2, R.always(undefined));
        };
    }

    
    return function (value) {
        return(
            R.head( // take first match
                R.reject( // reject undefined
                    R.eq(undefined),
                    R.zipWith(returnIf(compareFn)(value), sourceArray, targetArray)
                )
            )
        );
    };
};


