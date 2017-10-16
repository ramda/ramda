import _curry2 from './internal/_curry2';
import _isNumber from './internal/_isNumber';


/**
 * Returns a list of numbers from `from` (inclusive) to `to` (inclusive).
 * The range can be either increasing or decreasing. 
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to One more than the last number in the list.
 * @return {Array} The list of numbers in tthe set `[a, b)`.
 * @example
 *
 *      R.range(1, 5);    //=> [1, 2, 3, 4, 5]
 *		R.range(5, 1);	  //=> [5, 4, 3, 2, 1]	  			
 *      R.range(50, 53);  //=> [50, 51, 52, 53]
 *		R.range(53, 50);  //=> [53, 52, 51, 50]	
 */
var range = _curry2(function range(from, to) {
  if (!(_isNumber(from) && _isNumber(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }
  var result = [];
  var n = from;
  if(from < to){
	while (n <= to) {
		result.push(n);
		n += 1;
	}
  } else {
	 while(n >= to){
		result.push(n);
		n-=1;	
	}
  }
  return result;
});
export default range;
