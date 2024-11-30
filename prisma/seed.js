import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


async function seed() {
  const genreNames = ['Action', 'Adventure', 'RPG', 'Simulation', 'Sport', 'MMORPG'];

  for (const name of genreNames) {
    const existingGenre = await prisma.genre.findUnique({
      where: {
        name: name,
      },
    });

    // if genre doesn't exist, we create it
    if (!existingGenre) {
      const newGenre = await prisma.genre.create({
        data: {
          name: name,
        },
      });
      console.log(`Genre created: ${newGenre.name}`);
    }
  }
}

seed() // runs the function

