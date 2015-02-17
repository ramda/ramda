var _ = require('lodash');
var R = require('../..');

var objs = [
    {x: [1, 2], y: true}, {x: [1, 3], y: true}, {x: [], y: false}, {x: [2], y: false},
    {x: [3], y: true}, {x: [1], y: true}, {x: [1, 2, 3], y: true}, {x: [], y: true},
    {x: [1, 2], y: false}, {x: [1, 3], y: true}
];
var filterEmptyX = R.filter(R.where({x: R.isEmpty}));
var filterFalseY = R.filter(R.where({y: false}));

module.exports = {
    name: 'filter where',
    tests: {
        '_.filter(objs, {x: []})': function() {
            _.filter(objs, {x: []});
        },
        'filter(where({x: isEmpty}), objs)': function() {
            R.filter(R.where({x: R.isEmpty}), objs);
        },
        'filter(where({x: isEmpty}))(objs)': function() {
            R.filter(R.where({x: R.isEmpty}))(objs);
        },
        'filterEmptyX(objs)': function() {
            filterEmptyX(objs);
        },
        '_.filter(objs, {y: false})': function() {
            _.filter(objs, {y: false});
        },
        'filter(where({y: false}), objs)': function() {
            R.filter(R.where({y: false}), objs);
        },
        'filter(where({y: false}))(objs)': function() {
            R.filter(R.where({y: false}))(objs);
        },
        'filterFalseY(objs)': function() {
            filterFalseY(objs);
        }
    }
};
