#!/bin/bash

# Build the backend
echo "Building backend..."
cd backend
npm install
npm run build
cd ..

# Build the frontend
echo "Building frontend..."
# Generate static sitemap
echo "Generating static sitemap..."
cd backend
# Ensure dependencies are available (including devDeps for ts-node)
if [ "$NODE_ENV" = "production" ]; then
    echo "Installing dev dependencies for sitemap generation..."
    npm install --only=dev
fi

npx ts-node scripts/generate-sitemap.ts
if [ $? -ne 0 ]; then
    echo "❌ Sitemap generation failed! Aborting deployment."
    exit 1
fi
cd ..

# Ensure public/sitemap.xml exists
if [ ! -f "public/sitemap.xml" ]; then
    echo "❌ public/sitemap.xml not found after generation!"
    exit 1
fi

npm install
npm run build
# Check if build was successful
if [ $? -eq 0 ]; then
  echo "Build successful. Deploying to /home/nicola.id/public_html..."
  
  # Ensure the target directory exists
  if [ ! -d "/home/nicola.id/public_html" ]; then
    echo "Creating directory /home/nicola.id/public_html..."
    sudo mkdir -p /home/nicola.id/public_html
  fi

  # Copy files (including hidden files like .htaccess)
  echo "Copying files..."
  sudo rm -f /home/nicola.id/public_html/sitemap.xml # Remove old static sitemap from server
  sudo cp -r dist/* /home/nicola.id/public_html/
  sudo cp public/sitemap.xml /home/nicola.id/public_html/sitemap.xml # Explicitly copy sitemap to be safe
  # Explicitly copy .htaccess if it exists
  if [ -f "dist/.htaccess" ]; then
    echo "Copying .htaccess file..."
    sudo cp dist/.htaccess /home/nicola.id/public_html/.htaccess
    sudo chmod 644 /home/nicola.id/public_html/.htaccess
  fi
  
  echo "Deployment complete!"
  
  # Restart backend with PM2
  echo "Restarting backend..."
  pm2 restart portfolio-backend || pm2 start ecosystem.config.cjs --env production
  
  echo "Service is live! 🚀"
  echo "✅ Don't forget to enable .htaccess in LiteSpeed WebAdmin!"
else
  echo "Build failed. Deployment aborted."
  exit 1
fi
