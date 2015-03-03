var assert = require('assert');

var R = require('..');


describe('partitionBy', function() {
    var isOdd = function(x) { return x % 2 === 1; };
    
    var l0 = [1, 1, 1, 2, 3, 4, 4, 4];
    
    it('partitions each time f returns a new value', function(){
        assert.deepEqual(R.partitionBy(isOdd, l0), [ [ 1, 1, 1 ], [ 2 ], [ 3 ], [ 4, 4, 4 ] ]);
        assert.deepEqual(R.partitionBy(R.eq(true), [false, true, false]), [[false], [true], [false]]);
    });
    
    it('handles empty lists', function(){
        assert.deepEqual(R.partitionBy(isOdd, []), []);
    });

    // var sumPipe = pipe(
    //     partition(isOdd),
    //     map(sum)
    // );
    // assert.equal(sumPipe(l0), [3,2,3,12]);
});
