var _equals = require('_equals');


module.exports = {

  baseMap: function(f) {
    return f(this.value);
  },

  getEquals: function(constructor) {
    return function equals(that) {
      return that instanceof constructor && _equals(this.value, that.value);
    };
  },

  extend: function(Child, Parent) {
    function Ctor() {
      this.constructor = Child;
    }
    Ctor.prototype = Parent.prototype;
    Child.prototype = new Ctor();
    Child.super_ = Parent.prototype;
  },

  identity: function(x) { return x; },

  notImplemented: function(str) {
    return function() {
      throw new Error(str + ' is not implemented');
    };
  },

  notCallable: function(fn) {
    return function() {
      throw new Error(fn + ' cannot be called directly');
    };
  },

  returnThis: function() { return this; }

};
