PHONY: install lint test gendiff publish

install:
	npm ci

lint:
	npx eslint .

test:
	npm test

gendiff:
	node bin/gendiff.js

publish:
	npx asciinema upload demo.cast
