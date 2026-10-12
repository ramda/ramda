var R = require('../source/index.js');
var eq = require('./shared/eq.js');

var they = it;

var fromPosJson = R.pipe(JSON.parse, value => ({ x: Number.parseFloat(value['@x']), y: Number.parseFloat(value['@y']) }));
var toPosJson = R.pipe(v => ({ '@x': v.x.toString(), '@y': v.y.toString() }), JSON.stringify);


var positionJsonLens = R.lensIso(fromPosJson, toPosJson);
var foobarLens = R.lensProp('foobar');

var objLens = R.compose(foobarLens, positionJsonLens);

var obj = {
  foobar: '{"@x":"4","@y":"2"}'
};


describe('lensIso :: view, set, over', function() {
  they('view', function() {
    eq(R.view(objLens, obj), { x: 4, y: 2 });
  });

  they('set', function() {
    const newObj = R.set(objLens, { x: 1, y: 100 }, obj);
    eq(newObj, {
      foobar: '{"@x":"1","@y":"100"}'
    });
  });

  they('over', function() {
    const newObj = R.over(objLens, R.map(x => x * 2), obj);
    eq(newObj, {
      foobar: '{"@x":"8","@y":"4"}'
    });
  });
});
