module.exports = {
  '@@transducer/init': function() { return []; },
  '@@transducer/step': function(acc, x) { return acc.concat([x]); },
  '@@transducer/result': function(x) { return x; }
};
