var isSet = require('../..').isSet;

var unsortedBag = [8, 2, 85, 2, 34, 3, 23, 247, 57, 8, 0, 6, 5, 46, 54, 643];
var unsortedSet = [8, 2, 85, 34, 3, 23, 247, 57, 8, 0, 6, 5, 46, 54, 643];
var sortedSet = unsortedSet.sort();
var sortedBag = unsortedBag.sort();

module.exports = {
    name: 'isSet',
    tests: {
        'isSet(unsortedBag)': function() {
            isSet(unsortedBag);
        },
        'isSet(unsortedSet)': function() {
            isSet(unsortedSet);
        },
        'isSet(sortedBag)': function() {
            isSet(sortedBag);
        },
        'isSet(sortedSet)': function() {
            isSet(sortedSet);
        },
    }
};
