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

  # Copy files (including hidden files like .htaccess)
  echo "Copying files..."
  sudo cp -r dist/* /var/www/nicola.id/html/
  # Explicitly copy .htaccess if it exists
  if [ -f "dist/.htaccess" ]; then
    echo "Copying .htaccess file..."
    sudo cp dist/.htaccess /var/www/nicola.id/html/.htaccess
    sudo chmod 644 /var/www/nicola.id/html/.htaccess
  fi
  
  echo "Deployment complete!"
  echo "✅ Don't forget to enable .htaccess in LiteSpeed WebAdmin!"
else
  echo "Build failed. Deployment aborted."
  exit 1
fi
