import _arity from './_arity';
import reduce from '../reduce';
import tail from '../tail';

function take(n, arr) {
  var result = [];
  for (var i = 0; i < n; i += 1) {
    result[i] = arr[i];
  }

  return result;
}

export default function _pipeWith(transformFn) {
  return function() {
    if (arguments.length === 0) {
      throw new Error('composition must contains at least one function');
    }

    var pipeArgs = take(arguments.length, arguments);

    return _arity(
      arguments[0].length,
      function() {
        var inputArgs = take(arguments.length, arguments);

        return reduce(
          function(result, f) {
            return transformFn.call(this, f, result);
          },
          pipeArgs[0].apply(this, inputArgs),
          tail(pipeArgs)
        );
      });
  };
}
