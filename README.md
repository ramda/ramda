Project Ramda
=============

A practical functional library for Javascript programmers.

[![Build Status](https://travis-ci.org/CrossEye/ramda.svg?branch=master)](https://travis-ci.org/CrossEye/ramda)

Goals
-----

<img src="http://ramda.jcphillipps.com/logo/ramdaFilled_200x235.png" 
     width="200" height="235" align="left" hspace="12" />
Using this library should feel as much like using Javascript as 
possible.  Of course it's functional Javascript, but we're not 
introducing lambda expressions in strings, we're not borrowing consed 
lists, we're not porting over all of the Clojure functions.

Our basic data structures will be normal Javascript objects, and our 
usual collections will be Javascript arrays.  We will not try to reach 
the point where all the functions have only zero, one, or two arguments.
We will certainly try to keep some of the normal features of Javascript 
that seem to be unusual in functional languages, including variable 
length function signatures and functions as objects with properties.

Ramda will never be a drop-in replacement for Underscore (or LoDash, or 
even a drop-in-and-mechanically-switch-the-parameter-order-everywhere 
replacement.) It is intended to work with a different style of coding. 
Functional programming is in good part about immutable objects and 
side-effect free functions. While Ramda does not expect to do anything to 
*enforce* that style, its code should always work to make that style as 
frictionless as possible.

As much as we can, we would like the implementation to be both clean and 
elegant.  But the API is king: we will sacrifice a great deal of 
implementation elegance for even a slightly cleaner API.

Unlike the developers of that silly-named _Eweda_ project, though, this 
one will focus also on performance, striving for a reliable and quick 
implementation over any notions of functional purity.

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
<script src="//cdnjs.cloudflare.com/ajax/libs/ramda/0.5.0/ramda.min.js"></script>
```

or one of the below links from [jsDelivr](http://jsdelivr.net):

```html
<script src="//cdn.jsdelivr.net/ramda/0.5.0/ramda.min.js"></script>
<script src="//cdn.jsdelivr.net/ramda/0.5/ramda.min.js"></script>
<script src="//cdn.jsdelivr.net/ramda/latest/ramda.min.js"></script>
```

(note that using `latest` is taking a significant risk that ramda API changes could break your code.)

These script tags add the variable `ramda` on the browser's global scope.


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



Structure
---------

### Automatic Currying ###

The functions included should automatically allow for partial 
application without an explicit call to lPartial.  Many of these operate 
on lists.  A single list parameter should probably come last, which 
might conflict with the design of other libraries that have strong 
functional components (I'm looking at you Underscore!)

The idea is that, if foldl has this signature:


```javascript
var foldl = function(fn, accum, arr) { /* ... */}
```

and we have this simple function:

```javascript
var add = function(a, b) {return a + b;};
```

then, instead of having to manually call lPartial like this:

```javascript
var sum = lPartial(foldl, add, 0);
var total = sum([1, 2, 3, 4]);
```

with ramda, we can just do this:

```javascript
var sum = foldl(add, 0);
var total = sum([1, 2, 3, 4]);
```


Running The Test Suite
----------------------

To run the test suite, you can simply open `test/index.html` in your browser.

Alternatively, you can use [testem](https://github.com/airportyh/testem) to
test across different browsers (or even headlessly), with livereloading of
tests too. Install testem (`npm install -g testem`) and run `testem`. Open the
link provided in your browser and you will see the results in your terminal.

If you have PhantomJS installed, you can run `testem -l phantomjs` to run the
tests completely headlessly.

![ramda on sauce labs](https://saucelabs.com/browser-matrix/ramda.svg)


So What's With Eweda?
---------------------

The [eweda library](https://github.com/CrossEye/eweda) was written by 
the developers of this library, with similar goals.  But that one strove 
more for implementation elegance than for practical capabilities.  Ramda 
is all about giving users real-world tools.  Eweda can be seen more as 
an academic excercise, mostly proving out what does and doesn't work, and 
doing so as elegantly as possible.

Acknowledgements
-----------------

Thanks to [J. C. Phillipps](http://www.jcphillipps.com) for the Ramda logo.
Ramda logo artwork &copy; 2014 J. C. Phillipps. Licensed Creative Commons 
[CC BY-NC-SA 3.0](http://creativecommons.org/licenses/by-nc-sa/3.0/).
