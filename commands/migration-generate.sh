#!/bin/bash

# Check if an argument is provided
if [ $# -eq 0 ]; then
  echo "Error: Please provide the path to the migration file."
  exit 1
fi

# Store the provided file path
migration_name=$1
nest build
# Run the migration generation command
npx typeorm-ts-node-commonjs migration:generate "./src/migrations/$migration_name" -p -d ./dist/config/migration.config.js