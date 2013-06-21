var assert = require('assert');
var Lib = require('./../ramda');

describe('installTo', function() {
    it('can be exposed on arbitrary object', function() {
        var sheepda = {};
        Lib.installTo(sheepda);
        var times2 = function(x) {return x * 2;};
        assert.deepEqual(sheepda.map(times2, [1, 2, 3, 4]), [2, 4, 6, 8]);
    });
});

