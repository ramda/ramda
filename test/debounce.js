var R = require('..');
var eq = require('./shared/eq');

describe('debounce', function() {
  it('return a debounced function', function() {
    function task() {}
    var debounced = R.debounce(task, 500);

    eq(typeof debounced, 'function');
  //  eq(typeof debounced.clear, 'function');
  });

  it('invoke debounced onced time, trailling edge', function() {
    var invokedCount = 0;
    var invokedId = 0;
    var wait = 100;
    function task(id) {
      invokedCount += 1;
      invokedId = id;
    }

    var debounced = R.debounce(task, wait);

    debounced(1);
    debounced(2);
    debounced(3);

    setTimeout(function() {
      eq(invokedCount, 1);
      eq(invokedId, 3);
    }, wait);
  });

  it('invoke debounced onced time, leading edge', function() {
    var invokedCount = 0;
    var invokedId = 0;
    var wait = 100;
    var immidiate = true;

    function task(id) {
      invokedCount += 1;
      invokedId = id;
    }

    var debounced = R.debounce(task, wait, immidiate);

    debounced(1);
    debounced(2);
    debounced(3);

    setTimeout(function() {
      eq(invokedCount, 1);
      eq(invokedId, 1);
    }, wait);
  });
});
