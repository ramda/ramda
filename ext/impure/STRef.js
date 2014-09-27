(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['ramda'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('../..'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.ramda);
    }
}(this, function(R) {

    function STRef() {
    }

    /**
     * @sig a -> STRef a
     */
    STRef.new = function(val) {
        return { value: val };
    }; //" :: forall s r. s -> Eff (ref :: Ref | r) (RefVal s)

    /**
     * @sig STRef a -> a
     */
    STRef.read = function(ref) {
        return ref.value;
    }; //" :: forall s r. RefVal s -> Eff (ref :: Ref | r) s

    /**
     * @sig STRef a -> (a -> a) -> void
     */
    STRef.modify = function(ref, f) {
        ref.value = f(ref.value);
        return {};
    }; //" :: forall s r. RefVal s -> (s -> s) -> Eff (ref :: Ref | r) Unit

    /**
     * @sig STRef a -> a -> void
     */
    STRef.write = R.curryN(2, function (ref, val) {
        ref.value = val;
        return {};
    }); //" :: forall s r. RefVal s -> s -> Eff (ref :: Ref | r) Unit

    return STRef;
}));
