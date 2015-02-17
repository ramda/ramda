var _ = require('lodash');
var R = require('../..');
var maxBy = R.maxBy;

var vals = _.chain(_.range(50, 500, 5))
            .shuffle()
            .map(function(val) {
                return {key: val, val: String.fromCharCode(val)};
            })
            .value();
var computer = R.prop('val');
var maxVal = maxBy(computer);

module.exports = {
    name: 'maxBy',
    tests: {
        '_.max': function() {
            _.max(vals, computer);
        },
        'maxBy(computer, nums)': function() {
            maxBy(computer, vals);
        },
        'maxBy(computer)(vals)': function() {
            maxBy(computer)(vals);
        },
        'maxVal(vals)': function() {
            maxVal(vals);
        }
    }
};
