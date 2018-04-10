import _curry1 from './internal/_curry1';
import curryN from './curryN';

var flipAll = _curry1(function flipAll(fn) {
  return curryN(fn.length, function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var first = args[0];
    var rest = args.slice(1);

    return fn.apply(this, [rest.reverse(), first]);
  });
});

export default flipAll;
