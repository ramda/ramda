var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var _isTransformer = require('../source/internal/_isTransformer.js');


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
    eq(R.groupBy(byGrade, students), {
      A: [{name: 'Dianne', score: 99}, {name: 'Gillian', score: 91}],
      B: [{name: 'Abby', score: 84}, {name: 'Chris', score: 89}, {name: 'Irene', score: 85}],
      C: [{name: 'Brad', score: 73}, {name: 'Hannah', score: 78}],
      D: [{name: 'Fred', score: 67}, {name: 'Jack', score: 69}],
      F: [{name: 'Eddy', score: 58}]
    });
  });

  it('returns an empty object if given an empty array', function() {
    eq(R.groupBy(R.prop('x'), []), {});
  });

  it('dispatches on transformer objects in list position', function() {
    var byType = R.prop('type');
    var xf = {
      '@@transducer/init': function() { return {}; },
      '@@transducer/result': function(x) { return x; },
      '@@transducer/step': R.mergeRight
    };
    eq(_isTransformer(R.groupBy(byType, xf)), true);
  });

  it('works with R.into', function() {
    var evenOdd = x => x % 2  === 0 ? 'even' : 'odd';
    var result = R.into({}, R.groupBy(evenOdd), R.range(1, 10));
    eq(result, {even: [2, 4, 6, 8], odd: [1, 3, 5, 7, 9]});
  });

});
