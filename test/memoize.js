var R = require('..');
var eq = require('./shared/eq');


describe('memoize', function() {
  it('memoizes "false" return values', function() {
    var count = 0;
    var inc = R.memoize(function(n) {
      count += 1;
      return n + 1;
    });
    eq(inc(-1), 0);
    eq(inc(-1), 0);
    eq(inc(-1), 0);
    eq(count, 1);
  });

  it('differentiates values with same string representation', function() {
    var f = R.memoize(R.toString);
    eq(f(42), '42');
    eq(f('42'), '"42"');
    eq(f([[42]]), '[[42]]');
    eq(f([['42']]), '[["42"]]');
  });

  it('respects object equivalence', function() {
    var count = 0;
    var f = R.memoize(function(x) {
      count += 1;
      return R.toString(x);
    });
    eq(f({x: 1, y: 2}), '{"x": 1, "y": 2}');
    eq(f({x: 1, y: 2}), '{"x": 1, "y": 2}');
    eq(f({y: 2, x: 1}), '{"x": 1, "y": 2}');
    eq(count, 1);
  });

  it('works with 2 arguments', function() {
    // Example from https://github.com/angeloocana/joj-core

    /**
     * Get all valid and invalid board near positions.
     */
    function getAllNearPositions(position) {

      function addPosition(toAdd) {
        return {
          x: position.x + toAdd[0],
          y: position.y + toAdd[1]
        };
      }

      return R.map(addPosition, [
        [-1, -1],
        [0, -1],
        [1, -1],

        [-1, 0],
        [1, 0],

        [-1, 1],
        [0, 1],
        [1, 1]
      ]);
    }

    /**
     * Checks if position exists in this board size.
     */
    var hasPositionByBoardSize = R.curry(function(boardSize, position) {
      return position
        && position.x >= 0 && position.y >= 0
        && boardSize.y > position.y && boardSize.x > position.x;
    });

    var getNearPositions = R.memoize(function(boardSize, xy) {
      var hasPosition = hasPositionByBoardSize(boardSize);
      return R.filter(hasPosition, getAllNearPositions(xy));
    });

    var nearPositions88_11 = getNearPositions({x: 8, y: 8}, {x: 1, y: 1});
    var nearPositions88_11_2 = getNearPositions({x: 8, y: 8}, {x: 1, y: 1});

    var nearPositions88_22 = getNearPositions({x: 8, y: 8}, {x: 2, y: 2});

    var nearPositions33_22 = getNearPositions({x: 3, y: 3}, {x: 2, y: 2});

    var expectedNearPositions88_11 = [
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 0, y: 1},
      {x: 2, y: 1},
      {x: 0, y: 2},
      {x: 1, y: 2},
      {x: 2, y: 2}
    ];

    var expectedNearPositions88_22 = [
      {x: 1, y: 1},
      {x: 2, y: 1},
      {x: 3, y: 1},
      {x: 1, y: 2},
      {x: 3, y: 2},
      {x: 1, y: 3},
      {x: 2, y: 3},
      {x: 3, y: 3}
    ];

    var expectedNearPositions33_22 = [
      {x: 1, y: 1},
      {x: 2, y: 1},
      {x: 1, y: 2}
    ];

    if (nearPositions88_11 !== nearPositions88_11_2) {
      throw Error('memoize not working');
    }

    eq(nearPositions88_11, expectedNearPositions88_11);
    eq(nearPositions88_22, expectedNearPositions88_22);
    eq(nearPositions33_22, expectedNearPositions33_22);
  });
});
