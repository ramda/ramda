var _ = require('lodash');
var R = require('..');
var maxWith = R.maxWith;

var vals = _.chain(_.range(50, 500, 5))
            .shuffle()
            .map(function(val) {
                return {key: val, val: String.fromCharCode(val)};
            })
            .value();
var computer = R.prop('val');
var maxVal = maxWith(computer);

module.exports = {
    name: 'maxWith',
    tests: {
        '_.max': function() {
            _.max(vals, computer);
        },
        'maxWith(computer, nums)': function() {
            maxWith(computer, vals);
        },
        'maxWith(computer)(vals)': function() {
            maxWith(computer)(vals);
        },
        'maxVal(vals)': function() {
            maxVal(vals);
        }
    }
};
