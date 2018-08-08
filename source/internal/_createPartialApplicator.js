import _arity from './_arity';


export default function _createPartialApplicator(concat) {
  return function(fn, args) {
    return _arity(Math.max(0, fn.length - args.length), function() {
      return fn.apply(this, concat(args, arguments));
    });
  };
}
