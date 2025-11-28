#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
  echo "Build successful. Deploying to /var/www/nicola.id/html..."
  
  # Ensure the target directory exists
  if [ ! -d "/var/www/nicola.id/html" ]; then
    echo "Creating directory /var/www/nicola.id/html..."
    sudo mkdir -p /var/www/nicola.id/html
  fi

  # Copy files
  echo "Copying files..."
  sudo cp -r dist/* /var/www/nicola.id/html/
  
  echo "Deployment complete!"
else
  echo "Build failed. Deployment aborted."
  exit 1
fi
