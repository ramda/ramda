var R = require('..');
var eq = require('./shared/eq');

describe('depthReduce', function() {
  var powerUntil = R.curry(function(max, a, v) {
    if (a >= max) {
      return [];
    }
    return [typeof v === 'number' ? Math.pow(a, v) : a];
  });

  var powerUntil10 = powerUntil(10);

  it('folds simple functions over arrays with the supplied accumulator', function() {
    eq(R.depthReduce(powerUntil10, 2, [2, 2, 2]), 16);
  });

  it('folds simple functions over nested arrays with the supplied accumulator', function() {
    eq(R.depthReduce(powerUntil10, 2, [2, [2, [2]]]), 16);
  });

  it('folds simple functions over nested arrays and objects with the supplied accumulator', function() {
    eq(R.depthReduce(powerUntil10, 2, { a: 1, b: [2, { c: 3 }]}), 64);
  });

  it('depth-first folds simple functions over nested arrays and objects with the supplied accumulator', function() {
    eq(R.depthReduce(powerUntil10, 2, [[[1], 2], 3, 0]), 64);
    eq(R.depthReduce(powerUntil(70), 2, [[[1], 2], 3, 0]), 1);
  });

  it('depthReduce follows circuclar references', function() {
    var reducer = function(a, b, k) {
      if (a.length >= 10) {
        return [];
      }
      return [b === true ? a.concat(a.length) : a];
    };
    var circular = { count: true };
    circular.circular = circular;
    eq(R.depthReduce(reducer, [], circular), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('depthReduce works over object keys', function() {
    var target = {
      N1: [{
        N2: [{ N21: [210], N22: [220] }],
        N4: [{ N41: [410], N42: [420] }],
        N6: [{ N61: [610], N62: [620] }],
        N8: [{ N81: [810], N82: [820] }]
      }, {
        N3: [{ N31: [310], N32: [320] }],
        N5: [{ N51: [510], N52: [520] }],
        N7: [{ N71: [710], N72: [720] }],
        N9: [{ N91: [910], N92: [920] }]
      }]
    };

    var pairKeys = R.depthReduce(function(a, v, k) {
      return [
        k.length && parseInt(k.slice(1)) % 2 === 0 ? a.concat(parseInt(k.slice(1))) : a
      ];
    })([], target);

    eq(pairKeys, [2, 22, 4, 42, 6, 62, 8, 82, 32, 52, 72, 92]);
  });

  it('depthReduce doesn\'t stop with objects with null and undefined properties', function() {
    var target = {
      something: {
        mostly_empty: {},
        empty_property: null,
        empty_property2: undefined,
        some_empty_values: [
          null,
          undefined,
          {
            matching: {
              key: 'value1'
            }
          }
        ]
      },
      empty_property: null,
      empty_property2: undefined,
      some_empty_values: [
        null,
        undefined,
        {
          matching: {
            key: 'value2'
          }
        }
      ],
      deep: {
        object: {
          matching: {
            key: 'value3'
          },
          empty_property: null,
          empty_property2: undefined,
          some_empty_values: [
            null,
            undefined,
            {
              matching: {
                key: 'value4'
              }
            }
          ]
        }
      }
    };

    var found = R.depthReduce(function(a, v, k) {
      if (a.length >= 3) {
        return [];
      }
      var object = {};
      object[k] = v;
      return [k === 'matching' ? a.concat(object) : a];
    })([], target);

    eq(found, [{
      matching: { key: 'value1' }
    }, {
      matching: { key: 'value2' }
    }, {
      matching: { key: 'value3' }
    }]);
  });

  it('depthReduce changing values in place, like a map', function() {
    var target = {
      key: 'root',
      items: [{
        key: 'x',
        items: [{
          key: 'y',
          items: [{
            key: 'z',
            extra: 'blah'
          }, {
            key: 's'
          }]
        }]
      }]
    };

    var getPath = R.depthReduce(function(a, b) {
      return [b ? a[b] : a];
    });

    var mapStrings = function(fn, obj) {
      return R.depthReduce(function(a, v, k, path) {
        if (typeof v !== 'string') {
          return [a];
        }
        var parent = getPath(obj, path);
        parent[k] = fn(v);
        return [a];
      })(obj, obj);
    };

    var result = mapStrings(function(x) {
      return x.toUpperCase();
    }, target);

    eq(result, {
      key: 'ROOT',
      items: [{
        key: 'X',
        items: [{
          key: 'Y',
          items: [{
            key: 'Z',
            extra: 'BLAH'
          }, {
            key: 'S'
          }]
        }]
      }]
    });
  });
});
