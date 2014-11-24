var _ = require('lodash');
var forEach = require('..').forEach;

var nums = [8, 2, 85, 2, 34, 3, 23, 247, 57, 8, 0, 6, 5, 46, 54, 643];

module.exports = {
    name: 'forEach',
    tests: {
        '_.each(nums, x2)': function() {
            var result = [];
            _.each(nums, function(x) {
                result.push(x);
            });
        },
        'forEach(x2, nums)': function() {
            var result = [];
            forEach(function(x) { result.push(x); }, nums);
        },
        'forEach(x2)(nums)': function() {
            var result = [];
            forEach(function(x) { result.push(x); })(nums);
        }
    }
};
