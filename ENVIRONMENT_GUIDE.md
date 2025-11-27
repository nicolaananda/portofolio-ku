# Environment Configuration Guide

This guide explains how to set up environment variables for different deployment scenarios.

## Environment Files

The project uses different environment files for different scenarios:

- `env.development` - Development environment variables
- `env.production` - Production environment variables  
- `docker.env` - Docker-specific environment variables
- `env.example` - Template for creating your own environment files

## Quick Setup

### For Development
```bash
npm run env:dev
npm run dev
```

### For Production Build
```bash
npm run env:prod
npm run build
```

### For Docker Deployment
```bash
npm run env:docker
npm run docker:build-serve
```

## Environment Variables

### Core Variables

| Variable | Description | Development | Production |
|----------|-------------|-------------|------------|
| `VITE_API_URL` | Backend API URL | `/api` | `https://be.nicola.id/api` |
| `VITE_APP_TITLE` | Application title | `Portfolio - Development` | `Portfolio - Nicola Ananda` |
| `VITE_APP_DESCRIPTION` | Application description | `Portfolio website development environment` | `Professional portfolio website showcasing skills and projects` |
| `VITE_APP_URL` | Application URL | `http://localhost:8080` | `https://nicola.id` |
| `VITE_DEBUG` | Debug mode | `true` | `false` |

### Docker Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | External port for nginx | `9999` |
| `NGINX_HOST` | Nginx host | `localhost` |
| `NGINX_PORT` | Nginx internal port | `80` |

## Usage Examples

### Development Server
```bash
# Start development server with development environment
npm run dev

# Start development server with production environment (for testing)
npm run dev:prod
```

### Building
```bash
# Build for production
npm run build

# Build for development (with source maps)
npm run build:dev
```

### Docker
```bash
# Build and serve with Docker
npm run docker:build-serve

# Just start Docker services
npm run docker:up

# Stop Docker services
npm run docker:down

# View Docker logs
npm run docker:logs
```

## Custom Environment Setup

1. Copy the example file:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` with your values:
   ```env
   VITE_API_URL=https://your-api.com/api
   VITE_APP_TITLE=Your Portfolio
   VITE_APP_DESCRIPTION=Your portfolio description
   VITE_APP_URL=https://your-domain.com
   VITE_DEBUG=false
   ```

3. Use the environment:
   ```bash
   npm run dev
   npm run build
   ```

## Environment Loading Priority

Vite loads environment variables in this order:
1. `.env.local` (highest priority)
2. `.env.[mode].local`
3. `.env.[mode]`
4. `.env` (lowest priority)

Where `[mode]` is the mode passed to Vite (development, production, etc.).

## Troubleshooting

### Environment Variables Not Loading
- Ensure your `.env` file is in the project root
- Check that variable names start with `VITE_`
- Restart the development server after changing environment files

### Docker Issues
- Make sure `docker.env` exists and has correct values
- Check that the port is not already in use
- Verify Docker is running

### Build Issues
- Ensure all required environment variables are set
- Check that API URLs are accessible
- Verify environment file syntax (no spaces around `=`)
