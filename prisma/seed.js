import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


// seed to insert data into the database
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


  const editorNames = ['Epic Games', 'Electronic Arts', 'Blizzard Entertainment', 'Bandai Namco'];

  for (const name of editorNames) {
    const existingEditor = await prisma.editor.findUnique({
      where: { name: name }
    });

    // if editor doesn't exist, we create it
    if (!existingEditor) {
      const newEditor = await prisma.editor.create({
        data: { name: name }
      });
      console.log(`Editor created: ${newEditor.name}`);
    }
  }
}

seed() // runs the function

