var _ = require('lodash');
var filter = require('../ramda').filter;
var Benchmark = require('benchmark');
var fs = require('fs');
var out = './report/filter-' + (new Date()).toISOString() + '.json';
var suite = new Benchmark.Suite;

var nums = [8,2,85,2,34,3,23,247,57,8,0,6,5,46,54,643];
function isEven(x) { return x % 2 === 0; }
var filterEven = filter(isEven);

suite
.add('_.filter(nums, isEven)', function() {
  _.filter(nums, isEven);
})
.add('filter(isEven, nums)', function() {
  filter(isEven, nums);
})
.add('filter(isEven)(nums)', function() {
  filter(isEven)(nums);
})
.add('filterEven(nums)', function() {
  filterEven(nums);
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

