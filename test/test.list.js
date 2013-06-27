var assert = require("assert");
var Lib = require("./../ramda");

describe('indexOf', function() {
  it("returns a number indicating an object's position in a list", function() {
    var list = [0, 10, 20, 30];
    assert.equal(Lib.indexOf(30, list), 3);
  });
  it("returns -1 if the object is not in the list", function() {
    var list = [0, 10, 20, 30];
    assert.equal(Lib.indexOf(40, list), -1);
  });
});

describe('lastIndexOf', function() {
  it("returns a number indicating an object's last position in a list", function() {
    var list = [0, 10, 20, 30, 0, 10, 20, 30, 0, 10];
    assert.equal(Lib.lastIndexOf(30, list), 7);
  });
  it("returns -1 if the object is not in the list", function() {
    var list = [0, 10, 20, 30];
    assert.equal(Lib.lastIndexOf(40, list), -1);
  });

});

describe("join", function() {
  it("concatenates a list's elements to a string, with an seperator string between elements", function() {
    var list = [1,2,3,4];
    assert.equal(Lib.join("~", list), "1~2~3~4");
  });
});

describe("splice", function() {
  it("removes specified elements from a list", function() {
    var list = [0,1,2,3,4,5,6,7,8,9];
    assert.deepEqual(Lib.splice(3, 2, list), [0,1,2,5,6,7,8,9]);
  });
});

describe("nth", function() {
  it("returns the object ar position n of the list", function() {
    var list = ["x", 1, {a:1, b:2}, [4,5,6], true];
    assert.equal(Lib.nth(4, list), true);
    assert.equal(Lib.nth(0, list), "x");
    assert.deepEqual(Lib.nth(3, list), [4,5,6]);
  });

  it("returns null if n is out of the list's range", function() {
    var list = [1,2,3];
    assert.equal(Lib.nth(4, list), null);
  });

  it("is automatically curried", function() {
    var list = [3,4,5,6,7,8];
    var get3rd = Lib.nth(2);
    assert.equal(get3rd(list), 5);
  });
});


