DEEDPOLL = node_modules/.bin/deedpoll \
	--rename arr:list \
	--rename array:list \
	--rename fnArity:length \
	--rename func:fn

SRC = $(shell find . -name '*.js' -not -path './node_modules/*')


lint:
	@$(DEEDPOLL) -- $(SRC)
