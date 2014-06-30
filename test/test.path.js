var assert = require("assert");
var Lib = require("./../ramda");

describe("path", function() {
    var deepObject = { a: { b: { c: "c" } }, falseVal: false, nullVal: null, undefinedVal: undefined, arrayVal: ["arr"] };
    var path = Lib.path;
    it("takes a dot-delimited path and an object and returns the value at the path or undefined", function() {
        var obj = {
          a: {
            b: {
              c: 100, 
              d: 200
            }, 
            e: {
              f: [100, 101, 102], 
              g: "G"
            }, 
            h: "H" 
          }, 
          i: "I", 
          j: ["J"]
        };
        assert.equal(path("a.b.c", obj), 100);
        assert.equal(path("", obj), undefined);
        assert.equal(path("a.e.f.1", obj), 101);
        assert.equal(path("j.0", obj), "J");
        assert.equal(path("j.1", obj), undefined);
        assert.equal(path("a.b.c", null), undefined);
    });

    it("should get a deep property's value from objects", function() {
        assert.equal(Lib.path("a.b.c", deepObject), "c");
        assert.equal(Lib.path("a", deepObject), deepObject.a);
    });

    it("should return undefined for items not found", function() {
        assert.equal(Lib.path("a.b.foo", deepObject), undefined);
        assert.equal(Lib.path("bar", deepObject), undefined);
    });

    it("should return undefined for null/undefined", function() {
        assert.equal(Lib.path("toString", null), undefined);
        assert.equal(Lib.path("toString", undefined), undefined);
    });

    it("should work with falsy items", function() {
        assert.equal(Lib.path("toString", false), Boolean.prototype.toString);
    });

    it("should be curried", function() {
        assert.equal(Lib.path("arrayVal.0")(deepObject), "arr");
    });
});

describe("pathOn", function() {
    var deepObject = { a: { b: { c: "c" } }, falseVal: false, nullVal: null, undefinedVal: undefined, arrayVal: ["arr"] };
    var pathOn = Lib.pathOn;
    it("takes a string separator, string path, and an object and returns the value at the path or undefined", function() {
        var obj = {
          a: {
            b: {
              c: 100, 
              d: 200
            }, 
            e: {
              f: [100, 101, 102], 
              g: "G"
            }, 
            h: "H" 
          }, 
          i: "I", 
          j: ["J"]
        };
        assert.equal(pathOn("|", "a|b|c", obj), 100);
        assert.equal(pathOn(" ", "", obj), undefined);
        assert.equal(pathOn(" ", "a e f 1", obj), 101);
        assert.equal(pathOn("_", "j_0", obj), "J");
        assert.equal(pathOn("~", "j~1", obj), undefined);
        assert.equal(pathOn("Z", "aZbZc", null), undefined);
    });

    it("should get a deep property's value from objects", function() {
        assert.equal(Lib.pathOn("|", "a|b|c", deepObject), "c");
        assert.equal(Lib.pathOn("|", "a", deepObject), deepObject.a);
    });
});


describe("pathWith", function() {
    var obj = {
      a: {
        b: {
          c: 100, 
          d: 200
        }, 
        e: {
          f: [100, 101, 102], 
          g: "G"
        }, 
        h: "H" 
      }, 
      i: "I", 
      j: ["J"]
    };
    var pathWith = Lib.pathWith;
    it("takes a function, a string path, and an object, and returns the value at that path or undefined.", function() {
        
        var everyThirdChar = function(str) {
            var parts = [];
            var i = -1;
            while (++i < str.length) {
                if (i % 3 === 0) {
                    parts.push(str.charAt(i));
                }
            }
            return parts;
        };
        var path = "axxbyyc";

        assert.equal(pathWith(everyThirdChar, "azsbt5c", obj), 100);
        assert.equal(pathWith(everyThirdChar, "", obj), undefined);
        assert.equal(pathWith(everyThirdChar, "axxeaafaa1", obj), 101);
        assert.equal(pathWith(everyThirdChar, "j__0", obj), "J");
        assert.equal(pathWith(everyThirdChar, "j__1", obj), undefined);
        assert.equal(pathWith(everyThirdChar, "azsbt5c", null), undefined);
    });

    function squareBrackets(path) {
        return ("" + path).replace(/\[(.*?)\]/g, function (m, path) { //handle case where [1] or ['xa'] may occur
            return "." + path.replace(/^["']|["']$/g, ""); //strip quotes at the start or end of the key
        }).split(".");
    }

    it("takes a function accepting a string returnign an array for path", function() {
        assert.equal(pathWith(squareBrackets, "a['b']['c']", obj), 100);
    });
});
