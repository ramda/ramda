function itself(x) {
  return x;
}

function none() {
  return;
}

/**
 * Specific util for removing recursion with queue
 * @param callback - iteration takes value and push function
 * @param initialValue - will be passed as value on the first iteration
 * @param get - getter from push arguments as Array to value, return Array of push arguments by default
 * @param set - takes push arguments as Array and callback result, none by default
 * @returns {*}
 */
export default  function _queue(callback, initialValue, get = itself, set = none) {
  const qe = [];
  const push = (...args) => {
    qe.push(args);
  };
  const result = callback(initialValue, push);
  while (qe.length) {
    set(qe[0], callback(get(qe[0]), push));
    qe.shift();
  }
  return result;
}
