var assert = require('assert');

var R = require('..');
var _isTransformer = require('../src/internal/_isTransformer');


describe('groupBy', function() {
  it('splits the list into groups according to the grouping function', function() {
    var grade = function(score) {
      return (score < 65) ? 'F' : (score < 70) ? 'D' : (score < 80) ? 'C' : (score < 90) ? 'B' : 'A';
    };
    var students = [
      {name: 'Abby', score: 84},
      {name: 'Brad', score: 73},
      {name: 'Chris', score: 89},
      {name: 'Dianne', score: 99},
      {name: 'Eddy', score: 58},
      {name: 'Fred', score: 67},
      {name: 'Gillian', score: 91},
      {name: 'Hannah', score: 78},
      {name: 'Irene', score: 85},
      {name: 'Jack', score: 69}
    ];
    var byGrade = function(student) {return grade(student.score || 0);};
    assert.deepEqual(R.groupBy(byGrade, students), {
      A: [{name: 'Dianne', score: 99}, {name: 'Gillian', score: 91}],
      B: [{name: 'Abby', score: 84}, {name: 'Chris', score: 89}, {name: 'Irene', score: 85}],
      C: [{name: 'Brad', score: 73}, {name: 'Hannah', score: 78}],
      D: [{name: 'Fred', score: 67}, {name: 'Jack', score: 69}],
      F: [{name: 'Eddy', score: 58}]
    });
  });

  it('is curried', function() {
    var splitByType = R.groupBy(R.prop('type'));
    assert.deepEqual(splitByType([
      {type: 'A', val: 10},
      {type: 'B', val: 20},
      {type: 'A', val: 30},
      {type: 'A', val: 40},
      {type: 'C', val: 50},
      {type: 'B', val: 60}
    ]), {
      A: [{type: 'A', val: 10}, {type: 'A', val: 30}, {type: 'A', val: 40}],
      B: [{type: 'B', val: 20}, {type: 'B', val: 60}],
      C: [{type: 'C', val: 50}]
    });
  });

  it('returns an empty object if given an empty array', function() {
    assert.deepEqual(R.groupBy(R.prop('x'), []), {});
  });

  it('dispatches on transformer objects in list position', function() {
    var byType = R.prop('type');
    var xf = {
      '@@transducer/init': function() { return {}; },
      '@@transducer/result': function(x) { return x; },
      '@@transducer/step': R.merge
    };
    assert.strictEqual(_isTransformer(R.groupBy(byType, xf)), true);
  });
});
