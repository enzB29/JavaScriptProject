-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "genreId" INTEGER NOT NULL,
    "editorId" INTEGER NOT NULL,
    CONSTRAINT "Game_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "Editor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("description", "editorId", "featured", "genreId", "id", "name", "releaseDate") SELECT "description", "editorId", "featured", "genreId", "id", "name", "releaseDate" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
