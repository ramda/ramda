var R = require('..');
var eq = require('./shared/eq');

var byType = R.prop('type');
var sumValues = function(acc, obj) {return acc + obj.val;};

describe('reduceBy', function() {
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
    var collectNames = function(acc, student) {return acc.concat(student.name);};
    eq(R.reduceBy(byGrade, collectNames, [], students), {
      A: ['Dianne', 'Gillian'],
      B: ['Abby', 'Chris', 'Irene'],
      C: ['Brad', 'Hannah'],
      D: ['Fred', 'Jack'],
      F: ['Eddy']
    });
  });

  it('returns an empty object if given an empty array', function() {
    eq(R.reduceBy(byType, sumValues, 0, []), {});
  });

  it('is curried', function() {
    var splitByType = R.reduceBy(byType);
    var sumByType = splitByType(sumValues, 0);
    eq(sumByType([
      {type: 'A', val: 10},
      {type: 'B', val: 20},
      {type: 'A', val: 30},
      {type: 'A', val: 40},
      {type: 'C', val: 50},
      {type: 'B', val: 60}
    ]), {A: 80, B: 80, C: 50});
  });

  it('correctly reports the arity of curried versions', function() {
    var inc = R.reduceBy(byType, sumValues)(0);
    eq(inc.length, 1);
  });

});
