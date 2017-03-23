var _curry2 = require('./internal/_curry2');
var hasIn = require('./hasIn');
var bind = require('./bind');

/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, bound to that object, if it exists. Note that
 * if the property exists but is not a function, this function will _not_
 * fail, but you will get an error when you try to invoke the returned
 * function.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig s -> {s: a} -> a | Undefined
 * @param {String} p The property name
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`, bound to `obj` as with `bind`.
 * @see R.prop
 * @see R.bind
 * @example
 *
 *      var getX = R.boundProp('getX');
 *
 *      getX({
 *        x: 'X',
 *        getX: function () {return this.x}
 *      })();   //=> 'X'
 *
 *      getX({});   //=> undefined
 *
 *
 *      // A more practical use case:
 *
 *      function Square(length) {
 *        this._length = length;
 *      }
 *      Square.prototype.getArea = function() {
 *        return this._length * this._length;
 *      };
 *
 *      var getArea = R.compose(R.call, R.boundProp('getArea'));
 *      var objects = [1, 2, 3, 4].map((length) => new Square(length));
 *      var areas = objects.map(getArea);   //=> [1, 4, 9, 16]
 */
module.exports = _curry2(function boundProp(p, obj) {
  if (hasIn(p, obj)) {
    return bind(obj[p], obj);
  }
  return p[obj];
});
