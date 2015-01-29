var assert = require('assert');

var R = require('..');


describe('construct', function() {
    var Rectangle = function(w, h) {this.width = w; this.height = h;};
    Rectangle.prototype.area = function() {return this.width * this.height;};

    it('turns a constructor function into one that can be called without `new`', function() {
        var rect = R.construct(Rectangle);
        var r1 = rect(3, 4);
        assert(r1 instanceof Rectangle);
        assert.strictEqual(r1.width, 3);
        assert.strictEqual(r1.area(), 12);

        var regex = R.construct(RegExp);
        var word = regex('word', 'gi');
        assert(word instanceof RegExp);
        assert.strictEqual(word.source, 'word');
        assert.strictEqual(word.global, true);
    });

    it('can be used to create Date object', function() {
        var date = R.construct(Date)(1984, 3, 26, 0, 0, 0, 0);
        assert(date instanceof Date);
        assert.strictEqual(date.getFullYear(), 1984);
    });

    it('supports constructors with no arguments', function() {
        function Foo() {}
        var foo = R.construct(Foo)();
        assert(foo instanceof Foo);
    });

    it('does not support constructor with greater than ten arguments', function() {
        assert.throws(function() {
            function Foo($0, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) {
                this.eleventh = $10;
            }
            R.construct(Foo);
        }, function(err) {
            return (err instanceof Error &&
                    err.message === 'Constructor with greater than ten arguments');
        });
    });

    it('returns a curried function', function() {
        var rect = R.construct(Rectangle);
        var rect3 = rect(3);
        var r1 = rect3(4);
        assert(r1 instanceof Rectangle);
        assert.strictEqual(r1.width, 3);
        assert.strictEqual(r1.height, 4);
        assert.strictEqual(r1.area(), 12);

        var regex = R.construct(RegExp);
        var word = regex('word');
        var complete = word('gi');
        assert(complete instanceof RegExp);
        assert.strictEqual(complete.source, 'word');
        assert.strictEqual(complete.global, true);
    });
});
