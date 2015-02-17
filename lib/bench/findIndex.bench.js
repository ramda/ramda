var _ = require('lodash');
var findIndex = require('../..').findIndex;

var nums = [8, 2, 85, 2, 34, 3, 23, 247, 57, 8, 0, 6, 5, 46, 54, 643];
function isZero(x) { return x === 0; }
var findIndexZero = findIndex(isZero);

module.exports = {
    name: 'findIndex',
    tests: {
        '_.findIndex(nums, isZero)': function() {
            _.findIndex(nums, isZero);
        },
        'findIndex(isZero, nums)': function() {
            findIndex(isZero, nums);
        },
        'findIndex(isZero)(nums)': function() {
            findIndex(isZero)(nums);
        },
        'findIndexZero(nums)': function() {
            findIndexZero(nums);
        }
    }
};
