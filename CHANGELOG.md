## 0.10.0

Breaking changes:

  - `R.mixin` removed (renamed to `R.merge`)
  - `R.foldl` removed (renamed to `R.reduce`)
  - `R.foldr` removed (renamed to `R.reduceRight`)

Additions:

  - [R.merge](http://ramdajs.com/docs/#merge) (formerly `R.mixin`)
  - [R.mergeAll](http://ramdajs.com/docs/#mergeAll)
  - [R.dissoc](http://ramdajs.com/docs/#dissoc)
  - [R.defaultTo](http://ramdajs.com/docs/#defaultTo)
  - [R.reduce](http://ramdajs.com/docs/#reduce) (formerly `R.foldl`)
  - [R.reduceIndexed](http://ramdajs.com/docs/#reduceIndexed) (formerly `R.foldl`)
  - [R.reduceRight](http://ramdajs.com/docs/#reduceRight) (formerly `R.foldrIndexed`)
  - [R.reduceRightIndexed](http://ramdajs.com/docs/#reduceRightIndexed) (formerly `R.foldrIndexed`)

Bugfixes:

  - R.invert now ignores inherited properties.
  - R.sortBy preserves object identity.

