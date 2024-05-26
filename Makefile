.PHONY: help
help:
	@echo "Usage: make [TARGET]"
	@echo "Targets:"
	@echo "  depcheck\t\t\tAnalyze the dependencies in a project to see how each dependency is used, which dependencies are useless, and which dependencies are missing from package.json."
	@echo "  unimported\t\t\tFind and fix dangling files and unused dependencies in your JavaScript projects."
	@echo "  ts-prune\t\t\tFind unused exports in a typescript project."
	@echo "  ts-unused-exports\t\tFinds unused exported symbols in your Typescript project."
	@echo "  auto-fix (experimental)\tRun Knip as you normally would, and then run it again with the --fix flag to let Knip automatically apply fixes"
	@echo "-----------------------------"
	@echo "  dev\t\t\t\tRun the app in development mode."
	@echo "  build\t\t\t\tBuild the app."
	@echo "-----------------------------"
	@echo "  help\t\t\t\tDisplay this help message."

.PHONY: dev
dev:
	@echo "Running app in development mode..."
	bun run dev

.PHONY: build
build:
	@echo "Building app..."
	bun run build

.PHONY: depcheck
depcheck:
	@echo "Checking for unused dependencies..."
	bunx knip --dependencies --production

.PHONY: unimported	
unimported:
	@echo "Checking for unimported files..."
	bunx knip --production --dependencies --include files

.PHONY: ts-prune
ts-prune:
	@echo "Checking for unused exports..."
	bunx knip --include exports,types,nsExports,nsTypes

.PHONY: ts-unused-exports
ts-unused-exports:
	@echo "Checking for unused exports..."
	bunx knip --include exports,types,nsExports,nsTypes

.PHONY: auto-fix
auto-fix:
	@echo "Running Auto-fix..."
	bunx knip --fix --allow-remove-files --production
