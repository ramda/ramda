DEEDPOLL = node_modules/.bin/deedpoll \
	--rename arr:list \
	--rename array:list \
	--rename ctor:Ctor \
	--rename fnArity:length \
	--rename i:idx \
	--rename index:idx
MOCHA = node_modules/.bin/mocha
UGLIFY = node_modules/.bin/uglifyjs
XYZ = node_modules/.bin/xyz --repo git@github.com:ramda/ramda.git --script scripts/prepublish

SRC = $(shell find src -name '*.js')


dist/ramda.js: scripts/build scripts/header scripts/template.js $(SRC)
	git checkout -- '$@'
	scripts/header >ramda.js.tmp
	'$<' --complete >>ramda.js.tmp
	mv ramda.js.tmp '$@'

dist/ramda.min.js: dist/ramda.js scripts/header
	scripts/header >'$@'
	$(UGLIFY) --compress --mangle <'$<' >>'$@'


.PHONY: clean
clean:
	rm -f -- dist/ramda.js ramda.js.tmp


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


.PHONY: test
test: dist/ramda.js
	npm test
	find src -name '*.js' -not -path 'src/internal/*' \
	| sed 's:src/\(.*\)[.]js:exports.\1 = require("./src/\1");:' >index.js
	sed '/"main":/d' package.json >tmp
	mv tmp package.json
	$(MOCHA) -- $(shell find test -name '*.js' -not -name 'installTo.js' -not -name 'test.examplesRunner.js')
	git checkout -- package.json
	rm index.js
