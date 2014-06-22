var R = require('../ramda');
var Benchmark = require('benchmark');

var arity0 = function() { return 0; };
var arity1 = function() { return 1; };
var arity2 = function() { return 2; };
var arity3 = function() { return 3; };
var arity4 = function() { return 4; };
var arity5 = function() { return 5; };
var arity6 = function() { return 6; };


b = Benchmark('ramda.curry', function() {
     R.curry(arity3); 
  }  
);


