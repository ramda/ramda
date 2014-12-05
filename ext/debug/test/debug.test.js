var R = require('../../..');

describe('curry', function() {
    function source(a, b, c) {
        return a * b * c;
    }
    var curried = R.curry(source);
    void curried;
});
