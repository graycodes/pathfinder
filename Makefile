test:
	@./node_modules/.bin/mocha -u tdd --reporter spec --growl

.PHONY: test
