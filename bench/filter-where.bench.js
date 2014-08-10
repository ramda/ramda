var _ = require('lodash');
var R = require('..');
var filter = R.filter;
var where = R.where;
var isEmpty = R.isEmpty;

var objs = [
  {x: [1,2], y: true}, {x: [1,3], y: true}, {x: [], y: false}, {x: [2], y: false},
  {x: [3], y: true}, {x: [1], y: true}, {x: [1,2,3], y: true}, {x: [], y: true},
  {x: [1,2], y: false}, {x: [1,3], y: true}
];
var filterEmptyX = filter(where({x: R.isEmpty}));
var filterFalseY = filter(where({y: false}));

module.exports = {
  name: "filter where",
  tests: {
    '_.filter(objs, {x: []})': function() {
      _.filter(objs, {x: []});
    },
    'filter(where({x: isEmpty}), objs)': function() {
      filter(where({x: isEmpty}), objs);
    },
    'filter(where({x: isEmpty}))(objs)': function() {
      filter(where({x: isEmpty}))(objs);
    },
    'filterEmptyX(objs)': function() {
      filterEmptyX(objs);
    },
    '_.filter(objs, {y: false})': function() {
      _.filter(objs, {y: false});
    },
    'filter(where({y: false}), objs)': function() {
      filter(where({y: false}), objs);
    },
    'filter(where({y: false}))(objs)': function() {
      filter(where({y: false}))(objs);
    },
    'filterFalseY(objs)': function() {
      filterFalseY(objs);
    }
  }
};
