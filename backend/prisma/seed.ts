import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('@Nandha20', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'gmail@nicola.id' },
        update: {},
        create: {
            email: 'gmail@nicola.id',
            password: hashedPassword,
            name: 'Nicola Ananda',
            role: 'admin',
        },
    });

    console.log('✅ Admin user created:', admin.email);

    // Create sample portfolio item
    const portfolio = await prisma.portfolio.upsert({
        where: { slug: 'sample-portfolio' },
        update: {},
        create: {
            slug: 'sample-portfolio',
            title: 'Sample Portfolio Project',
            description: '<h2>Project Overview</h2><p>This is a sample portfolio project with <strong>rich HTML content</strong>.</p><ul><li>Feature 1</li><li>Feature 2</li><li>Feature 3</li></ul>',
            category: 'Web Development',
            technologies: ['React', 'TypeScript', 'Tailwind CSS'],
            imageUrls: ['/images/sample-portfolio.jpg'],
            published: true,
            featured: true,
        },
    });

    console.log('✅ Sample portfolio created:', portfolio.title);

    // Create sample blog post
    const blog = await prisma.blog.upsert({
        where: { slug: 'welcome-to-my-blog' },
        update: {},
        create: {
            slug: 'welcome-to-my-blog',
            title: 'Welcome to My Blog',
            excerpt: 'This is the first blog post on my new portfolio website. Learn more about my journey and what to expect.',
            content: '<h2>Welcome!</h2><p>This is my first blog post with <strong>rich HTML content</strong>.</p><p>I\'m excited to share my thoughts and experiences with you.</p><h3>What to Expect</h3><ul><li>Technical tutorials</li><li>Project case studies</li><li>Industry insights</li></ul>',
            coverImage: '/images/sample-blog.jpg',
            category: 'General',
            tags: ['welcome', 'introduction'],
            published: true,
            featured: true,
        },
    });

    console.log('✅ Sample blog post created:', blog.title);

    console.log('🎉 Database seed completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
