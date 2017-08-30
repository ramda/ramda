var _curry2 = require('./internal/_curry2');
var chain = require('./chain');
var prop = require('./prop');

function chainProp(list, propName) {
  return chain(prop(propName), list);
}

function notUndefined(x) {
  return x !== undefined;
}


/**
 * Retrieve the flat array of values at a given path over an array.
 *
 * @func
 * @memberOf R
 * @since v0.24.2
 * @category List
 * @typedefn Idx = String | Int
 * @sig [Idx] -> [a] -> [b] | Undefined
 * @param {Array} path The path to use.
 * @param {Array} list The list to retrieve the flat array of values from.
 * @return {Array} The array of flattened values.
 * @see R.chain, R.path, R.prop
 * @example
 *
 *      const people = [
 *        {
 *          kids: [
 *            {
 *              hobbies: [{ name: 'Chess' }],
 *              name: { first: 'Ricky' }
 *            },
 *            {
 *              hobbies: [{ name: 'Boxing' }],
 *              name: { first: 'Bobby' }
 *            },
 *            {
 *              hobbies: [{ name: 'Bowling' }],
 *              name: { first: 'Stevie' }
 *            }
 *          ]
 *        },
 *        {
 *          kids: [
 *            {
 *              hobbies: [],
 *              name: { first: 'Jimmy' }
 *            },
 *            {
 *              hobbies: [{ name: 'Covfefe' }],
 *              name: { first: 'Timmy' }
 *            }
 *          ]
 *        }
 *      ]
 *        {
 *          kids: [
 *           { name: { first: 'Jimmy' } },
 *            { name: { first: 'Timmy' } }
 *          ]
 *        }
 *      ];
 *      R.chainPath(['kids', 'name', 'first'], people); //=>  ['Ricky', 'Bobby', 'Stevie', 'Jimmy', 'Timmy']
 *      R.chainPath(['bogus', 'journey'], people); //=> undefined
 *      R.chainPath([['kids', 'hobbies', 'name']], people); //=> ['Chess', 'Boxing', 'Bowling', 'Covfefe']
 */
module.exports = _curry2(function chainPath(path, list) {
  try {
    if (path == null || path.length < 1) {
      return list;
    } else if (list == null) {
      return null;
    } else if (list.length < 1) {
      return list;
    }
    return path
      .reduce(chainProp, list)
      .filter(notUndefined);
  } catch (e) {
    return;
  }
});
