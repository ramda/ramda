var chainPath = require('../src/chainPath');
var eq = require('./shared/eq');

describe('chainPath', function() {
  it('is curried', function() {
    eq(typeof chainPath([]), 'function');
  });

  it('returns the list if passed an empty path', function() {
    var path = [];
    var list = [1, 2, 3];
    var result = chainPath(path, list);
    eq(result, list);
  });

  it('returns [] if passed empty list', function() {
    var path = ['name', 'first'];
    var list = [];
    var result = chainPath(path, list);
    eq(result, []);
  });

  it('returns null if passed null list', function() {
    var path = ['name', 'first'];
    var list = null;
    var result = chainPath(path, list);
    eq(result, null);
  });

  it('returns a flat array from props', function() {
    var path = ['kids', 'name', 'first'];
    var list = [
      {
        kids: [
          { name: { first: 'Ricky' } },
          { name: { first: 'Bobby' } },
          { name: { first: 'Stevie' } }
        ]
      },
      {
        kids: [
          { name: { first: 'Jimmy' } },
          { name: { first: 'Timmy' } }
        ]
      }
    ];
    var result = chainPath(path, list);
    eq(result, ['Ricky', 'Bobby', 'Stevie', 'Jimmy', 'Timmy']);
  });

  it('returns undefined if path causes an error', function() {
    var path = ['bogus', 'adventure'];
    var list = [
      {
        kids: [
          { name: { first: 'Ricky' } },
          { name: { first: 'Bobby' } },
          { name: { first: 'Stevie' } }
        ]
      },
      {
        kids: [
          { name: { first: 'Jimmy' } },
          { name: { first: 'Timmy' } }
        ]
      }
    ];
    var result = chainPath(path, list);
    eq(result, undefined);
  });

  it('returns [] if path is bad', function() {
    var path = ['bogus'];
    var list = [{}, {}];
    var result = chainPath(path, list);
    eq(result, []);
  });

  it('returns a flat array from nested props', function() {
    var path = ['kids', 'hobbies', 'name'];
    var list = [
      {
        kids: [
          {
            hobbies: [{ name: 'Chess' }],
            name: { first: 'Ricky' }
          },
          {
            hobbies: [{ name: 'Boxing' }],
            name: { first: 'Bobby' }
          },
          {
            hobbies: [{ name: 'Bowling' }],
            name: { first: 'Stevie' }
          }
        ]
      },
      {
        kids: [
          {
            hobbies: [],
            name: { first: 'Jimmy' }
          },
          {
            hobbies: [{ name: 'Covfefe' }],
            name: { first: 'Timmy' }
          }
        ]
      }
    ];
    var result = chainPath(path, list);
    eq(result, ['Chess', 'Boxing', 'Bowling', 'Covfefe']);
  });
});
