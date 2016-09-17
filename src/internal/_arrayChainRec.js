module.exports = (function() {
  function stepNext(x) { return {value: x, done: false }; }
  function stepDone(x) { return {value: x, done: true }; }

  return function _chainRec(f, i) {
    var todo = [i];
    var res = [];
    var buffer, xs, idx;
    while (todo.length > 0) {
      xs = f(stepNext, stepDone, todo.shift());
      buffer = [];
      for (idx = 0; idx < xs.length; idx += 1) {
        (xs[idx].done ? res : buffer).push(xs[idx].value);
      }
      Array.prototype.unshift.apply(todo, buffer);
    }
    return res;
  };
}());
