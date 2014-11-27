//  Ramda
//  https://github.com/ramda/ramda
//  (c) 2013-2014 Scott Sauyet and Michael Hurley
//  Ramda may be freely distributed under the MIT license.

;(function() {

    'use strict';

    /* global R */

    if (typeof exports === 'object') {
        module.exports = R;
    } else if (typeof define === 'function' && define.amd) {
        define(function() { return R; });
    } else {
        this.R = R;
    }

}.call(this));
