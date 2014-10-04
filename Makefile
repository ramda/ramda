DEEDPOLL = node_modules/.bin/deedpoll \
	--rename arr:list \
	--rename array:list \
	--rename ctor:Ctor \
	--rename fnArity:length \
	--rename func:fn \
	--rename i:idx \
	--rename index:idx

SRC = $(shell find . -name '*.js' -not -name '*.min.js' -not -path './lib/test/*' -not -path './node_modules/*' -not -path './sauce/*')


lint:
	@$(DEEDPOLL) -- $(SRC)
