var _ = require('lodash');
var filter = require('../..').filter;

var nums = [8, 2, 85, 2, 34, 3, 23, 247, 57, 8, 0, 6, 5, 46, 54, 643];
function isEven(x) { return x % 2 === 0; }
var filterEven = filter(isEven);

module.exports = {
    name: 'filter',
    tests: {
        '_.filter(nums, isEven)': function() {
            _.filter(nums, isEven);
        },
        'filter(isEven, nums)': function() {
            filter(isEven, nums);
        },
        'filter(isEven)(nums)': function() {
            filter(isEven)(nums);
        },
        'filterEven(nums)': function() {
            filterEven(nums);
        }
    }
};
