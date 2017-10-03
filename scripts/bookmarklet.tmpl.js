/* eslint-env browser */
/* global ramda:false */
(function(window, document) {
  var version = '???';

  if (typeof window.R !== 'undefined') {
    return showMsg('This page already using ramda');
  }
  /* eslint-disable space-before-blocks */
  /* eslint-disable semi */
  {{{ramda}}}
  version = '{{{version}}}';
  /* eslint-enable semi */
  /* eslint-enable space-before-blocks */
  showMsg('Ramda v' + version + ' loaded');

  function showMsg(msg) {
    var toast = document.createElement('div');
    var b = document.body;

    toast.innerHTML = msg;

    toast.style.position  = 'fixed';
    toast.style.top  = '20px';
    toast.style.right  = '20px';
    toast.style.padding  = '5px 10px';
    toast.style.zIndex  = '1001';
    toast.style.fontSize  = '18px';
    toast.style.color  = '#222';
    toast.style.backgroundColor  = '#DFF2BF';
    toast.style.textAlign = 'center';
    toast.style.border = 'solid 2px black';
    toast.style.borderRadius = '25px';

    b.appendChild(toast);
    window.setTimeout(b.removeChild.bind(b, toast), 2500);
  }

}(window, document));
