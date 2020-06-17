var R = require('../source');
var eq = require('./shared/eq');
var Pair = require('./shared/Pair');


describe('promap', function() {
  var fromCharCode = String.fromCharCode;
  function charCodeAt(s) { return s.charCodeAt(); }
  function Costar(run) {
    return {
      promap: function promap(f, g) {
        return Costar(R.pipe(R.map(f), run, g));
      },
      run: run
    };
  }

  it('dispatches to pronfuctor["fantasy-land/promap"]() if present', function() {
    var setJson = R.promap(JSON.parse, JSON.stringify);
    var pair = setJson(
      Pair(R.assoc('left-promapped', true), R.assoc('right-promapped', true))
    );

    function mergeWithJson(json) {
      return function(left, right) { return right(left(json)); };
    }

    eq(pair.merge(mergeWithJson('{}')), '{"left-promapped":true,"right-promapped":true}');
  });

  it('dispatches to pronfuctor.promap() if present', function() {
    var is1337Change = R.promap(R.multiply(100), R.equals(1337), Costar(R.sum));
    var data = [10, 3, 0.3, 0.07];

    eq(is1337Change.run(data), true);
  });

  it('composes two functions, f and g, before and after the final function respectively', function() {
    var decodeChar = R.promap(charCodeAt, fromCharCode, R.add(-8));
    var decodeString = R.promap(R.split(''), R.join(''), R.map(decodeChar));
    var code = 'ziuli';

    eq(decodeString(code), 'ramda');
  });
});
