# Tracking Bit Components - Ramda Example

This repository's components were exported as [Bit](https://docs.bitsrc.io/docs/what-is-bit.html) components.

If you wish to follow the instructions, please delete the `bit.json` and `.bitmap` files after cloning the repository.

This is how we did it:

```bash
$ bit init
successfully initialized an empty bit scope.
```

The [bit init](https://docs.bitsrc.io/docs/cli-init.html) command has intialized a [local Bit scope](https://docs.bitsrc.io/docs/what-is-bit.html#what-is-a-scope-collection) and created a [bit.json](https://docs.bitsrc.io/docs/conf-bit-json.html) file.

Next, we wanted to [track](https://docs.bitsrc.io/docs/isolating-and-tracking-components.html) the `add` component as a Bit component.

```bash
$ bit add source/add.js --namespace utils
tracking component utils/add:
added source/add.js
```

After tracking, [checking the status](https://docs.bitsrc.io/docs/cli-status.html) will prompt the following result:

```bash
$ bit status
new components
     > utils/add... missing dependencies
       untracked file dependencies: source/internal/_curry2.js



no modified components


no staged components


no auto-tag pending components


no deleted components
```

Bit warns us that the `utils/add` component has an [untracked file dependency](https://docs.bitsrc.io/docs/isolating-and-tracking-components.html#tracking-a-component-with-dependencies) - this means that the component requires another file that is not tracked by Bit. We can either track the file as part of the existing component, or decide to track a new component, which is what we would do:

```bash
$ bit add source/internal/_curry2.js
tracking component internal/_curry2:
added source/internal/_curry2.js
```

Now let's check that status again:

```bash
$ bit status
new components
     > utils/add... ok
     > internal/_curry2... missing dependencies
       untracked file dependencies: source/internal/_curry1.js, source/internal/_isPlaceholder.js



no modified components


no staged components


no auto-tag pending components


no deleted components
```

Now our new component has two [untracked file dependencies](https://docs.bitsrc.io/docs/isolating-and-tracking-components.html#tracking-a-component-with-dependencies), both in the `internal` directory. Well, let's just [track](https://docs.bitsrc.io/docs/isolating-and-tracking-components.html) all the internal components:

```bash
$ bit add source/internal/*.js
tracking 73 new components
```

What's the status now?

```bash
bit status
new components
     > internal/_aperture... ok
     > internal/_arity... ok
     > internal/_array-from-iterator... ok
     > internal/_check-for-method... ok
     > internal/_clone-reg-exp... ok
     > internal/_complement... ok
     > internal/_concat... ok
     > internal/_contains... ok
     > internal/_contains-with... ok
     > internal/_create-partial-applicator... ok
     > internal/_curry-n... ok
     > internal/_curry1... ok
     > internal/_curry2... ok
     > internal/_curry3... ok
     > internal/_dispatchable... ok
     > internal/_filter... ok
     > internal/_flat-cat... ok
     > internal/_force-reduced... ok
     > internal/_function-name... ok
     > internal/_functions-with... ok
     > internal/_has... ok
     > internal/_identity... ok
     > internal/_is-arguments... ok
     > internal/_is-array... ok
     > internal/_is-array-like... ok
     > internal/_is-function... ok
     > internal/_is-integer... ok
     > internal/_is-number... ok
     > internal/_is-object... ok
     > internal/_is-placeholder... ok
     > internal/_is-reg-exp... ok
     > internal/_is-string... ok
     > internal/_is-transformer... ok
     > internal/_make-flat... ok
     > internal/_map... ok
     > internal/_object-assign... ok
     > internal/_object-is... ok
     > internal/_of... ok
     > internal/_pipe... ok
     > internal/_pipe-p... ok
     > internal/_quote... ok
     > internal/_reduced... ok
     > internal/_set... ok
     > internal/_to-iso-string... ok
     > internal/_xall... ok
     > internal/_xany... ok
     > internal/_xaperture... ok
     > internal/_xdrop... ok
     > internal/_xdrop-last... ok
     > internal/_xdrop-last-while... ok
     > internal/_xdrop-repeats-with... ok
     > internal/_xdrop-while... ok
     > internal/_xf-base... ok
     > internal/_xfilter... ok
     > internal/_xfind... ok
     > internal/_xfind-index... ok
     > internal/_xfind-last... ok
     > internal/_xfind-last-index... ok
     > internal/_xmap... ok
     > internal/_xreduce-by... ok
     > internal/_xtake... ok
     > internal/_xtake-while... ok
     > internal/_xtap... ok
     > internal/_xwrap... ok
     > utils/add... ok
     > internal/_clone... missing dependencies
       untracked file dependencies: source/type.js

     > internal/_drop-last... missing dependencies
       untracked file dependencies: source/take.js

     > internal/_drop-last-while... missing dependencies
       untracked file dependencies: source/slice.js

     > internal/_equals... missing dependencies
       untracked file dependencies: source/keys.js, source/type.js

     > internal/_index-of... missing dependencies
       untracked file dependencies: source/equals.js

     > internal/_reduce... missing dependencies
       untracked file dependencies: source/bind.js

     > internal/_step-cat... missing dependencies
       untracked file dependencies: source/objOf.js

     > internal/_to-string... missing dependencies
       untracked file dependencies: source/keys.js, source/reject.js

     > internal/_xchain... missing dependencies
       untracked file dependencies: source/map.js



no modified components


no staged components


no auto-tag pending components


no deleted components
```

We can see all the internal components are now tracked, but some of them have [untracked file dependencies](https://docs.bitsrc.io/docs/isolating-and-tracking-components.html#tracking-a-component-with-dependencies) within the main components diretory. Let's tell Bit to track those too:

```bash
$ bit add source/*.js --namespace utils
tracking 249 new components
```

If we [check the status](https://docs.bitsrc.io/docs/cli-status.html), we can see Bit is now tracking all the Ramda components, and all is well:

```bash
bit status
new components
     > internal/_aperture... ok
     > internal/_arity... ok
     > internal/_array-from-iterator... ok
     > internal/_check-for-method... ok
     > internal/_clone... ok
     > internal/_clone-reg-exp... ok
     > internal/_complement... ok
     > internal/_concat... ok
     > internal/_contains... ok
     > internal/_contains-with... ok
     > internal/_create-partial-applicator... ok
     > internal/_curry-n... ok
     > internal/_curry1... ok
     > internal/_curry2... ok
     > internal/_curry3... ok
     > internal/_dispatchable... ok
     > internal/_drop-last... ok
     > internal/_drop-last-while... ok
     > internal/_equals... ok
     > internal/_filter... ok
     > internal/_flat-cat... ok
     > internal/_force-reduced... ok
     > internal/_function-name... ok
     > internal/_functions-with... ok
     > internal/_has... ok
     > internal/_identity... ok
     > internal/_index-of... ok
     > internal/_is-arguments... ok
     > internal/_is-array... ok
     > internal/_is-array-like... ok
     > internal/_is-function... ok
     > internal/_is-integer... ok
     > internal/_is-number... ok
     > internal/_is-object... ok
     > internal/_is-placeholder... ok
     > internal/_is-reg-exp... ok
     > internal/_is-string... ok
     > internal/_is-transformer... ok
     > internal/_make-flat... ok
     > internal/_map... ok
     > internal/_object-assign... ok
     > internal/_object-is... ok
     > internal/_of... ok
     > internal/_pipe... ok
     > internal/_pipe-p... ok
     > internal/_quote... ok
     > internal/_reduce... ok
     > internal/_reduced... ok
     > internal/_set... ok
     > internal/_step-cat... ok
     > internal/_to-iso-string... ok
     > internal/_to-string... ok
     > internal/_xall... ok
     > internal/_xany... ok
     > internal/_xaperture... ok
     > internal/_xchain... ok
     > internal/_xdrop... ok
     > internal/_xdrop-last... ok
     > internal/_xdrop-last-while... ok
     > internal/_xdrop-repeats-with... ok
     > internal/_xdrop-while... ok
     > internal/_xf-base... ok
     > internal/_xfilter... ok
     > internal/_xfind... ok
     > internal/_xfind-index... ok
     > internal/_xfind-last... ok
     > internal/_xfind-last-index... ok
     > internal/_xmap... ok
     > internal/_xreduce-by... ok
     > internal/_xtake... ok
     > internal/_xtake-while... ok
     > internal/_xtap... ok
     > internal/_xwrap... ok
     > utils/add... ok
     > utils/add-index... ok
     > utils/adjust... ok
     > utils/all... ok
     > utils/all-pass... ok
     > utils/always... ok
     > utils/and... ok
     > utils/any... ok
     > utils/any-pass... ok
     > utils/ap... ok
     > utils/aperture... ok
     > utils/append... ok
     > utils/apply... ok
     > utils/apply-spec... ok
     > utils/apply-to... ok
     > utils/ascend... ok
     > utils/assoc... ok
     > utils/assoc-path... ok
     > utils/binary... ok
     > utils/bind... ok
     > utils/both... ok
     > utils/call... ok
     > utils/chain... ok
     > utils/clamp... ok
     > utils/clone... ok
     > utils/comparator... ok
     > utils/complement... ok
     > utils/compose... ok
     > utils/compose-k... ok
     > utils/compose-p... ok
     > utils/concat... ok
     > utils/cond... ok
     > utils/construct... ok
     > utils/construct-n... ok
     > utils/contains... ok
     > utils/converge... ok
     > utils/count-by... ok
     > utils/curry... ok
     > utils/curry-n... ok
     > utils/dec... ok
     > utils/default-to... ok
     > utils/descend... ok
     > utils/difference... ok
     > utils/difference-with... ok
     > utils/dissoc... ok
     > utils/dissoc-path... ok
     > utils/divide... ok
     > utils/drop... ok
     > utils/drop-last... ok
     > utils/drop-last-while... ok
     > utils/drop-repeats... ok
     > utils/drop-repeats-with... ok
     > utils/drop-while... ok
     > utils/either... ok
     > utils/empty... ok
     > utils/ends-with... ok
     > utils/eq-by... ok
     > utils/eq-props... ok
     > utils/equals... ok
     > utils/evolve... ok
     > utils/f... ok
     > utils/filter... ok
     > utils/find... ok
     > utils/find-index... ok
     > utils/find-last... ok
     > utils/find-last-index... ok
     > utils/flatten... ok
     > utils/flip... ok
     > utils/for-each... ok
     > utils/for-each-obj-indexed... ok
     > utils/from-pairs... ok
     > utils/group-by... ok
     > utils/group-with... ok
     > utils/gt... ok
     > utils/gte... ok
     > utils/has... ok
     > utils/has-in... ok
     > utils/head... ok
     > utils/identical... ok
     > utils/identity... ok
     > utils/if-else... ok
     > utils/inc... ok
     > utils/index... ok
     > utils/index-by... ok
     > utils/index-of... ok
     > utils/init... ok
     > utils/inner-join... ok
     > utils/insert... ok
     > utils/insert-all... ok
     > utils/intersection... ok
     > utils/intersperse... ok
     > utils/into... ok
     > utils/invert... ok
     > utils/invert-obj... ok
     > utils/invoker... ok
     > utils/is... ok
     > utils/is-empty... ok
     > utils/is-nil... ok
     > utils/join... ok
     > utils/juxt... ok
     > utils/keys... ok
     > utils/keys-in... ok
     > utils/last... ok
     > utils/last-index-of... ok
     > utils/length... ok
     > utils/lens... ok
     > utils/lens-index... ok
     > utils/lens-path... ok
     > utils/lens-prop... ok
     > utils/lift... ok
     > utils/lift-n... ok
     > utils/lt... ok
     > utils/lte... ok
     > utils/map... ok
     > utils/map-accum... ok
     > utils/map-accum-right... ok
     > utils/map-obj-indexed... ok
     > utils/match... ok
     > utils/math-mod... ok
     > utils/max... ok
     > utils/max-by... ok
     > utils/mean... ok
     > utils/median... ok
     > utils/memoize... ok
     > utils/memoize-with... ok
     > utils/merge... ok
     > utils/merge-all... ok
     > utils/merge-deep-left... ok
     > utils/merge-deep-right... ok
     > utils/merge-deep-with... ok
     > utils/merge-deep-with-key... ok
     > utils/merge-left... ok
     > utils/merge-right... ok
     > utils/merge-with... ok
     > utils/merge-with-key... ok
     > utils/min... ok
     > utils/min-by... ok
     > utils/modulo... ok
     > utils/multiply... ok
     > utils/n-ary... ok
     > utils/negate... ok
     > utils/none... ok
     > utils/not... ok
     > utils/nth... ok
     > utils/nth-arg... ok
     > utils/o... ok
     > utils/obj-of... ok
     > utils/of... ok
     > utils/omit... ok
     > utils/once... ok
     > utils/or... ok
     > utils/over... ok
     > utils/pair... ok
     > utils/partial... ok
     > utils/partial-right... ok
     > utils/partition... ok
     > utils/path... ok
     > utils/path-eq... ok
     > utils/path-or... ok
     > utils/path-satisfies... ok
     > utils/pick... ok
     > utils/pick-all... ok
     > utils/pick-by... ok
     > utils/pipe... ok
     > utils/pipe-k... ok
     > utils/pipe-p... ok
     > utils/pluck... ok
     > utils/prepend... ok
     > utils/product... ok
     > utils/project... ok
     > utils/prop... ok
     > utils/prop-eq... ok
     > utils/prop-is... ok
     > utils/prop-or... ok
     > utils/prop-satisfies... ok
     > utils/props... ok
     > utils/range... ok
     > utils/reduce... ok
     > utils/reduce-by... ok
     > utils/reduce-right... ok
     > utils/reduce-while... ok
     > utils/reduced... ok
     > utils/reject... ok
     > utils/remove... ok
     > utils/repeat... ok
     > utils/replace... ok
     > utils/reverse... ok
     > utils/scan... ok
     > utils/sequence... ok
     > utils/set... ok
     > utils/slice... ok
     > utils/sort... ok
     > utils/sort-by... ok
     > utils/sort-with... ok
     > utils/split... ok
     > utils/split-at... ok
     > utils/split-every... ok
     > utils/split-when... ok
     > utils/starts-with... ok
     > utils/subtract... ok
     > utils/sum... ok
     > utils/symmetric-difference... ok
     > utils/symmetric-difference-with... ok
     > utils/t... ok
     > utils/tail... ok
     > utils/take... ok
     > utils/take-last... ok
     > utils/take-last-while... ok
     > utils/take-while... ok
     > utils/tap... ok
     > utils/test... ok
     > utils/times... ok
     > utils/to-lower... ok
     > utils/to-pairs... ok
     > utils/to-pairs-in... ok
     > utils/to-string... ok
     > utils/to-upper... ok
     > utils/transduce... ok
     > utils/transpose... ok
     > utils/traverse... ok
     > utils/trim... ok
     > utils/try-catch... ok
     > utils/type... ok
     > utils/unapply... ok
     > utils/unary... ok
     > utils/uncurry-n... ok
     > utils/unfold... ok
     > utils/union... ok
     > utils/union-with... ok
     > utils/uniq... ok
     > utils/uniq-by... ok
     > utils/uniq-with... ok
     > utils/unless... ok
     > utils/unnest... ok
     > utils/until... ok
     > utils/update... ok
     > utils/use-with... ok
     > utils/values... ok
     > utils/values-in... ok
     > utils/view... ok
     > utils/when... ok
     > utils/where... ok
     > utils/where-eq... ok
     > utils/without... ok
     > utils/xprod... ok
     > utils/zip... ok
     > utils/zip-obj... ok
     > utils/zip-with... ok
     > utils/__... ok


no modified components


no staged components


no auto-tag pending components


no deleted components
```

Next, we'll [import a build environment](https://docs.bitsrc.io/docs/building-components.html#defining-a-default-compiler-for-your-project), so the components will be built properly:

```bash
$ bit import bit.envs/compilers/babel --compiler
the following component environments were installed
- bit.envs/compilers/babel@0.0.7
```

Next, we'll [tag](https://docs.bitsrc.io/docs/versioning-tracked-components.html) and [export](https://docs.bitsrc.io/docs/cli-export.html) the components to a [scope on bitsrc.io](https://bitsrc.io/bit/ramda).

```bash
$ bit tag --all 1.0.0
322 components tagged | 322 added, 0 changed, 0 auto-tagged
added components:  utils/add@1.0.0, internal/_curry2@1.0.0, internal/_set@1.0.0, internal/_aperture@1.0.0, internal/_arity@1.0.0, internal/_array-from-iterator@1.0.0, internal/_check-for-method@1.0.0, internal/_clone@1.0.0, internal/_clone-reg-exp@1.0.0, internal/_complement@1.0.0, internal/_concat@1.0.0, internal/_contains@1.0.0, internal/_contains-with@1.0.0, internal/_create-partial-applicator@1.0.0, internal/_curry1@1.0.0, internal/_curry3@1.0.0, internal/_curry-n@1.0.0, internal/_dispatchable@1.0.0, internal/_drop-last@1.0.0, internal/_drop-last-while@1.0.0, internal/_equals@1.0.0, internal/_filter@1.0.0, internal/_flat-cat@1.0.0, internal/_force-reduced@1.0.0, internal/_function-name@1.0.0, internal/_functions-with@1.0.0, internal/_has@1.0.0, internal/_identity@1.0.0, internal/_index-of@1.0.0, internal/_is-arguments@1.0.0, internal/_is-array@1.0.0, internal/_is-array-like@1.0.0, internal/_is-function@1.0.0, internal/_is-integer@1.0.0, internal/_is-number@1.0.0, internal/_is-object@1.0.0, internal/_is-placeholder@1.0.0, internal/_is-reg-exp@1.0.0, internal/_is-string@1.0.0, internal/_is-transformer@1.0.0, internal/_make-flat@1.0.0, internal/_map@1.0.0, internal/_object-assign@1.0.0, internal/_object-is@1.0.0, internal/_of@1.0.0, internal/_pipe@1.0.0, internal/_pipe-p@1.0.0, internal/_quote@1.0.0, internal/_reduce@1.0.0, internal/_reduced@1.0.0, internal/_step-cat@1.0.0, internal/_to-iso-string@1.0.0, internal/_to-string@1.0.0,internal/_xall@1.0.0, internal/_xany@1.0.0, internal/_xaperture@1.0.0, internal/_xchain@1.0.0, internal/_xdrop@1.0.0, internal/_xdrop-last@1.0.0, internal/_xdrop-last-while@1.0.0, internal/_xdrop-repeats-with@1.0.0, internal/_xdrop-while@1.0.0, internal/_xf-base@1.0.0, internal/_xfilter@1.0.0, internal/_xfind@1.0.0, internal/_xfind-index@1.0.0, internal/_xfind-last@1.0.0, internal/_xfind-last-index@1.0.0, internal/_xmap@1.0.0, internal/_xreduce-by@1.0.0, internal/_xtake@1.0.0, internal/_xtake-while@1.0.0, internal/_xtap@1.0.0, internal/_xwrap@1.0.0, utils/f@1.0.0, utils/t@1.0.0, utils/__@1.0.0, utils/add-index@1.0.0, utils/adjust@1.0.0, utils/all@1.0.0, utils/all-pass@1.0.0, utils/always@1.0.0, utils/and@1.0.0, utils/any@1.0.0, utils/any-pass@1.0.0, utils/ap@1.0.0, utils/aperture@1.0.0, utils/append@1.0.0, utils/apply@1.0.0, utils/apply-spec@1.0.0, utils/apply-to@1.0.0, utils/ascend@1.0.0, utils/assoc@1.0.0, utils/assoc-path@1.0.0, utils/binary@1.0.0, utils/bind@1.0.0, utils/both@1.0.0, utils/call@1.0.0, utils/chain@1.0.0, utils/clamp@1.0.0, utils/clone@1.0.0, utils/comparator@1.0.0, utils/complement@1.0.0, utils/compose@1.0.0, utils/compose-k@1.0.0, utils/compose-p@1.0.0, utils/concat@1.0.0, utils/cond@1.0.0, utils/construct@1.0.0, utils/construct-n@1.0.0, utils/contains@1.0.0, utils/converge@1.0.0, utils/count-by@1.0.0, utils/curry@1.0.0, utils/curry-n@1.0.0, utils/dec@1.0.0, utils/default-to@1.0.0, utils/descend@1.0.0, utils/difference@1.0.0, utils/difference-with@1.0.0, utils/dissoc@1.0.0, utils/dissoc-path@1.0.0, utils/divide@1.0.0, utils/drop@1.0.0, utils/drop-last@1.0.0, utils/drop-last-while@1.0.0, utils/drop-repeats@1.0.0, utils/drop-repeats-with@1.0.0, utils/drop-while@1.0.0, utils/either@1.0.0, utils/empty@1.0.0, utils/ends-with@1.0.0, utils/eq-by@1.0.0, utils/eq-props@1.0.0, utils/equals@1.0.0, utils/evolve@1.0.0, utils/filter@1.0.0, utils/find@1.0.0, utils/find-index@1.0.0, utils/find-last@1.0.0, utils/find-last-index@1.0.0, utils/flatten@1.0.0, utils/flip@1.0.0, utils/for-each@1.0.0, utils/for-each-obj-indexed@1.0.0, utils/from-pairs@1.0.0, utils/group-by@1.0.0, utils/group-with@1.0.0, utils/gt@1.0.0, utils/gte@1.0.0, utils/has@1.0.0, utils/has-in@1.0.0, utils/head@1.0.0, utils/identical@1.0.0, utils/identity@1.0.0, utils/if-else@1.0.0, utils/inc@1.0.0, utils/index@1.0.0, utils/index-by@1.0.0, utils/index-of@1.0.0, utils/init@1.0.0, utils/inner-join@1.0.0, utils/insert@1.0.0, utils/insert-all@1.0.0, utils/intersection@1.0.0, utils/intersperse@1.0.0, utils/into@1.0.0, utils/invert@1.0.0, utils/invert-obj@1.0.0, utils/invoker@1.0.0, utils/is@1.0.0, utils/is-empty@1.0.0, utils/is-nil@1.0.0, utils/join@1.0.0, utils/juxt@1.0.0, utils/keys@1.0.0, utils/keys-in@1.0.0, utils/last@1.0.0, utils/last-index-of@1.0.0, utils/length@1.0.0, utils/lens@1.0.0, utils/lens-index@1.0.0, utils/lens-path@1.0.0, utils/lens-prop@1.0.0, utils/lift@1.0.0, utils/lift-n@1.0.0, utils/lt@1.0.0, utils/lte@1.0.0, utils/map@1.0.0, utils/map-accum@1.0.0, utils/map-accum-right@1.0.0, utils/map-obj-indexed@1.0.0, utils/match@1.0.0, utils/math-mod@1.0.0, utils/max@1.0.0, utils/max-by@1.0.0, utils/mean@1.0.0, utils/median@1.0.0, utils/memoize@1.0.0, utils/memoize-with@1.0.0, utils/merge@1.0.0, utils/merge-all@1.0.0, utils/merge-deep-left@1.0.0, utils/merge-deep-right@1.0.0, utils/merge-deep-with@1.0.0, utils/merge-deep-with-key@1.0.0, utils/merge-left@1.0.0, utils/merge-right@1.0.0, utils/merge-with@1.0.0, utils/merge-with-key@1.0.0, utils/min@1.0.0, utils/min-by@1.0.0, utils/modulo@1.0.0, utils/multiply@1.0.0, utils/n-ary@1.0.0, utils/negate@1.0.0, utils/none@1.0.0, utils/not@1.0.0, utils/nth@1.0.0, utils/nth-arg@1.0.0, utils/o@1.0.0, utils/obj-of@1.0.0, utils/of@1.0.0, utils/omit@1.0.0, utils/once@1.0.0, utils/or@1.0.0, utils/over@1.0.0, utils/pair@1.0.0, utils/partial@1.0.0, utils/partial-right@1.0.0, utils/partition@1.0.0, utils/path@1.0.0, utils/path-eq@1.0.0, utils/path-or@1.0.0, utils/path-satisfies@1.0.0, utils/pick@1.0.0, utils/pick-all@1.0.0, utils/pick-by@1.0.0, utils/pipe@1.0.0, utils/pipe-k@1.0.0, utils/pipe-p@1.0.0, utils/pluck@1.0.0, utils/prepend@1.0.0, utils/product@1.0.0, utils/project@1.0.0, utils/prop@1.0.0, utils/prop-eq@1.0.0, utils/prop-is@1.0.0, utils/prop-or@1.0.0, utils/prop-satisfies@1.0.0, utils/props@1.0.0, utils/range@1.0.0, utils/reduce@1.0.0, utils/reduce-by@1.0.0, utils/reduce-right@1.0.0, utils/reduce-while@1.0.0, utils/reduced@1.0.0, utils/reject@1.0.0, utils/remove@1.0.0, utils/repeat@1.0.0, utils/replace@1.0.0, utils/reverse@1.0.0, utils/scan@1.0.0, utils/sequence@1.0.0, utils/set@1.0.0, utils/slice@1.0.0, utils/sort@1.0.0, utils/sort-by@1.0.0, utils/sort-with@1.0.0, utils/split@1.0.0, utils/split-at@1.0.0, utils/split-every@1.0.0, utils/split-when@1.0.0, utils/starts-with@1.0.0, utils/subtract@1.0.0, utils/sum@1.0.0, utils/symmetric-difference@1.0.0, utils/symmetric-difference-with@1.0.0, utils/tail@1.0.0, utils/take@1.0.0, utils/take-last@1.0.0, utils/take-last-while@1.0.0, utils/take-while@1.0.0, utils/tap@1.0.0, utils/test@1.0.0, utils/times@1.0.0, utils/to-lower@1.0.0, utils/to-pairs@1.0.0, utils/to-pairs-in@1.0.0, utils/to-string@1.0.0, utils/to-upper@1.0.0, utils/transduce@1.0.0, utils/transpose@1.0.0, utils/traverse@1.0.0, utils/trim@1.0.0, utils/try-catch@1.0.0, utils/type@1.0.0, utils/unapply@1.0.0, utils/unary@1.0.0, utils/uncurry-n@1.0.0, utils/unfold@1.0.0, utils/union@1.0.0, utils/union-with@1.0.0, utils/uniq@1.0.0, utils/uniq-by@1.0.0, utils/uniq-with@1.0.0, utils/unless@1.0.0, utils/unnest@1.0.0, utils/until@1.0.0, utils/update@1.0.0, utils/use-with@1.0.0, utils/values@1.0.0, utils/values-in@1.0.0, utils/view@1.0.0, utils/when@1.0.0, utils/where@1.0.0, utils/where-eq@1.0.0, utils/without@1.0.0, utils/xprod@1.0.0, utils/zip@1.0.0, utils/zip-obj@1.0.0, utils/zip-with@1.0.0

$ bit export bit.ramda
exported 322 components to scope bit.ramda
```

That's it, it's now possible to consume the components from any other project as individual components!
Check out the [scope on bitsrc.io](https://bitsrc.io/bit/ramda).
