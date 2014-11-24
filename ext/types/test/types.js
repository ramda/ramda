var R = require('../../..');

var interfaces = {functor: ['map']};
interfaces.apply = interfaces.functor.concat(['ap']);
interfaces.applicative = interfaces.apply.concat(['of']);
interfaces.chain = interfaces.apply.concat(['chain']);
interfaces.monad = R.uniq(interfaces.chain.concat(interfaces.applicative));

function correctInterface(type) {
    return function(obj) {
        return R.every(function(method) {
            return obj[method] && typeof obj[method] === 'function';
        }, interfaces[type]);
    };
}


module.exports = {

    functor: {
        iface: correctInterface('functor'),
        id: function(obj) {
            return obj.equals(obj.map(R.identity));
        },
        compose: function(obj, f, g) {
            return obj.map(function(x) { return f(g(x)); }).equals(
                obj.map(g).map(f)
            );
        }
    },

    apply: {
        iface: correctInterface('apply'),
        compose: function(a, u, v) {
            return a.ap(u.ap(v)).equals(
                a.map(function(f) {
                    return function(g) {
                        return function(x) {
                            return f(g(x));
                        };
                    };
                }).ap(u).ap(v)
            );
        }
    },

    applicative: {
        iface: correctInterface('applicative'),
        id: function(obj, obj2) {
            return obj.of(R.identity).ap(obj2).equals(obj2);
        },
        homomorphic: function(obj, f, x) {
            return obj.of(f).ap(obj.of(x)).equals(obj.of(f(x)));
        },
        interchange: function(obj1, obj2, x) {
            return obj2.ap(obj1.of(x)).equals(
                obj1.of(function(f) { return f(x); }).ap(obj2)
            );
        }
    },

    chain: {
        iface: correctInterface('chain'),
        associative: function(obj, f, g) {
            return obj.chain(f).chain(g).equals(
                obj.chain(function(x) { return f(x).chain(g); })
            );
        }
    },

    monad: {
        iface: correctInterface('monad')
    }
};
