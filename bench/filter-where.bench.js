var _ = require('lodash');
var R = require('../ramda');
var filter = R.filter;
var where = R.where;
var isEmpty = R.isEmpty;
var Benchmark = require('benchmark');
var fs = require('fs');
var out = './report/filter-' + (new Date()).toISOString() + '.json';
var suite = new Benchmark.Suite;

var objs = [
  {x: [1,2], y: true}, {x: [1,3], y: true}, {x: [], y: false}, {x: [2], y: false}, 
  {x: [3], y: true}, {x: [1], y: true}, {x: [1,2,3], y: true}, {x: [], y: true}, 
  {x: [1,2], y: false}, {x: [1,3], y: true} 
];
var filterEmptyX = filter(where({x: R.isEmpty}));
var filterFalseY = filter(where({y: false}));

suite.add('_.filter(objs, {x: []})', function() {
  _.filter(objs, {x: []});
})
.add('filter(where({x: isEmpty}), objs)', function() {
  filter(where({x: isEmpty}), objs);
})
.add('filter(where({x: isEmpty}))(objs)', function() {
  filter(where({x: isEmpty}))(objs);
})
.add('filterEmptyX(objs)', function() {
  filterEmptyX(objs);
})
.add('_.filter(objs, {y: false})', function() {
  _.filter(objs, {y: false});
})
.add('filter(where({y: false}), objs)', function() {
  filter(where({y: false}), objs);
})
.add('filter(where({y: false}))(objs)', function() {
  filter(where({y: false}))(objs);
})
.add('filterFalseY(objs)', function() {
  filterFalseY(objs);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  fs.writeFile(out, JSON.stringify(this), function(err) {
    if (err) { console.log('failed to write ' + out); }
    else { console.log('saved ' + out); }
  });
})
.run();


