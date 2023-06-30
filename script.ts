import { Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function main() {
  let allComments = await prisma.comment.findMany();
  allComments.forEach(async (p) => {
    await prisma.comment.deleteMany({
      where: {
        id: p.id,
      },
    });
  });

  let allPosts = await prisma.post.findMany();
  allPosts.forEach(async (p) => {
    await prisma.post.deleteMany({
      where: {
        id: p.id,
      },
    });
  });

  let allAuthors = await prisma.author.findMany();
  allAuthors.forEach(async (p) => {
    await prisma.author.deleteMany({
      where: {
        id: p.id,
      },
    });
  });

  let allUsers = await prisma.user.findMany();
  allUsers.forEach(async (p) => {
    await prisma.user.deleteMany({
      where: {
        id: p.id,
      },
    });
  });

  await prisma.user.create({
    data: {
      name: "Teste",
      email: "teste@email",
      authors: {
        create: {
          tags: "Teste tags",
          surname: "Teste surname",
          completeName: "Teste completeName",
          posts: {
            create: {
              title: "Teste Title",
              text: "Teste Text",
            },
          },
        },
      },
    },
  });

  await prisma.user.findMany({
    include: {
      authors: true,
    },
  });

  await prisma.$queryRaw<User[]>(
    Prisma.sql`update user set name = 'TesteTeste' where email like '%Teste'`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
