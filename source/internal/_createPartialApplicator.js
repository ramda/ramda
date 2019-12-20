import _arity from './_arity';
import _curry2 from './_curry2';


export default function _createPartialApplicator(concat) {
  return _curry2(function(fn, args) {
    var arity = Math.max(0, fn.length - args.length);
    return _arity(arity, function() {
      var neededArgs = Array.prototype.slice.call(arguments, 0, arity);
      return fn.apply(this, concat(args, neededArgs));
    });
  });
}
