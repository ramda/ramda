
module.exports = {
  isNil: function(x) { 
    return x === null || x === undefined || x !== x; // crazy NaN check
  },
  returnThis : function () {
      return this;
  }
};


