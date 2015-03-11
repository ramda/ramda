module.exports = (function() {
    // Should we use a Symbol or let users have free access to metadata
    // which could be useful for extensions.
    var metaSymbol = typeof Symbol === 'function' ? Symbol('metadata') : '@@metadata';

    return {
        set: function(wrapper, child, arity) {
            wrapper[metaSymbol] = {
                arity: arity != null ? arity : child.length,
                name: child.name,
                wrapped: child
            };
            return wrapper;
        },
        get: function(wrapper) {
            return wrapper[metaSymbol];
        },
        arity: function(wrapper) {
            return wrapper[metaSymbol] ?
                    wrapper[metaSymbol].arity :
                    wrapper.length;
        },
        // Find the original source of the wrapped function
        // (for debugging)
        source: function(wrapper) {
            while (wrapper[metaSymbol]) {
                wrapper = wrapper[metaSymbol].child;
            }
            return wrapper;
        }
    };
})();
