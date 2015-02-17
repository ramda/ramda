var _ = require('lodash');
var reduce = require('../..').reduce;
var nums = [8, 2, 85, 2, 34, 3, 23, 247, 57, 8, 0, 6, 5, 46, 54, 643];
function add(acc, x) { return acc + x; }
var reduceAdd = reduce(add, 0);

module.exports = {
    name: 'reduce',
    tests: {
        '_.reduce(nums, add, 0)': function() {
            _.reduce(nums, add, 0);
        },
        'reduce(add, 0, nums)': function() {
            reduce(add, 0, nums);
        },
        'reduce(add, 0)(nums)': function() {
            reduce(add, 0)(nums);
        },
        'reduceAdd(nums)': function() {
            reduceAdd(nums);
        }
    }
};
