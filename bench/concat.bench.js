var _ = require('lodash');
var concat = require('..').concat;

var s1 = [8, 2, 85, 2, 34, 3, 23];
var s2 = [247, 57, 8, 0, 6, 5, 46, 54, 643];
var concatS1 = concat(s1);

module.exports = {
    name: 'concat',
    tests: {
        '_.concat': function() {
            _.concat(s1, s2);
        },
        'concat(s1, s2)': function() {
            concat(s1, s2);
        },
        'concat(s1)(s2)': function() {
            concat(s1)(s2);
        },
        'concatS1(s1)': function() {
            concatS1(s2);
        }
    }
};
