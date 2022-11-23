/*
  Warnings:

  - You are about to drop the column `name` on the `Bike` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Bike` table. All the data in the column will be lost.
  - Added the required column `nameBike` to the `Bike` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Rent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "bikeId" INTEGER NOT NULL,
    CONSTRAINT "Rent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rent_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "Bike" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bike" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nameBike" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL
);
INSERT INTO "new_Bike" ("color", "id", "model") SELECT "color", "id", "model" FROM "Bike";
DROP TABLE "Bike";
ALTER TABLE "new_Bike" RENAME TO "Bike";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
