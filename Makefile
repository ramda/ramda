TESTS = $(shell find test ext -name 'test.*.js')


test/index.html: test/index.template.html $(TESTS)
	@sed "s:{TESTS}:$(shell printf '<script src="../%s"></script>' $(TESTS)):" '$<' >'$@'
