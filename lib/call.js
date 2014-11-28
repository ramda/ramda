var _slice = require('./_slice');


/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * `R.converge`: the left branch can produce a function while the right
 * branch produces a value to be passed to that function as an argument.
 *
 * @func
 * @memberOf R
 * @category core
 * @category Function
 * @sig (*... -> a),*... -> a
 * @param {Function} fn The function to apply to the remaining arguments.
 * @param {...*} args Any number of positional arguments.
 * @return {*}
 * @example
 *
 *      var indentN = R.pipe(R.times(R.always(' ')),
 *                           R.join(''),
 *                           R.replace(/^(?!$)/gm));
 *
 *      var format = R.converge(R.call,
 *                              R.pipe(R.prop('indent'), indentN),
 *                              R.prop('value'));
 *
 *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
 */
module.exports = function call(fn) {
    return fn.apply(this, _slice(arguments, 1));
};
