var _ = require('lodash');
var curry = require('../..').curry;

function mult(x, y) { return x * y; }
var mult4 = curry(mult)(4);
var _x4 = _.partial(mult, 4);
function manmult(x) {
    return function(y) {
        return x * y;
    };
}
var manual = manmult(4);

module.exports = {
    name: 'curry',
    tests: {
        '_x4(100)': function() {
            _x4(100);
        },
        'mult4(100)': function() {
            mult4(100);
        },
        'manual(100)': function() {
            manual(100);
        }
    }
};
