.DEFAULT_GOAL := check

init:
	@echo "Initialising the project"
	@npm install

start:
	@echo "🛎 Starting the server..."
	@npm run start

docs:
	@doctoc README.md
	@echo "📚 Documentation ready!"

check: --pre_check test build
	@echo "✅"

clean_all:
	@echo "🧨 Clean all"
	@npm run clean_all

test:
	@echo "🧪 Testing..."
	@npm test

integration_test:
	@echo "🧪 Integration tests..."
	@scripts/integration.test.sh

--pre_check:
	@npm install
	@npm run lint
