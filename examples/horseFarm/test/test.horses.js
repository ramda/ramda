var assert = require("assert");
var farm = require("./../farm");
var model = global["model"];


describe('horses', function() {
    it('should correctly describe the horses', function() {
        assert.equal(17, farm.horses.length);
    });
});

describe('model basics', function() {
    it('should be able to count the horses per paddock', function() {
        var paddockOverview = model.getPaddockOverview(farm);
        assert.equal(3, paddockOverview['Up Top'].horses.length);
    });
});
