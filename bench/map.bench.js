var map = require('../ramda').map;
var Benchmark = require('benchmark');
var fs = require('fs');
var out = './report/map-' + (new Date()).toISOString() + '.json';
var suite = new Benchmark.Suite;

var nums = [8,2,85,2,34,3,23,247,57,8,0,6,5,46,54,643];
function sq(x) { return x * x; }
var mapSq = map(sq);

suite.add('map(sq, nums)', function() {
  map(sq, nums);
}).add('map(sq)(nums)', function() {
  map(sq)(nums);
}).add('mapSq(nums)', function() {
  mapSq(nums);
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

