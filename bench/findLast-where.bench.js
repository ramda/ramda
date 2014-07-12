var _ = require('lodash');
var R = require('../ramda');
var findLast = R.findLast;
var where = R.where;
var isEmpty = R.isEmpty;

var objs = [
  {x: [1,2], y: true}, {x: [1,3], y: true}, {x: [], y: false}, {x: [2], y: false}, 
  {x: [3], y: true}, {x: [1], y: true}, {x: [1,2,3], y: true}, {x: [], y: true}, 
  {x: [1,2], y: false}, {x: [1,3], y: true} 
];
var findLastEmptyX = findLast(where({x: R.isEmpty}));
var findLastFalseY = findLast(where({y: false}));

module.exports = {
  name: "findLast where",
  tests: {
    '_.findLast(objs, {x: []})': function() {
      _.findLast(objs, {x: []});
    },
    'findLast(where({x: isEmpty}), objs)': function() {
      findLast(where({x: isEmpty}), objs);
    },
    'findLast(where({x: isEmpty}))(objs)': function() {
      findLast(where({x: isEmpty}))(objs);
    },
    'findLastEmptyX(objs)': function() {
      findLastEmptyX(objs);
    },
    '_.findLast(objs, {y: false})': function() {
      _.findLast(objs, {y: false});
    },
    'findLast(where({y: false}), objs)': function() {
      findLast(where({y: false}), objs);
    },
    'findLast(where({y: false}))(objs)': function() {
      findLast(where({y: false}))(objs);
    },
    'findLastFalseY(objs)': function() {
      findLastFalseY(objs);
    }
  }
};

