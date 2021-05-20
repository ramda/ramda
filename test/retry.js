var R = require('../source');
var eq = require('./shared/eq');

describe('retry', function() {
  this.timeout(10000);
  it('retry infinity until true', function(done) {
    let f = () => {
      let d = new Date(); // current time
      console.log(d.getMilliseconds() % 2);
      return d.getMilliseconds() % 2 == 0; // => true or false
    };
    R.retry(f, 100, null).then(function(result) {
      eq(result, true);
      done();
    });
  });

  it('retry with infinity with delay 500ms until true', function(done) {
    let f = () => {
      let d = new Date(); // current time
      console.log(d.getMilliseconds() % 2);
      return d.getMilliseconds() % 2 == 0; // => true or false
    };
    var retryWithDelay1000 = R.retry(f, 500);
    retryWithDelay1000(null).then(function(result) {
      eq(result, true);
      done();
    });
  });

  it('retry return value after maximum tries', function(done) {
    let f = () => {
      return false;
    };
    R.retry(f, 100, {max: 3}).then(function(result) {
      eq(result, false);
      done();
    });
  });

  it('retry as curry function', function(done) {
    let f = () => {
      return false;
    };
    R.retry(f)(100)({max: 3}).then(function(result) {
      eq(result, false);
      done();
    });
  });
});
