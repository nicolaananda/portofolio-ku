const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('./models/Blog');
const Portfolio = require('./models/Portfolio');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portofolio-ku')
    .then(() => console.log('Connected to MongoDB for seeding'))
    .catch((err) => console.error('MongoDB connection error:', err));

const seedData = async () => {
    try {
        // Clear existing data
        await Blog.deleteMany({});
        await Portfolio.deleteMany({});

        // Seed Blogs
        const blogs = [
            {
                title: "Data Analyst with Python: A Comprehensive Guide",
                excerpt: "Learn how to leverage Python libraries like Pandas, NumPy, and Matplotlib for effective Data Analyst and visualization.",
                content: "<p>Python has become the go-to language for Data Analyst due to its rich ecosystem of libraries and tools...</p>",
                coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
                category: "Data Analyst",
                featured: true,
                readTime: "8 min read"
            },
            {
                title: "Building Modern Web Applications with React",
                excerpt: "A deep dive into creating scalable and maintainable web applications using React and modern development practices.",
                content: "<p>React has revolutionized web development by providing a component-based architecture...</p>",
                coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=80",
                category: "Web Development",
                featured: false,
                readTime: "7 min read"
            }
        ];
        await Blog.insertMany(blogs);
        console.log('Blogs seeded');

        // Seed Portfolio
        const portfolios = [
            {
                title: "E-Commerce Dashboard",
                description: "A comprehensive analytics dashboard for e-commerce businesses.",
                category: "Web Development",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
                technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
                link: "https://example.com",
                github: "https://github.com",
                featured: true
            },
            {
                title: "Financial Data Analysis",
                description: "Deep dive analysis of financial market trends using Python.",
                category: "Data Analyst",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
                technologies: ["Python", "Pandas", "Matplotlib", "Jupyter"],
                link: "https://example.com",
                github: "https://github.com",
                featured: true
            }
        ];
        await Portfolio.insertMany(portfolios);
        console.log('Portfolios seeded');

        console.log('Seeding complete');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedData();
