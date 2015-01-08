Ramda
=============

A practical functional library for Javascript programmers.

[![Build Status](https://travis-ci.org/ramda/ramda.svg?branch=master)](https://travis-ci.org/ramda/ramda)
[![npm module](https://badge.fury.io/js/ramda.svg)](https://www.npmjs.org/package/ramda)
[![dependencies](https://david-dm.org/ramda/ramda.svg)](https://david-dm.org/ramda/ramda)
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/ramda/ramda?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


Why Ramda?
----------

<img src="http://ramda.jcphillipps.com/logo/ramdaFilled_200x235.png" 
     width="170" height="190" align="right" hspace="12" />

There are already several excellent libraries with a functional flavor such as _Underscore_ and _Lo-Dash_. While they are meant to be general-purpose toolkits, suitable for working in multiple paradigms, we created Ramda differently. We wanted a library designed specifically for a functional programming style, one that made it easy to create functional pipelines, one that never mutated user data. 


What's Different?
-----------------

While Ramda includes all of the favorite list-manipulation functions you expect, e.g. `map`, `filter`, `reduce`, `find`, and so forth, Ramda is also significantly different from libraries like _Underscore_ and _Lo-Dash_.

The primary distinguishing features of Ramda are:

* Ramda emphasizes a purer functional style where practical. Immutability and side-effect free functions are at the heart of its design philosophy. This can help you get the job done with simple, elegant code.

* Ramda functions are automatically curried. This allows you to easily build up new functions from old ones simply by not supplying the final parameters.

* The parameters to Ramda functions are arranged to make it convenient for currying. The data to be operated on is generally supplied last.

The last two points together make it very easy to build functions as sequences of simpler functions, each of which transforms the data and passes it along to the next. Ramda is designed to support this style of coding.



Also see [Why Ramda?](http://fr.umio.us/why-ramda/), [Why Curry Helps](http://hughfdjackson.com/javascript/why-curry-helps/) and [Hey Underscore, You're Doing It Wrong!](https://www.youtube.com/watch?v=m3svKOdZijA&app=desktop).


Philosophy
----------
Using this library feels much like using Javascript, for good.
It is practical functional Javascript. We're not introducing
lambda expressions in strings, we're not borrowing consed 
lists, we're not porting over all of the Clojure functions.

Our basic data structures are plain Javascript objects, and our
usual collections are Javascript arrays. We also keep other
native features of Javascript, such as functions as objects
with properties.

While offering similar functionality, Ramda will never be a drop-in
replacement for _Underscore_ / _Lo-Dash_. Ramda is intended to work with a
different style of coding. 

Functional programming is in good part about immutable objects and 
side-effect free functions. While Ramda does *not enforce* this, it
enables such style to be as frictionless as possible.

We aim for an implementation both clean and elegant, but the API is king.
We sacrifice a great deal of implementation elegance for even a slightly
cleaner API.

Last but not least, Ramda strives for performance. A reliable and quick
implementation wins over any notions of functional purity.

Installation
------------

To use with node:

```bash
$ npm install ramda
```

Then in the console:

```javascript
var ramda = require('ramda');
```

To use directly in the browser:

```html
<script src="path/to/yourCopyOf/ramda.js"></script>
```

or the minified version:

```html
<script src="path/to/yourCopyOf/ramda.min.js"></script>
```

or from a CDN, either cdnjs:

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/ramda/0.8.0/ramda.min.js"></script>
```

or one of the below links from [jsDelivr](http://jsdelivr.net):

```html
<script src="//cdn.jsdelivr.net/ramda/0.8.0/ramda.min.js"></script>
<script src="//cdn.jsdelivr.net/ramda/0.8/ramda.min.js"></script>
<script src="//cdn.jsdelivr.net/ramda/latest/ramda.min.js"></script>
```

(note that using `latest` is taking a significant risk that ramda API changes could break your code.)

These script tags add the variable `ramda` on the browser's global scope.

Or you can inject ramda into virtually any unsuspecting web site using this bookmarklet:

```javascript
javascript:(function(){var el=document.createElement('div'),b=document.getElementsByTagName('body')[0];msg='';el.style.position='fixed';el.style.height='32px';el.style.width='220px';el.style.marginLeft='-110px';el.style.top='0';el.style.left='50%';el.style.padding='5px 10px';el.style.zIndex=1001;el.style.fontSize='12px';el.style.color='#222';el.style.backgroundColor='#f99';if(typeof ramda!='undefined'){msg='This page already using ramda v'+ramda.version;return showMsg()}function getScript(url,success){var script=document.createElement('script');script.src=url;var head=document.getElementsByTagName('head')[0],done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=='loaded'||this.readyState=='complete')){done=true;success();script.onload=script.onreadystatechange=null;head.removeChild(script)}};head.appendChild(script)}getScript('http://cdn.jsdelivr.net/ramda/latest/ramda.min.js',function(){if(typeof ramda=='undefined'){msg='Sorry, but Ramda wasn\'t able to load'}else{msg='This page is now Ramda-fied with v'+ramda.version}return showMsg()});function showMsg(){el.innerHTML=msg;b.appendChild(el);window.setTimeout(function(){if(typeof jQuery=='undefined'){b.removeChild(el)}else{jQuery(el).fadeOut('slow',function(){jQuery(this).remove()})}},2500)}})();
```

Documentation
-------------

Please review the [API documentation](http://ramdajs.com/).



Introductions
-------------

* [Introducing Ramda](http://buzzdecafe.github.io/code/2014/05/16/introducing-ramda/) by Buzz de Cafe
* [Why Ramda?](http://fr.umio.us/why-ramda/) by Scott Sauyet
* [Favoring Curry](http://fr.umio.us/favoring-curry/) by Scott Sauyet



The Name
--------

Ok, so we like sheep.  That's all.  It's a short name, not already 
taken.  It could as easily have been `eweda`, but then we would be 
forced to say _eweda lamb!_, and no one wants that.  For non-English 
speakers, lambs are baby sheep, ewes are female sheep, and rams are male 
sheep.  So perhaps ramda is a grown-up lambda... but probably not.




Running The Test Suite
----------------------

**Console:**

To run the test suite from the console, you need to have `mocha` installed:

    npm install -g mocha

Then from the root of the project, you can just call

    mocha

Alternately, if you've installed the dependencies, via:

    npm install
    npm install -g grunt-cli

then you can run the tests (and get more detailed output) via our `grunt`
task:

    grunt test

**Browser:**

To run the test suite in the browser, you can simply open `test/index.html`.

Alternatively, you can use [testem](https://github.com/airportyh/testem) to
test across different browsers (or even headlessly), with livereloading of
tests too. Install testem (`npm install -g testem`) and run `testem`. Open the
link provided in your browser and you will see the results in your terminal.

If you have _PhantomJS_ installed, you can run `testem -l phantomjs` to run the
tests completely headlessly.

![ramda on sauce labs](https://saucelabs.com/browser-matrix/ramda.svg)




Acknowledgements
-----------------

Thanks to [J. C. Phillipps](http://www.jcphillipps.com) for the Ramda logo.
Ramda logo artwork &copy; 2014 J. C. Phillipps. Licensed Creative Commons 
[CC BY-NC-SA 3.0](http://creativecommons.org/licenses/by-nc-sa/3.0/).
