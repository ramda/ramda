var _ = require('lodash');
var foldl = require('..').foldl;
var nums = [8, 2, 85, 2, 34, 3, 23, 247, 57, 8, 0, 6, 5, 46, 54, 643];
function add(acc, x) { return acc + x; }
var foldlAdd = foldl(add, 0);

module.exports = {
    name: 'foldl',
    tests: {
        '_.reduce(nums, add, 0)': function() {
            _.reduce(nums, add, 0);
        },
        'foldl(add, 0, nums)': function() {
            foldl(add, 0, nums);
        },
        'foldl(add, 0)(nums)': function() {
            foldl(add, 0)(nums);
        },
        'foldlAdd(nums)': function() {
            foldlAdd(nums);
        }
    }
};
