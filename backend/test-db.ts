
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Testing DB connection...');
        const user = await prisma.user.findUnique({
            where: { email: 'gmail@nicola.id' },
        });
        console.log('User found:', user ? 'Yes' : 'No');
        if (user) {
            console.log('User role:', user.role);
        }
    } catch (e) {
        console.error('DB Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
