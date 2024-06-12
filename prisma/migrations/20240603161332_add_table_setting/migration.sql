-- CreateTable
CREATE TABLE "setting" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255),
    "keyword" VARCHAR(255),
    "description" VARCHAR(255),
    "color" VARCHAR(50),
    "theme" VARCHAR(50),

    CONSTRAINT "setting_pkey" PRIMARY KEY ("id")
);
