# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. This project showcases my professional experience, skills, and projects in an elegant and interactive interface.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean and professional design with smooth animations
- **Portfolio Showcase**: Filterable project gallery with detailed project pages
- **Admin Dashboard**: Secure admin panel for managing portfolio and messages
- **Contact Management**: Integrated contact form with message management
- **Authentication**: Secure login system with token-based authentication
- **Mobile-First**: Optimized for all screen sizes with mobile-friendly navigation
- **Performance Optimized**: Fast loading times and smooth interactions

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Routing**: React Router
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Authentication**: JWT with HTTP-only cookies
- **UI Components**: Custom components with shadcn/ui
- **API Integration**: RESTful API with fetch
- **Deployment**: [Deployment platform]

## Project Structure

```
portfolio-website/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # Base UI components
│   │   └── admin/      # Admin-specific components
│   ├── pages/          # Page components
│   ├── layouts/        # Layout components
│   ├── contexts/       # React contexts
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── types/          # TypeScript type definitions
│   ├── assets/         # Images and other assets
│   └── App.tsx         # Root component
├── package.json        # Project dependencies
└── tsconfig.json      # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
# For development
npm run env:dev

# For production
npm run env:prod

# For Docker deployment
npm run env:docker
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080`

## Environment Configuration

This project supports multiple environment configurations:

- **Development**: Uses local API proxy and debug mode
- **Production**: Uses production API and optimized settings
- **Docker**: Configured for containerized deployment

See [ENVIRONMENT_GUIDE.md](ENVIRONMENT_GUIDE.md) for detailed configuration instructions.

## Usage

### Public Pages
- Navigate through different sections using the navigation menu
- Browse projects in the portfolio section
- Filter projects by category or technology
- View detailed project information by clicking on project cards
- Send messages through the contact form

### Admin Dashboard
- Secure login system with token-based authentication
- Mobile-friendly admin interface
- Manage portfolio items with CRUD operations
- View and manage contact messages
- Real-time statistics and activity overview
- Responsive sidebar navigation

## Customization

### Adding New Projects
1. Log in to the admin dashboard
2. Navigate to the Portfolio section
3. Click "Add Portfolio" to create a new project
4. Fill in the project details and upload images

### Modifying Styles
- Global styles can be modified in the `src/styles` directory
- Component-specific styles are located within their respective component folders
- Tailwind configuration can be adjusted in `tailwind.config.js`

## Docker Deployment

The project includes Docker configuration for easy deployment:

```bash
# Build and deploy with Docker
npm run docker:build-serve

# Or manually:
npm run build
npm run docker:up

# Stop Docker services
npm run docker:down

# View logs
npm run docker:logs
```

The application will be available at `http://localhost:9999`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@NoAbsen13](https://twitter.com/NoAbsen13) - gmail@nicola.id

Project Link: [https://github.com/nicolaananda/portfolio-nicola](https://github.com/nicolaananda/portfolio-nicola)
