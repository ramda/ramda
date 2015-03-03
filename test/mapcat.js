var assert = require('assert');

var R = require('..');


describe('mapcat', function() {
    
    it('maps and concatenates', function(){
        var reSplit = R.curry(function(re, s) {
            var matches = s.match(re);
            return matches ? matches.slice(1) : [s];
        });
        assert.deepEqual(R.mapcat(R.reverse, [[3, 2, 1, 0], [6, 5, 4], [9, 8, 7]]), [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
        assert.deepEqual(R.mapcat(reSplit(/^(.+)\d+(.+)$/), ["aa1bb", "cc2dd", "ee3ff"]), ["aa", "bb", "cc", "dd", "ee", "ff"]);
    });
    
    it('handles empty lists', function(){
        assert.deepEqual(R.mapcat(R.add, []), []);
    });
});
