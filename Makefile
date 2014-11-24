DEEDPOLL = node_modules/.bin/deedpoll \
	--rename arr:list \
	--rename array:list \
	--rename ctor:Ctor \
	--rename fnArity:length \
	--rename i:idx \
	--rename index:idx
UGLIFY = node_modules/.bin/uglifyjs
XYZ = node_modules/.bin/xyz --repo git@github.com:ramda/ramda.git --script scripts/prepublish

SRC = $(shell find . -name '*.js' -not -name '*.min.js' -not -path './lib/test/*' -not -path './node_modules/*' -not -path './sauce/*')


ramda.min.js: ramda.js
	$(UGLIFY) --compress --mangle --preamble '/*! ramda $(shell date '+%Y-%m-%d') */' <'$<' >'$@'


.PHONY: lint
lint:
	@$(DEEDPOLL) -- $(SRC)


.PHONY: release-major release-minor release-patch
release-major release-minor release-patch:
	@$(XYZ) --increment $(@:release-%=%)


.PHONY: setup
setup:
	npm install
