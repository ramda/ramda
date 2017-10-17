var Z = require('sanctuary-type-classes');

var R = require('../..');


//  Id :: a -> Id a
module.exports = function Id(value) {
  return {
    '@@type': 'ramda/Id',
    'fantasy-land/equals': function(other) { return other != null && other['@@type'] === this['@@type'] && R.equals(other.value, value); },
    'fantasy-land/concat': function(id) { return Id(R.concat(value, id.value)); },
    'fantasy-land/map': function(f) { return Id(f(value)); },
    'fantasy-land/ap': function(id) { return Id(id.value(value)); },
    'fantasy-land/chain': function(f) { return f(value); },
    'fantasy-land/reduce': function(f, x) { return f(x, value); },
    'fantasy-land/traverse': function(typeRep, f) { return Z.map(Id, f(value)); },
    constructor: {'fantasy-land/of': Id},
    toString: function() { return 'Id(' + Z.toString(value) + ')'; },
    value: value
  };
};
