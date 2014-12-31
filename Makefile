DEEDPOLL = node_modules/.bin/deedpoll \
	--rename arr:list \
	--rename array:list \
	--rename ctor:Ctor \
	--rename fnArity:length \
	--rename i:idx \
	--rename index:idx
UGLIFY = node_modules/.bin/uglifyjs
XYZ = node_modules/.bin/xyz --repo git@github.com:ramda/ramda.git --script scripts/prepublish

SRC = $(shell find src -name '*.js')


dist/ramda.js: scripts/build template.js $(SRC)
	git checkout -- '$@'
	'$<' --complete >ramda.js.tmp
	mv ramda.js.tmp '$@'

dist/ramda.min.js: dist/ramda.js
	$(UGLIFY) --compress --mangle --preamble '/*! ramda $(shell date '+%Y-%m-%d') (c)$(shell git show -s --format=%ai | cut -d - -f 1) Scott Sauyet & Michael Hurley @license MIT */' <'$<' >'$@'


.PHONY: clean
clean:
	rm -f -- dist/ramda.js dist/ramda.min.js ramda.js.tmp


.PHONY: lint
lint:
	@$(DEEDPOLL) -- $(SRC)
	rm dist/ramda.js
	make dist/ramda.js
	git diff --exit-code


.PHONY: release-major release-minor release-patch
release-major release-minor release-patch:
	@$(XYZ) --increment $(@:release-%=%)


.PHONY: setup
setup:
	npm install

.PHONY: doc-blob
doc-blob:
	./scripts/doc-blob

.PHONY: real-docs
real-docs:
	jsdoc -t jsdoc-template dist/ramda.js


.PHONY: test
test: dist/ramda.js
	npm test
