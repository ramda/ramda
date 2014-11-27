/**
 * Create a predicate wrapper which will call a pick function (all/any) for each predicate
 *
 * @private
 * @see R.every
 * @see R.some
 */
// TODO: document, even for internals...
function _predicateWrap(predPicker) {
    return function(preds /* , args */) {
        var predIterator = function() {
            var args = arguments;
            return predPicker(function(predicate) {
                return predicate.apply(null, args);
            }, preds);
        };
        return arguments.length > 1 ?
                // Call function immediately if given arguments
                predIterator.apply(null, _slice(arguments, 1)) :
                // Return a function which will call the predicates with the provided arguments
                arity(max(pluck('length', preds)), predIterator);
    };
}
