import _curry1 from './internal/_curry1';
import curryN from './curryN';

var flipAll = _curry1(function flipAll(fn) {
  return curryN(fn.length, function() {
    var args = Array.prototype.slice.call(arguments, 0);

    return fn.apply(this, args.reverse());
  });
});

export default flipAll;
