var _ = require('lodash');
var each = require('..').each;

var nums = [8, 2, 85, 2, 34, 3, 23, 247, 57, 8, 0, 6, 5, 46, 54, 643];

module.exports = {
    name: 'each',
    tests: {
        '_.each(nums, x2)': function() {
            var result = [];
            _.each(nums, function(x) {
                result.push(x);
            });
        },
        'each(x2, nums)': function() {
            var result = [];
            each(function(x) { result.push(x); }, nums);
        },
        'each(x2)(nums)': function() {
            var result = [];
            each(function(x) { result.push(x); })(nums);
        }
    }
};
