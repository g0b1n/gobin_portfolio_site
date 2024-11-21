const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient();

async function main() {
    // delete existing projects
    await prisma.project.deleteMany();
    
  await prisma.project.createMany({
    data: [
      {
        title: 'FutBal',
        description: 'Users can register and login to view their facorite match details and leagues tables.',
        liveDemo: 'http://example.com',
        githubLink: 'https://github.com/g0b1n/gobin_capstone_2',
        tags: ['JavaScript', 'React.js', 'Node.js', 'Express', 'PostgreSQL'],
      },
      {
        title: 'React Jobly',
        description: 'This is React Job searching app. Frontend only.',
        liveDemo: 'http://example.com',
        githubLink: 'https://github.com/g0b1n/gobin_ReactJobly_frontend/tree/main/jobly-frontend',
        tags: ['HTML', 'CSS', 'React', 'JavaScript'],
      },
    ],
  });
}

main()
  .then(() => {
    console.log('Seeding completed');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });