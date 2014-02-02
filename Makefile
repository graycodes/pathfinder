test:
	@./node_modules/.bin/mocha -u tdd --reporter spec --growl
test-w:
	@./node_modules/.bin/mocha -u tdd --reporter spec --growl --watch

.PHONY: test
