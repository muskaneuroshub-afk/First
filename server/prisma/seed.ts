import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Seed must never run in production. Aborting.');
  }

  console.log('Seeding database with sample contact messages...');

  await prisma.contactMessage.createMany({
    data: [
      {
        fullName: 'Sample Sender (seed data)',
        email: 'sample1@example.com',
        subject: 'Project Inquiry',
        message:
          'Hi, I saw your portfolio and I am very interested in collaborating on a project. Please let me know your availability.',
        status: 'new',
        emailNotifyStatus: 'disabled',
        ipHash: 'seeded-hash-1',
        userAgent: 'Seed Script/1.0',
      },
      {
        fullName: 'Demo Contact (seed data)',
        email: 'demo2@example.com',
        subject: 'Freelance Opportunity',
        message:
          'Hello! We have a freelance web development opportunity and would love to discuss it with you. When would be a good time to connect?',
        status: 'read',
        emailNotifyStatus: 'disabled',
        ipHash: 'seeded-hash-2',
        userAgent: 'Seed Script/1.0',
      },
      {
        fullName: 'Test User (seed data)',
        email: 'testuser3@example.com',
        subject: 'General Question',
        message:
          'Hey, this is a test message created by the database seed script. You can safely delete this entry via the admin API or Prisma Studio.',
        status: 'replied',
        emailNotifyStatus: 'disabled',
        ipHash: 'seeded-hash-3',
        userAgent: 'Seed Script/1.0',
      },
    ],
  });

  console.log('Seed complete. 3 sample messages inserted.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

