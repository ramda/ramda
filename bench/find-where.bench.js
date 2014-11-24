var _ = require('lodash');
var R = require('..');

var objs = [
    {x: [1, 2], y: true}, {x: [1, 3], y: true}, {x: [], y: false}, {x: [2], y: false},
    {x: [3], y: true}, {x: [1], y: true}, {x: [1, 2, 3], y: true}, {x: [], y: true},
    {x: [1, 2], y: false}, {x: [1, 3], y: true}
];
var findEmptyX = R.find(R.where({x: R.isEmpty}));
var findFalseY = R.find(R.where({y: false}));

module.exports = {
    name: 'find where',
    tests: {
        '_.find(objs, {x: []})': function() {
            _.find(objs, {x: []});
        },
        'find(where({x: isEmpty}), objs)': function() {
            R.find(R.where({x: R.isEmpty}), objs);
        },
        'find(where({x: isEmpty}))(objs)': function() {
            R.find(R.where({x: R.isEmpty}))(objs);
        },
        'findEmptyX(objs)': function() {
            findEmptyX(objs);
        },
        '_.find(objs, {y: false})': function() {
            _.find(objs, {y: false});
        },
        'find(where({y: false}), objs)': function() {
            R.find(R.where({y: false}), objs);
        },
        'find(where({y: false}))(objs)': function() {
            R.find(R.where({y: false}))(objs);
        },
        'findFalseY(objs)': function() {
            findFalseY(objs);
        }
    }
};
