;(function(f) {

  'use strict';

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f(require('sanctuary-def'));
  } else if (typeof define === 'function' && define.amd != null) {
    define(['sanctuary-def'], f);
  } else {
    self.R = f(self.sanctuaryDef);
  }

}(function($) {

  'use strict';

  /* global R */
  /* eslint-env amd */

  /* TEST_ENTRY_POINT */

  return R;

}));
