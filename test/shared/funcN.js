var jsv = require('jsverify');

var FMap = jsv._.FMap;

module.exports = function(n, arb) {
  arb = jsv.utils.force(arb || jsv.json);

  return jsv.bless({
    generator: jsv.generator.bless(function(size) {
      var m = new FMap();

      var f = function(a0) {
        if (!m.contains(a0)) {
          var value = arb.generator(size);
          m.insert(a0, value);
        }

        return m.get(a0);
      };

      switch (n) {
        case 1: return function(a0) { return f([a0]); };
        case 2: return function(a0, a1) { return f([a0, a1]); };
        case 3: return function(a0, a1, a2) { return f([a0, a1, a2]); };
        case 4: return function(a0, a1, a2, a3) { return f([a0, a1, a2, a3]); };
        case 5: return function(a0, a1, a2, a3, a4) { return f([a0, a1, a2, a3, a4]); };
        case 6: return function(a0, a1, a2, a3, a4, a5) { return f([a0, a1, a2, a3, a4, a5]); };
        case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return f([a0, a1, a2, a3, a4, a5, a6]); };
        case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return f([a0, a1, a2, a3, a4, a5, a6, a7]); };
        case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return f([a0, a1, a2, a3, a4, a5, a6, a7, a8]); };
        case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return f([a0, a1, a2, a3, a4, a5, a6, a7, a8, a9]); };
        default: throw new Error('First argument to funcN must be a positive integer no greater than ten');
      }
    }),

    shrink: jsv.shrink.noop,
    show: function(f) {
      return 'Function of arity' + f.length;
    }
  });
};
