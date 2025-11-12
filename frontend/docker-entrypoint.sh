#!/bin/sh
# Frontend initialization script

cd /app

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install --no-save
fi

# Start the development server
npm start
